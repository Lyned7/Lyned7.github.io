/**
 * Optimización de substats — port de substats_optimizer.py
 */
import { SUBSTATS_VALORES, SUBSTATS_BASE_CONFIG } from '../data/dataStructures.js';

const DISCOS_VARIABLES = ['Disco 4', 'Disco 5', 'Disco 6'];
const ATACANTE_ATKP_BOOST = new Set(['Atk%', 'Cr', 'Cd']);
const RUPTURA_HPP_BOOST = new Set(['Hp%', 'Cr', 'Cd']);

export function ajustarSubstatsPorDiscos(substatsFijas, discosConfig, rol) {
  const substatsAjustadas = { ...substatsFijas };
  const contadorMainStats = {};

  for (const disco of DISCOS_VARIABLES) {
    const stat = discosConfig[disco];
    if (stat) contadorMainStats[stat] = (contadorMainStats[stat] ?? 0) + 1;
  }

  for (const [stat, cantidadDiscos] of Object.entries(contadorMainStats)) {
    if (stat in substatsAjustadas) {
      substatsAjustadas[stat] = Math.max(0, substatsAjustadas[stat] - cantidadDiscos);
    }
  }

  let atkpBoost = 0;
  let hppBoost = 0;
  for (const disco of DISCOS_VARIABLES) {
    const stat = discosConfig[disco];
    if (!stat) continue;
    if (rol === 'Atacante' && ATACANTE_ATKP_BOOST.has(stat)) atkpBoost += 1;
    else if (rol === 'Ruptura' && RUPTURA_HPP_BOOST.has(stat)) hppBoost += 1;
  }

  if (atkpBoost) substatsAjustadas.Atkp = (substatsAjustadas.Atkp ?? 0) + atkpBoost;
  if (hppBoost) substatsAjustadas.Hpp = (substatsAjustadas.Hpp ?? 0) + hppBoost;

  return substatsAjustadas;
}

export function prepararSubstatsFijas(rol, statsBase, discosConfig) {
  const config = SUBSTATS_BASE_CONFIG[rol];
  const statsConSubstats = { ...statsBase };
  const substatsFijasAjustadas = ajustarSubstatsPorDiscos(
    { ...config.substats_fijas },
    discosConfig,
    rol,
  );

  for (const [stat, cantidad] of Object.entries(substatsFijasAjustadas)) {
    if (stat in SUBSTATS_VALORES) {
      const valorTotal = cantidad * SUBSTATS_VALORES[stat];
      if (stat in statsConSubstats) statsConSubstats[stat] += valorTotal;
      else statsConSubstats[stat] = valorTotal;
    }
  }

  return statsConSubstats;
}

export function ajustarCompetenciaAnomalo(discosConfig, statsCompetencia) {
  const [stat1, stat2] = statsCompetencia;
  const preAsignaciones = { [stat1]: 0, [stat2]: 0 };
  let rollsReducidos = 0;

  for (const disco of DISCOS_VARIABLES) {
    const mainStat = discosConfig[disco];
    if (mainStat === stat1) {
      preAsignaciones[stat2] += 5;
      rollsReducidos += 5;
    } else if (mainStat === stat2) {
      preAsignaciones[stat1] += 5;
      rollsReducidos += 5;
    }
  }

  return { preAsignaciones, rollsReducidos };
}

export function optimizarSubstatsCompetencia(rol, statsBase, funcionDano, substatsDisponibles = 30, verbose = false) {
  const config = SUBSTATS_BASE_CONFIG[rol];
  const [stat1, stat2] = config.stats_competencia;
  const statsParaCalculo = { ...statsBase };

  let substatsCrUsadas = 0;
  if (config.stat_ajuste_cr) {
    const crActual = statsParaCalculo.Cr ?? 0;
    const crObjetivo = 1.0;
    if (crActual < crObjetivo) {
      const crFaltante = crObjetivo - crActual;
      substatsCrUsadas = Math.ceil(crFaltante / SUBSTATS_VALORES.Cr);
      statsParaCalculo.Cr += substatsCrUsadas * SUBSTATS_VALORES.Cr;
      substatsDisponibles -= substatsCrUsadas;
    }
  }

  let mejorDano = 0;
  let mejorDistribucion = null;

  for (let substatsStat1 = 0; substatsStat1 <= substatsDisponibles; substatsStat1++) {
    const substatsStat2 = substatsDisponibles - substatsStat1;
    const dano = funcionDano(statsParaCalculo, substatsStat1, substatsStat2);
    if (dano > mejorDano) {
      mejorDano = dano;
      mejorDistribucion = { [stat1]: substatsStat1, [stat2]: substatsStat2 };
    }
  }

  const substatsFinales = {
    [stat1]: mejorDistribucion[stat1] * SUBSTATS_VALORES[stat1],
    [stat2]: mejorDistribucion[stat2] * SUBSTATS_VALORES[stat2],
  };
  if (substatsCrUsadas > 0) substatsFinales.Cr = substatsCrUsadas * SUBSTATS_VALORES.Cr;

  return {
    distribucion_cantidad: mejorDistribucion,
    substats_valores: substatsFinales,
    dano_maximo: mejorDano,
    substats_cr_usadas: substatsCrUsadas,
    substats_competencia_usadas: substatsDisponibles,
  };
}

export function calcularSubstatsCompleto(rol, statsSinSubstats, discosConfig, funcionDano, verbose = true) {
  const statsConSubstatsFijas = prepararSubstatsFijas(rol, statsSinSubstats, discosConfig);
  const resultadoOptimizacion = optimizarSubstatsCompetencia(
    rol, statsConSubstatsFijas, funcionDano, 30, verbose,
  );

  const statsFinales = { ...statsConSubstatsFijas };
  for (const [stat, valor] of Object.entries(resultadoOptimizacion.substats_valores)) {
    if (stat in statsFinales) statsFinales[stat] += valor;
    else statsFinales[stat] = valor;
  }

  return {
    stats_con_substats_fijas: statsConSubstatsFijas,
    resultado_optimizacion: resultadoOptimizacion,
    stats_finales: statsFinales,
  };
}
