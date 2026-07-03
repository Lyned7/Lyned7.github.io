/**
 * Cálculo y combinación de stats — port de stats_calculator.py
 */
import {
  PERSONAJES_DATA,
  ARMAS_DATA,
  ARMAS_SUPPORT_DATA,
  SUPPORTS_DATA,
  GEAR_SETS_DATA,
  GEAR_SETS_SUPPORT_DATA,
  DISCOS_STATS_PRINCIPALES,
  GEAR_RECOMENDADO,
  DISCOS_RECOMENDADOS,
} from '../data/dataStructures.js';

export function obtenerBuffPorTier(buffsDict, nivel) {
  if (!buffsDict || Object.keys(buffsDict).length === 0) return {};
  const tiers = Object.keys(buffsDict).map(Number).sort((a, b) => b - a);
  for (const tier of tiers) {
    if (nivel >= tier) return { ...buffsDict[String(tier)] ?? buffsDict[tier] };
  }
  return {};
}

export function obtenerMultiplicadorSkill(personajeNombre, dupesPersonaje, nombreSkill) {
  const personaje = PERSONAJES_DATA[personajeNombre];
  const skill = personaje.skills[nombreSkill];
  let tier;
  if (dupesPersonaje <= 2) tier = 'multi_A';
  else if (dupesPersonaje <= 4) tier = 'multi_B';
  else tier = 'multi_C';
  return skill[tier];
}

export function inicializarStatsVacios() {
  return {
    Atk_base: 0, Tasa_base: 0, Hp_base: 0,
    'Atk%': 0, Atkp: 0, Atkf: 0, Atke: 0,
    'Tasa%': 0, Tasap: 0, Tasaf: 0, Tasae: 0,
    'Hp%': 0, Hpp: 0, Hpf: 0, Hpe: 0,
    Cd: 0, Cr: 0, Cdf: 0,
    Dmg: 0, Def: 0, Res: 0, Pen: 0, Penp: 0, Vuln: 0,
    MA: 0, Admg: 0, Rdmg: 0, Sheere: 0, Mv: 0, Ta: 0, ER: 0, ERe: 0,
    Defp: 0,
  };
}

export function obtenerStatsPersonaje(personajeNombre, dupesPersonaje, nombreSkill) {
  const personaje = PERSONAJES_DATA[personajeNombre];
  const stats = inicializarStatsVacios();
  stats.Atk_base = personaje.atk_base;
  stats.Tasa_base = personaje.tasa_base;
  stats.Hp_base = personaje.hp_base;

  const dupesKey = String(dupesPersonaje);
  const buffsDupes = personaje.dupes[dupesKey] ?? personaje.dupes[dupesPersonaje];
  for (const [stat, valor] of Object.entries(buffsDupes)) {
    if (stat in stats) stats[stat] += valor;
  }

  const skillData = personaje.skills[nombreSkill];
  const tipoSkill = skillData.tipo;

  if (personaje.buffs_por_tipo?.[tipoSkill]) {
    const buffsTipo = obtenerBuffPorTier(personaje.buffs_por_tipo[tipoSkill], dupesPersonaje);
    for (const [stat, valor] of Object.entries(buffsTipo)) {
      if (stat in stats) stats[stat] += valor;
    }
  }

  if (personaje.buffs_especificos?.[nombreSkill]) {
    const buffsEsp = obtenerBuffPorTier(personaje.buffs_especificos[nombreSkill], dupesPersonaje);
    for (const [stat, valor] of Object.entries(buffsEsp)) {
      if (stat in stats) stats[stat] += valor;
    }
  }

  return stats;
}

export function obtenerStatsArmaDps(nombreArma, dupesArma, elementoDps, tipoSkill) {
  const arma = ARMAS_DATA[nombreArma];
  const stats = inicializarStatsVacios();
  stats.Atk_base = arma.atk_base;

  const statPrincipal = arma.stat_principal;
  stats[statPrincipal.stat] += statPrincipal.valor;

  const buffsBase = obtenerBuffPorTier(arma.buffs, dupesArma);
  for (const [stat, valor] of Object.entries(buffsBase)) {
    if (stat in stats) stats[stat] += valor;
  }

  if (arma.buffs_elemento?.[elementoDps]) {
    const buffsEl = obtenerBuffPorTier(arma.buffs_elemento[elementoDps], dupesArma);
    for (const [stat, valor] of Object.entries(buffsEl)) {
      if (stat in stats) stats[stat] += valor;
    }
  }

  if (arma.buffs_tipo_skill?.[tipoSkill]) {
    const buffsTipo = obtenerBuffPorTier(arma.buffs_tipo_skill[tipoSkill], dupesArma);
    for (const [stat, valor] of Object.entries(buffsTipo)) {
      if (stat in stats) stats[stat] += valor;
    }
  }

  if (arma.buffs_elemento_y_tipo?.[elementoDps]?.[tipoSkill]) {
    const buffsComb = obtenerBuffPorTier(arma.buffs_elemento_y_tipo[elementoDps][tipoSkill], dupesArma);
    for (const [stat, valor] of Object.entries(buffsComb)) {
      if (stat in stats) stats[stat] += valor;
    }
  }

  return stats;
}

export function obtenerBuffsSupport(nombreSupport, dupesSupport, tipoSkill, rolDps) {
  const support = SUPPORTS_DATA[nombreSupport];
  const buffs = inicializarStatsVacios();

  const buffsGenerales = obtenerBuffPorTier(support.buffs, dupesSupport);
  for (const [stat, valor] of Object.entries(buffsGenerales)) {
    if (stat === 'Mv_atacante' && rolDps === 'Atacante') buffs.Mv += valor;
    else if (stat === 'Mv_anomalo' && rolDps === 'Anomalo') buffs.Mv += valor;
    else if (stat !== 'Mv_atacante' && stat !== 'Mv_anomalo' && stat in buffs) buffs[stat] += valor;
  }

  if (support.buffs_tipo_skill?.[tipoSkill]) {
    const buffsTipo = obtenerBuffPorTier(support.buffs_tipo_skill[tipoSkill], dupesSupport);
    for (const [stat, valor] of Object.entries(buffsTipo)) {
      if (stat in buffs) buffs[stat] += valor;
    }
  }

  return buffs;
}

export function obtenerBuffsArmaSupport(nombreArma, dupesArma, tipoSkill = null) {
  const arma = ARMAS_SUPPORT_DATA[nombreArma];
  const buffs = inicializarStatsVacios();

  const buffsBase = obtenerBuffPorTier(arma.buffs, dupesArma);
  for (const [stat, valor] of Object.entries(buffsBase)) {
    if (stat in buffs) buffs[stat] += valor;
  }

  if (tipoSkill && arma.buffs_tipo_skill?.[tipoSkill]) {
    const buffsTipo = obtenerBuffPorTier(arma.buffs_tipo_skill[tipoSkill], dupesArma);
    for (const [stat, valor] of Object.entries(buffsTipo)) {
      if (stat in buffs) buffs[stat] += valor;
    }
  }

  return buffs;
}

function aplicarEfectoGear(buffs, efecto, elementoDps, tipoSkill) {
  if (efecto.buffs) {
    for (const [stat, valor] of Object.entries(efecto.buffs)) {
      if (stat in buffs) buffs[stat] += valor;
    }
  }
  if (efecto.buffs_elemento?.[elementoDps]) {
    for (const [stat, valor] of Object.entries(efecto.buffs_elemento[elementoDps])) {
      if (stat in buffs) buffs[stat] += valor;
    }
  }
  if (efecto.buffs_tipo_skill?.[tipoSkill]) {
    for (const [stat, valor] of Object.entries(efecto.buffs_tipo_skill[tipoSkill])) {
      if (stat in buffs) buffs[stat] += valor;
    }
  }
}

export function obtenerBuffsGearDps(gearConfig, elementoDps, tipoSkill) {
  const buffs = inicializarStatsVacios();

  if (gearConfig.set_4pc) {
    const set4 = GEAR_SETS_DATA[gearConfig.set_4pc];
    aplicarEfectoGear(buffs, set4.efecto_2pc, elementoDps, tipoSkill);
    aplicarEfectoGear(buffs, set4.efecto_4pc, elementoDps, tipoSkill);

    if (gearConfig.set_2pc) {
      const set2 = GEAR_SETS_DATA[gearConfig.set_2pc];
      aplicarEfectoGear(buffs, set2.efecto_2pc, elementoDps, tipoSkill);
    }
  }

  return buffs;
}

export function obtenerBuffsGearSupport(nombreSupport, dupesSupport, tipoSkill) {
  const support = SUPPORTS_DATA[nombreSupport];
  const buffs = inicializarStatsVacios();

  if (!support.gear_recomendado) return buffs;

  const gearSet = GEAR_SETS_SUPPORT_DATA[support.gear_recomendado];
  const efecto4pc = gearSet.efecto_4pc;

  if (efecto4pc.buffs) {
    for (const [stat, valor] of Object.entries(efecto4pc.buffs)) {
      if (stat in buffs) buffs[stat] += valor;
    }
  }
  if (efecto4pc.buffs_tipo_skill?.[tipoSkill]) {
    for (const [stat, valor] of Object.entries(efecto4pc.buffs_tipo_skill[tipoSkill])) {
      if (stat in buffs) buffs[stat] += valor;
    }
  }

  return buffs;
}

export function obtenerStatsDiscos(discosConfig) {
  const stats = inicializarStatsVacios();
  stats.Hpp += DISCOS_STATS_PRINCIPALES['Disco 1'].valor;
  stats.Atkp += DISCOS_STATS_PRINCIPALES['Disco 2'].valor;
  stats.Defp += DISCOS_STATS_PRINCIPALES['Disco 3'].valor;

  for (const discoNombre of ['Disco 4', 'Disco 5', 'Disco 6']) {
    if (discosConfig[discoNombre]) {
      const statElegido = discosConfig[discoNombre];
      const statsPosibles = DISCOS_STATS_PRINCIPALES[discoNombre].stats_posibles;
      if (statElegido in statsPosibles) {
        stats[statElegido] += statsPosibles[statElegido];
      }
    }
  }

  return stats;
}

export function obtenerGearConfigAuto(personajeNombre) {
  if (GEAR_RECOMENDADO[personajeNombre]) {
    return GEAR_RECOMENDADO[personajeNombre].build_principal;
  }
  const primerSet = Object.keys(GEAR_SETS_DATA)[0];
  return { set_4pc: primerSet, set_2pc: null };
}

export function obtenerDiscosConfigAuto(personajeNombre) {
  if (DISCOS_RECOMENDADOS[personajeNombre]) {
    return DISCOS_RECOMENDADOS[personajeNombre].build_principal;
  }
  const personaje = PERSONAJES_DATA[personajeNombre];
  const rol = personaje.rol;
  if (rol === 'Atacante') return { 'Disco 4': 'Cd', 'Disco 5': 'Dmg', 'Disco 6': 'Atk%' };
  if (rol === 'Anomalo') return { 'Disco 4': 'MA', 'Disco 5': 'Dmg', 'Disco 6': 'Tasa%' };
  return { 'Disco 4': 'Cd', 'Disco 5': 'Dmg', 'Disco 6': 'Hp%' };
}

export function combinarTodosLosStats({
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
}) {
  const personaje = PERSONAJES_DATA[personajeNombre];
  const elementoDps = personaje.elemento;
  const rolDps = personaje.rol;
  const tipoSkill = personaje.skills[nombreSkill].tipo;

  if (!gearConfig) gearConfig = obtenerGearConfigAuto(personajeNombre);
  if (!discosConfig) discosConfig = obtenerDiscosConfigAuto(personajeNombre);

  const sources = [
    obtenerStatsPersonaje(personajeNombre, dupesPersonaje, nombreSkill),
    obtenerStatsArmaDps(nombreArmaDps, dupesArmaDps, elementoDps, tipoSkill),
    obtenerBuffsSupport(support1Nombre, dupesSupport1, tipoSkill, rolDps),
    obtenerBuffsArmaSupport(armaSupport1Nombre, dupesArmaSupport1, tipoSkill),
    obtenerBuffsGearSupport(support1Nombre, dupesSupport1, tipoSkill),
    obtenerBuffsSupport(support2Nombre, dupesSupport2, tipoSkill, rolDps),
    obtenerBuffsArmaSupport(armaSupport2Nombre, dupesArmaSupport2, tipoSkill),
    obtenerBuffsGearSupport(support2Nombre, dupesSupport2, tipoSkill),
    obtenerBuffsGearDps(gearConfig, elementoDps, tipoSkill),
    obtenerStatsDiscos(discosConfig),
  ];

  const statsTotales = inicializarStatsVacios();
  for (const source of sources) {
    for (const [stat, valor] of Object.entries(source)) {
      if (stat in statsTotales) statsTotales[stat] += valor;
    }
  }
  return statsTotales;
}

export function calcularAtkFinal(stats) {
  const atkBase = stats.Atk_base;
  const atkPercent = stats['Atk%'];
  const atkp = stats.Atkp;
  const atkf = stats.Atkf;
  const atke = stats.Atke;
  return (((atkBase * (1 + atkPercent)) + atkp) * (1 + atkf)) + atke;
}

export function calcularTasaFinal(stats) {
  const tasaBase = stats.Tasa_base;
  const tasaPercent = stats['Tasa%'];
  const tasap = stats.Tasap;
  const tasaf = stats.Tasaf;
  const tasae = stats.Tasae;
  return (((tasaBase * (1 + tasaPercent)) + tasap) * (1 + tasaf)) + tasae;
}

export function calcularHpFinal(stats) {
  const hpBase = stats.Hp_base;
  const hpPercent = stats['Hp%'];
  const hpp = stats.Hpp;
  const hpf = stats.Hpf;
  const hpe = stats.Hpe;
  return (((hpBase * (1 + hpPercent)) + hpp) * (1 + hpf)) + hpe;
}

export function calcularErFinal(stats, erBase = 1.56) {
  const erTotal = stats.ER ?? 0;
  const ereTotal = stats.ERe ?? 0;
  return (erBase * (1 + erTotal)) + ereTotal;
}

export function calcularSheer(stats) {
  const atkFinal = calcularAtkFinal(stats);
  const hpFinal = calcularHpFinal(stats);
  const sheereTotal = stats.Sheere ?? 0;
  return (atkFinal * 0.3) + (hpFinal * 0.1) + sheereTotal;
}

export function aplicarEscaladoStats(stats, personaje) {
  const statsEscalados = { ...stats };
  if (!personaje.stat_escalado) return statsEscalados;

  const config = personaje.stat_escalado;
  const statFuente = config.stat_fuente;
  const umbral = config.umbral;
  const paso = config.paso ?? 1;

  let valorFuente;
  if (statFuente === 'Tasa_Final') valorFuente = calcularTasaFinal(statsEscalados);
  else if (statFuente === 'Atk_Final') valorFuente = calcularAtkFinal(statsEscalados);
  else if (statFuente === 'Hp_Final') valorFuente = calcularHpFinal(statsEscalados);
  else if (statFuente === 'ER_Final') {
    valorFuente = calcularErFinal(statsEscalados, personaje.er_base ?? 1.56);
  } else valorFuente = statsEscalados[statFuente] ?? 0;

  if (valorFuente <= umbral) return statsEscalados;

  const cantidadPasos = (valorFuente - umbral) / paso;
  const statDestino = config.stat_destino;

  const destinos = Array.isArray(statDestino)
    ? statDestino
    : [{ stat: statDestino, razon: config.razon, max_ganancia: config.max_ganancia ?? null }];

  for (const destino of destinos) {
    const statNombre = destino.stat;
    const razon = destino.razon;
    const maxGanancia = destino.max_ganancia ?? null;
    let bonus = cantidadPasos * razon;
    if (maxGanancia != null) bonus = Math.min(bonus, maxGanancia);
    if (statNombre in statsEscalados) statsEscalados[statNombre] += bonus;
    else statsEscalados[statNombre] = bonus;
  }

  return statsEscalados;
}

export function calcularMultiplicadorDefensa(stats, defBoss = 952.8) {
  const defTotal = stats.Def ?? 0;
  const penTotal = stats.Pen ?? 0;
  const penpTotal = stats.Penp ?? 0;
  return 794 / (794 + ((defBoss * (1 - defTotal)) * (1 - penTotal) - penpTotal));
}
