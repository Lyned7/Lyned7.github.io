/**
 * Orquestador de build completo — port de calculator_main.py
 */
import { PERSONAJES_DATA, DEFENSA_BOSS_OPCIONES, SUBSTATS_BASE_CONFIG, SUBSTATS_VALORES } from '../data/dataStructures.js';
import {
  combinarTodosLosStats,
  calcularAtkFinal,
  calcularTasaFinal,
  calcularHpFinal,
  calcularSheer,
  obtenerDiscosConfigAuto,
  aplicarEscaladoStats,
  calcularMultiplicadorDefensa,
} from './statsCalculator.js';
import {
  calcularDanoAtacante,
  calcularDanoAnomalo,
  calcularDanoRuptura,
  calcularDanoSkillInsignia,
} from './damageCalculator.js';
import {
  prepararSubstatsFijas,
  optimizarSubstatsCompetencia,
  ajustarCompetenciaAnomalo,
  ajustarSubstatsPorDiscos,
} from './substatsOptimizer.js';

export function calcularBuildCompleto({
  personajeNombre,
  dupesPersonaje,
  nombreSkill,
  nombreArmaDps,
  dupesArmaDps,
  support1Nombre,
  dupesSupport1,
  armaSupport1Nombre,
  dupesArmaSupport1,
  support2Nombre,
  dupesSupport2,
  armaSupport2Nombre,
  dupesArmaSupport2,
  gearConfig = null,
  discosConfig = null,
  defBoss = 'medio',
  optimizarSubstats = true,
  calcularDanoInsignia = true,
  verbose = false,
}) {
  const personaje = PERSONAJES_DATA[personajeNombre];
  const rol = personaje.rol;
  const elemento = personaje.elemento;

  const defBossValor = DEFENSA_BOSS_OPCIONES[defBoss] ?? DEFENSA_BOSS_OPCIONES.medio;

  const statsSinSubstats = combinarTodosLosStats({
    personajeNombre,
    dupesPersonaje,
    nombreSkill,
    nombreArmaDps,
    dupesArmaDps,
    support1Nombre,
    dupesSupport1,
    armaSupport1Nombre,
    dupesArmaSupport1,
    support2Nombre,
    dupesSupport2,
    armaSupport2Nombre,
    dupesArmaSupport2,
    gearConfig,
    discosConfig,
  });

  const discosUsados = discosConfig ?? obtenerDiscosConfigAuto(personajeNombre);
  let statsBase = prepararSubstatsFijas(rol, statsSinSubstats, discosUsados);

  let substatsCompetenciaDisponibles = 30;
  const preAsignacionesInfo = {};

  if (rol === 'Anomalo') {
    const cfg = SUBSTATS_BASE_CONFIG.Anomalo;
    const { preAsignaciones, rollsReducidos } = ajustarCompetenciaAnomalo(discosUsados, cfg.stats_competencia);
    for (const [stat, rolls] of Object.entries(preAsignaciones)) {
      if (rolls > 0) {
        statsBase[stat] = (statsBase[stat] ?? 0) + rolls * SUBSTATS_VALORES[stat];
        preAsignacionesInfo[stat] = rolls;
      }
    }
    substatsCompetenciaDisponibles = 30 - rollsReducidos;
  }

  let danoOptimoBase = null;
  let resultadoOpt = null;
  let substatsFinales = {};

  if (optimizarSubstats) {
    let funcionDano;
    if (rol === 'Atacante') {
      funcionDano = (stats, s1, s2) => calcularDanoAtacante(stats, s1, s2, defBossValor);
    } else if (rol === 'Anomalo') {
      funcionDano = (stats, s1, s2) => calcularDanoAnomalo(stats, s1, s2, elemento, defBossValor);
    } else {
      funcionDano = (stats, s1, s2) => calcularDanoRuptura(stats, s1, s2, defBossValor);
    }

    resultadoOpt = optimizarSubstatsCompetencia(
      rol, statsBase, funcionDano, substatsCompetenciaDisponibles, verbose,
    );
    substatsFinales = resultadoOpt.substats_valores;
    danoOptimoBase = resultadoOpt.dano_maximo;
  }

  const statsFinales = { ...statsBase };
  for (const [stat, valor] of Object.entries(substatsFinales)) {
    if (stat in statsFinales) statsFinales[stat] += valor;
    else statsFinales[stat] = valor;
  }

  const statsEscalados = aplicarEscaladoStats(statsFinales, personaje);
  Object.assign(statsFinales, statsEscalados);

  statsFinales.ATK_Final = calcularAtkFinal(statsFinales);
  if (rol === 'Anomalo') statsFinales.Tasa_Final = calcularTasaFinal(statsFinales);
  if (rol === 'Ruptura') {
    statsFinales.HP_Final = calcularHpFinal(statsFinales);
    statsFinales.Sheer_Final = calcularSheer(statsFinales);
  }

  let danoInfo = null;
  if (calcularDanoInsignia && danoOptimoBase != null) {
    danoInfo = calcularDanoSkillInsignia(
      personajeNombre, dupesPersonaje, danoOptimoBase, statsFinales, defBossValor, rol,
    );
  }

  const multiplicadorDefensa = calcularMultiplicadorDefensa(statsFinales, defBossValor);

  let substatsInfo = null;
  if (optimizarSubstats && resultadoOpt) {
    const config = SUBSTATS_BASE_CONFIG[rol];
    const substatsFijasAjustadas = ajustarSubstatsPorDiscos(
      { ...config.substats_fijas }, discosUsados, rol,
    );
    const substatsTotalesCompletas = { ...substatsFijasAjustadas };

    for (const [stat, valor] of Object.entries(resultadoOpt.substats_valores)) {
      const cantidadRolls = Math.round(valor / SUBSTATS_VALORES[stat]);
      substatsTotalesCompletas[stat] = (substatsTotalesCompletas[stat] ?? 0) + cantidadRolls;
    }
    for (const [stat, rolls] of Object.entries(preAsignacionesInfo)) {
      substatsTotalesCompletas[stat] = (substatsTotalesCompletas[stat] ?? 0) + rolls;
    }
    substatsInfo = { totales: substatsTotalesCompletas };
  }

  return {
    personaje: personajeNombre,
    rol,
    elemento,
    stats: statsFinales,
    dano_insignia: danoInfo,
    def_boss: defBossValor,
    multiplicador_defensa: multiplicadorDefensa,
    substats_info: substatsInfo,
  };
}
