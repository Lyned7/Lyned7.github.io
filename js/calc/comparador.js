/**
 * Comparación usuario vs build optimizada — port de comparador.py
 */
import { calcularBuildCompleto } from './calculatorMain.js';
import { obtenerBuildOptimo } from '../data/buildsPredefinidos.js';
import {
  calcularDanoDesdeApi,
  extraerSetsGear,
  extraerMainStatsDiscos,
  extraerSubstatsDesdeApi,
} from './apiCalculator.js';
import { AVATAR_ID_TO_NAME, WEAPON_ID_TO_NAME, PROPERTY_ID_TO_SUBSTAT } from '../data/apiMappings.js';
import { PERSONAJES_DATA, DISCOS_STATS_PRINCIPALES, SUBSTATS_VALORES, DEFENSA_BOSS_OPCIONES } from '../data/dataStructures.js';
import {
  inicializarStatsVacios,
  obtenerStatsPersonaje,
  obtenerStatsArmaDps,
  obtenerBuffsSupport,
  obtenerBuffsArmaSupport,
  obtenerBuffsGearSupport,
  obtenerBuffsGearDps,
  calcularAtkFinal,
  calcularTasaFinal,
  calcularHpFinal,
  calcularSheer,
  aplicarEscaladoStats,
  calcularMultiplicadorDefensa,
  calcularErFinal,
} from './statsCalculator.js';

export function extraerSubstatsUsuario(avatarData) {
  const substatsTotales = {};
  const equippedList = avatarData.EquippedList ?? [];

  for (const equip of equippedList) {
    const equipment = equip.Equipment ?? {};
    const randomProperties = equipment.RandomPropertyList ?? [];
    for (const prop of randomProperties) {
      const propertyId = prop.PropertyId;
      const propertyLevel = prop.PropertyLevel ?? 0;
      const substatName = PROPERTY_ID_TO_SUBSTAT[propertyId];
      if (substatName) {
        substatsTotales[substatName] = (substatsTotales[substatName] ?? 0) + propertyLevel;
      }
    }
  }
  return substatsTotales;
}

export function obtenerStatsFinalesUsuario(avatarData, buildPredefinido) {
  const avatarId = avatarData.Id;
  const avatarNombre = AVATAR_ID_TO_NAME[avatarId];
  const dupesPersonaje = avatarData.TalentLevel ?? 0;

  const weaponData = avatarData.Weapon ?? {};
  const weaponId = weaponData.Id;
  const weaponNombre = WEAPON_ID_TO_NAME[weaponId];
  const weaponDupes = (weaponData.UpgradeLevel ?? 1) - 1;

  const personaje = PERSONAJES_DATA[avatarNombre];
  const rol = personaje.rol;
  const elemento = personaje.elemento;
  const skillInsigniaNombre = personaje.skill_insignia;
  const tipoSkill = personaje.skills[skillInsigniaNombre].tipo;

  const statsTotales = inicializarStatsVacios();

  const sum = (src) => {
    for (const [stat, valor] of Object.entries(src)) {
      if (stat in statsTotales) statsTotales[stat] += valor;
    }
  };

  sum(obtenerStatsPersonaje(avatarNombre, dupesPersonaje, skillInsigniaNombre));
  sum(obtenerStatsArmaDps(weaponNombre, weaponDupes, elemento, tipoSkill));
  sum(obtenerBuffsSupport(buildPredefinido.support1.nombre, buildPredefinido.support1.dupes, tipoSkill, rol));
  sum(obtenerBuffsArmaSupport(buildPredefinido.support1.arma, buildPredefinido.support1.dupes_arma, tipoSkill));
  sum(obtenerBuffsGearSupport(buildPredefinido.support1.nombre, buildPredefinido.support1.dupes, tipoSkill));
  sum(obtenerBuffsSupport(buildPredefinido.support2.nombre, buildPredefinido.support2.dupes, tipoSkill, rol));
  sum(obtenerBuffsArmaSupport(buildPredefinido.support2.arma, buildPredefinido.support2.dupes_arma, tipoSkill));
  sum(obtenerBuffsGearSupport(buildPredefinido.support2.nombre, buildPredefinido.support2.dupes, tipoSkill));

  const gearUsuario = extraerSetsGear(avatarData);
  sum(obtenerBuffsGearDps(gearUsuario, elemento, tipoSkill));

  const discosConfig = extraerMainStatsDiscos(avatarData);
  for (const [discoNombre, statElegido] of Object.entries(discosConfig)) {
    if (['Disco 4', 'Disco 5', 'Disco 6'].includes(discoNombre)) {
      const statsPosibles = DISCOS_STATS_PRINCIPALES[discoNombre].stats_posibles;
      if (statElegido in statsPosibles) {
        const valor = statsPosibles[statElegido];
        if (statElegido in statsTotales) statsTotales[statElegido] += valor;
        else statsTotales[statElegido] = valor;
      }
    }
  }

  statsTotales.Hpp += DISCOS_STATS_PRINCIPALES['Disco 1'].valor;
  statsTotales.Atkp += DISCOS_STATS_PRINCIPALES['Disco 2'].valor;
  statsTotales.Defp += DISCOS_STATS_PRINCIPALES['Disco 3'].valor;

  const substatsUsuario = extraerSubstatsDesdeApi(avatarData);
  for (const [stat, cantidad] of Object.entries(substatsUsuario)) {
    if (stat in SUBSTATS_VALORES) {
      const valorSubstat = cantidad * SUBSTATS_VALORES[stat];
      if (stat in statsTotales) statsTotales[stat] += valorSubstat;
      else statsTotales[stat] = valorSubstat;
    }
  }

  Object.assign(statsTotales, aplicarEscaladoStats(statsTotales, personaje));

  statsTotales.ATK_Final = calcularAtkFinal(statsTotales);
  if (rol === 'Anomalo') statsTotales.Tasa_Final = calcularTasaFinal(statsTotales);
  if (rol === 'Ruptura') {
    statsTotales.HP_Final = calcularHpFinal(statsTotales);
    statsTotales.Sheer_Final = calcularSheer(statsTotales);
  }

  const erBase = personaje.er_base ?? 1.56;
  statsTotales.ER_Final = calcularErFinal(statsTotales, erBase);
  statsTotales.Multiplicador_Defensa = calcularMultiplicadorDefensa(statsTotales, 952.8);

  return statsTotales;
}

function generarVarianteUsuario(avatarData, buildOptimo) {
  const weaponData = avatarData.Weapon ?? {};
  const weaponId = weaponData.Id;
  const weaponNombre = WEAPON_ID_TO_NAME[weaponId];
  const weaponDupes = (weaponData.UpgradeLevel ?? 1) - 1;

  return {
    nombre: 'Tu Build (Optimizada)',
    arma_dps: weaponNombre || buildOptimo.arma_dps,
    skill_insignia: buildOptimo.skill_insignia,
    support1: buildOptimo.support1,
    support2: buildOptimo.support2,
    gear_config: extraerSetsGear(avatarData),
    discos_config: extraerMainStatsDiscos(avatarData),
    dupes_arma_dps: weaponDupes,
  };
}

export function compararTodasLasVariantes(avatarData) {
  const avatarId = avatarData.Id;
  const avatarNombre = AVATAR_ID_TO_NAME[avatarId];
  const dupesPersonaje = avatarData.TalentLevel ?? 0;

  const personajeData = PERSONAJES_DATA[avatarNombre] ?? {};
  const rol = personajeData.rol ?? 'Desconocido';

  const weaponData = avatarData.Weapon ?? {};
  const weaponId = weaponData.Id;
  const weaponNombre = WEAPON_ID_TO_NAME[weaponId] ?? 'Desconocida';
  const weaponDupes = (weaponData.UpgradeLevel ?? 1) - 1;

  const gearUsuario = extraerSetsGear(avatarData);
  const discosUsuario = extraerMainStatsDiscos(avatarData);

  const buildOptimo = obtenerBuildOptimo(avatarNombre);
  if (!buildOptimo) return { error: `No hay build predefinido para ${avatarNombre}` };

  const variante = generarVarianteUsuario(avatarData, buildOptimo);
  const defBossTipo = 'medio';
  const defBossValor = DEFENSA_BOSS_OPCIONES[defBossTipo] ?? 952.8;

  const danoUsuario = calcularDanoDesdeApi(avatarData, buildOptimo);
  const statsUsuario = obtenerStatsFinalesUsuario(avatarData, buildOptimo);
  const substatsUsuario = extraerSubstatsUsuario(avatarData);

  const resultadoOptimizado = calcularBuildCompleto({
    personajeNombre: avatarNombre,
    dupesPersonaje,
    nombreSkill: variante.skill_insignia,
    nombreArmaDps: variante.arma_dps,
    dupesArmaDps: variante.dupes_arma_dps,
    support1Nombre: variante.support1.nombre,
    dupesSupport1: variante.support1.dupes,
    armaSupport1Nombre: variante.support1.arma,
    dupesArmaSupport1: variante.support1.dupes_arma,
    support2Nombre: variante.support2.nombre,
    dupesSupport2: variante.support2.dupes,
    armaSupport2Nombre: variante.support2.arma,
    dupesArmaSupport2: variante.support2.dupes_arma,
    gearConfig: variante.gear_config,
    discosConfig: variante.discos_config,
    defBoss: defBossTipo,
    optimizarSubstats: true,
    calcularDanoInsignia: true,
    verbose: false,
  });

  const discosOptimo = variante.discos_config;
  const substatsOptimo = resultadoOptimizado.substats_info?.totales ?? {};
  const danoOptimizado = resultadoOptimizado.dano_insignia.dano_skill_insignia;

  let crUsuario = statsUsuario.Cr ?? 0;
  crUsuario = Math.min(Math.max(crUsuario, 0), 1.0);

  const danoUsuarioEfectivo = (rol === 'Atacante' || rol === 'Ruptura')
    ? danoUsuario * crUsuario
    : danoUsuario;

  const porcentajeUser = danoOptimizado > 0 ? (danoUsuario / danoOptimizado) * 100 : 0;
  const porcentajeReal = danoOptimizado > 0 ? (danoUsuarioEfectivo / danoOptimizado) * 100 : 0;

  return {
    personaje: avatarNombre,
    dupes_personaje: dupesPersonaje,
    rol,
    arma_usuario: weaponNombre,
    dupes_arma_usuario: weaponDupes,
    gear_usuario: gearUsuario,
    discos_usuario: discosUsuario,
    discos_optimo: discosOptimo,
    dano_usuario: danoUsuario,
    dano_optimizado: danoOptimizado,
    stats_usuario: statsUsuario,
    stats_optimizado: resultadoOptimizado.stats,
    def_boss_tipo: defBossTipo,
    def_boss_valor: defBossValor,
    porcentaje: porcentajeReal,
    porcentaje_user: porcentajeUser,
    porcentaje_real: porcentajeReal,
    cr_usuario: crUsuario,
    substats_usuario: substatsUsuario,
    substats_optimo: substatsOptimo,
    comparaciones: [{
      variante_nombre: 'Tu Build (Optimizada)',
      dano_variante: danoOptimizado,
      porcentaje_vs_variante: porcentajeReal,
      diferencia: danoOptimizado - danoUsuario,
      arma_variante: weaponNombre,
      gear_variante: gearUsuario,
      discos_variante: discosUsuario,
      substats_info: resultadoOptimizado.substats_info,
    }],
  };
}
