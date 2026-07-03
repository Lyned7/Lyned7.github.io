/**
 * Fórmulas de daño por rol — port de damage_calculator.py
 */
import { PERSONAJES_DATA, SUBSTATS_VALORES, ANOMALIA_BASE } from '../data/dataStructures.js';
import {
  calcularAtkFinal,
  calcularTasaFinal,
  calcularHpFinal,
  calcularSheer,
  obtenerMultiplicadorSkill,
  obtenerBuffPorTier,
} from './statsCalculator.js';

export function calcularMvAnomalia(elemento, taBonus = 0) {
  if (!(elemento in ANOMALIA_BASE)) return 0;
  const config = ANOMALIA_BASE[elemento];
  const duracionTotal = config.duracion_base + taBonus;
  const cantidadGolpes = duracionTotal / config.intervalo;
  return config.mv_por_golpe * cantidadGolpes;
}

export function calcularDanoAtacante(stats, substatsCd = 0, substatsAtkPercent = 0, defBoss = 952.8) {
  const statsTemp = { ...stats };
  statsTemp.Cd += substatsCd * SUBSTATS_VALORES.Cd;
  statsTemp['Atk%'] += substatsAtkPercent * SUBSTATS_VALORES['Atk%'];

  const atkFinal = calcularAtkFinal(statsTemp);
  const cdTotal = statsTemp.Cd;
  const cdfTotal = statsTemp.Cdf ?? 0;
  const dmgTotal = statsTemp.Dmg;
  const resTotal = statsTemp.Res;
  const vulnTotal = statsTemp.Vuln;
  const defTotal = statsTemp.Def;
  const penTotal = statsTemp.Pen;
  const penpTotal = statsTemp.Penp;

  const multiplicadorDefensa = 794 / (794 + ((defBoss * (1 - defTotal)) * (1 - penTotal) - penpTotal));
  const multCrit = (1 + (cdTotal * (1 + cdfTotal)));

  return atkFinal * multCrit * (1 + dmgTotal) * (1.2 + resTotal) * (1.5 + vulnTotal) * multiplicadorDefensa;
}

export function calcularDanoAnomalo(stats, substatsMa = 0, substatsAtkPercent = 0, elemento = 'Ether', defBoss = 952.8) {
  const statsTemp = { ...stats };
  statsTemp.MA += substatsMa * SUBSTATS_VALORES.MA;
  statsTemp['Atk%'] += substatsAtkPercent * SUBSTATS_VALORES['Atk%'];

  const atkFinal = calcularAtkFinal(statsTemp);
  const dmgTotal = statsTemp.Dmg;
  const maTotal = statsTemp.MA;
  const resTotal = statsTemp.Res;
  const admgTotal = statsTemp.Admg;
  const vulnTotal = statsTemp.Vuln;
  const defTotal = statsTemp.Def;
  const penTotal = statsTemp.Pen;
  const penpTotal = statsTemp.Penp;
  const taBonus = statsTemp.Ta;

  const multiplicadorDefensa = 794 / (794 + ((defBoss * (1 - defTotal)) * (1 - penTotal) - penpTotal));
  const mvAnomalia = calcularMvAnomalia(elemento, taBonus);

  return (
    atkFinal * (1 + dmgTotal) * (maTotal / 100) * (1.2 + resTotal) *
    (1 + admgTotal) * (1.5 + vulnTotal) * multiplicadorDefensa * mvAnomalia * 2
  );
}

export function calcularDanoRuptura(stats, substatsCd = 0, substatsHpPercent = 0, _defBoss = 952.8) {
  const statsTemp = { ...stats };
  statsTemp.Cd += substatsCd * SUBSTATS_VALORES.Cd;
  statsTemp['Hp%'] += substatsHpPercent * SUBSTATS_VALORES['Hp%'];

  const sheerFinal = calcularSheer(statsTemp);
  const cdTotal = statsTemp.Cd;
  const cdfTotal = statsTemp.Cdf ?? 0;
  const dmgTotal = statsTemp.Dmg;
  const resTotal = statsTemp.Res;
  const vulnTotal = statsTemp.Vuln;
  const rdmgTotal = statsTemp.Rdmg;
  const multCrit = (1 + (cdTotal * (1 + cdfTotal)));

  return sheerFinal * multCrit * (1 + dmgTotal) * (1.2 + resTotal) * (1.5 + vulnTotal) * (1 + rdmgTotal);
}

export function calcularDanoSkillInsignia(
  personajeNombre,
  dupesPersonaje,
  danoOptimoBase,
  statsFinales,
  defBoss = 952.8,
  rol = 'Atacante',
) {
  const personaje = PERSONAJES_DATA[personajeNombre];
  const skillInsigniaNombre = personaje.skill_insignia;
  const skillInsignia = personaje.skills[skillInsigniaNombre];

  const multiplicadorBase = obtenerMultiplicadorSkill(personajeNombre, dupesPersonaje, skillInsigniaNombre);

  let mvBonusDps = 0;
  if (personaje.buffs_especificos?.[skillInsigniaNombre]) {
    const buffsEsp = obtenerBuffPorTier(personaje.buffs_especificos[skillInsigniaNombre], dupesPersonaje);
    mvBonusDps = buffsEsp.Mv ?? 0;
  }

  const tipoDano = skillInsignia.tipo_dano ?? null;
  let mvBonusSupports = 0;
  if (tipoDano !== 'anomalia') mvBonusSupports = statsFinales.Mv ?? 0;

  let mvEscalado = 0;
  if (skillInsignia.mv_escalado) {
    const esc = skillInsignia.mv_escalado;
    mvEscalado = (statsFinales[esc.stat] ?? 0) * esc.valor_por_punto;
  }

  const mvBonusTotal = mvBonusDps + mvBonusSupports + mvEscalado;
  const multiplicadorTotal = multiplicadorBase + mvBonusTotal;

  let danoBaseReal;
  if (rol === 'Atacante') {
    danoBaseReal = calcularDanoAtacante(statsFinales, 0, 0, defBoss);
  } else if (rol === 'Anomalo') {
    danoBaseReal = calcularDanoAnomalo(statsFinales, 0, 0, personaje.elemento ?? 'Fuego', defBoss);
  } else if (rol === 'Ruptura') {
    danoBaseReal = calcularDanoRuptura(statsFinales, 0, 0, defBoss);
  } else {
    danoBaseReal = danoOptimoBase;
  }

  const danoSkillInsignia = danoBaseReal * multiplicadorTotal;

  return {
    skill_nombre: skillInsigniaNombre,
    tipo_skill: skillInsignia.tipo,
    tipo_dano: tipoDano,
    multiplicador_base: multiplicadorBase,
    mv_bonus_dps: mvBonusDps,
    mv_bonus_supports: mvBonusSupports,
    mv_escalado: mvEscalado,
    mv_bonus_total: mvBonusTotal,
    multiplicador_total: multiplicadorTotal,
    dano_base_optimizado: danoOptimoBase,
    dano_base_real: danoBaseReal,
    dano_skill_insignia: danoSkillInsignia,
  };
}
