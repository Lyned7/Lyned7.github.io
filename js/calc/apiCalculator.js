/**
 * Parseo de datos Enka + cálculo de daño del usuario — port de api_calculator.py
 */
import {
  AVATAR_ID_TO_NAME,
  WEAPON_ID_TO_NAME,
  MAIN_PROPERTY_ID_TO_STAT,
  SUBSTAT_PROPERTY_ID_TO_STAT,
  obtenerSetNombrePorId,
} from '../data/apiMappings.js';
import { PERSONAJES_DATA, SUBSTATS_VALORES, DISCOS_STATS_PRINCIPALES } from '../data/dataStructures.js';
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
} from './statsCalculator.js';
import {
  calcularDanoAtacante,
  calcularDanoAnomalo,
  calcularDanoRuptura,
  calcularDanoSkillInsignia,
} from './damageCalculator.js';

export function extraerSubstatsDesdeApi(avatarData) {
  const substatsAcumulados = {};
  const equippedList = avatarData.EquippedList ?? [];

  for (const equip of equippedList) {
    const equipment = equip.Equipment ?? {};
    const randomProps = equipment.RandomPropertyList ?? [];

    for (const substat of randomProps) {
      const propId = substat.PropertyId;
      const propLevel = substat.PropertyLevel;
      const statNombre = SUBSTAT_PROPERTY_ID_TO_STAT[propId];
      if (statNombre) {
        substatsAcumulados[statNombre] = (substatsAcumulados[statNombre] ?? 0) + propLevel;
      }
    }
  }
  return substatsAcumulados;
}

export function extraerMainStatsDiscos(avatarData) {
  const discosConfig = {};
  const equippedList = avatarData.EquippedList ?? [];

  for (const equip of equippedList) {
    const slot = equip.Slot;
    if ([4, 5, 6].includes(slot)) {
      const equipment = equip.Equipment ?? {};
      const mainProp = (equipment.MainPropertyList ?? [{}])[0];
      const propId = mainProp.PropertyId;
      const statNombre = MAIN_PROPERTY_ID_TO_STAT[propId];
      if (statNombre) discosConfig[`Disco ${slot}`] = statNombre;
    }
  }
  return discosConfig;
}

export function extraerSetsGear(avatarData) {
  const setCounts = {};
  const equippedList = avatarData.EquippedList ?? [];

  for (const equip of equippedList) {
    const equipment = equip.Equipment ?? {};
    const discId = equipment.Id;
    const setNombre = obtenerSetNombrePorId(discId);
    if (setNombre) setCounts[setNombre] = (setCounts[setNombre] ?? 0) + 1;
  }

  const gearConfig = { set_4pc: null, set_2pc: null };
  const sorted = Object.entries(setCounts).sort((a, b) => b[1] - a[1]);

  for (const [setNombre, count] of sorted) {
    if (count >= 4 && !gearConfig.set_4pc) gearConfig.set_4pc = setNombre;
    else if (count >= 2 && count < 4 && !gearConfig.set_2pc) gearConfig.set_2pc = setNombre;
  }
  return gearConfig;
}

function sumarStats(statsTotales, source) {
  for (const [stat, valor] of Object.entries(source)) {
    if (stat in statsTotales) statsTotales[stat] += valor;
  }
}

export function calcularDanoDesdeApi(avatarData, buildPredefinido) {
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
  const skillInsignia = personaje.skills[skillInsigniaNombre];
  const tipoSkill = skillInsignia.tipo;

  const statsTotales = inicializarStatsVacios();

  sumarStats(statsTotales, obtenerStatsPersonaje(avatarNombre, dupesPersonaje, skillInsigniaNombre));
  sumarStats(statsTotales, obtenerStatsArmaDps(weaponNombre, weaponDupes, elemento, tipoSkill));

  const supportSources = [
    obtenerBuffsSupport(buildPredefinido.support1.nombre, buildPredefinido.support1.dupes, tipoSkill, rol),
    obtenerBuffsArmaSupport(buildPredefinido.support1.arma, buildPredefinido.support1.dupes_arma, tipoSkill),
    obtenerBuffsGearSupport(buildPredefinido.support1.nombre, buildPredefinido.support1.dupes, tipoSkill),
    obtenerBuffsSupport(buildPredefinido.support2.nombre, buildPredefinido.support2.dupes, tipoSkill, rol),
    obtenerBuffsArmaSupport(buildPredefinido.support2.arma, buildPredefinido.support2.dupes_arma, tipoSkill),
    obtenerBuffsGearSupport(buildPredefinido.support2.nombre, buildPredefinido.support2.dupes, tipoSkill),
  ];
  for (const src of supportSources) sumarStats(statsTotales, src);

  const gearUsuario = extraerSetsGear(avatarData);
  sumarStats(statsTotales, obtenerBuffsGearDps(gearUsuario, elemento, tipoSkill));

  const discosConfig = extraerMainStatsDiscos(avatarData);
  for (const [discoNombre, statElegido] of Object.entries(discosConfig)) {
    if (['Disco 4', 'Disco 5', 'Disco 6'].includes(discoNombre)) {
      const statsPosibles = DISCOS_STATS_PRINCIPALES[discoNombre].stats_posibles;
      if (statElegido in statsPosibles) {
        if (statElegido in statsTotales) statsTotales[statElegido] += statsPosibles[statElegido];
        else statsTotales[statElegido] = statsPosibles[statElegido];
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

  const statsEscalados = aplicarEscaladoStats(statsTotales, personaje);
  Object.assign(statsTotales, statsEscalados);

  statsTotales.ATK_Final = calcularAtkFinal(statsTotales);
  if (rol === 'Anomalo') statsTotales.Tasa_Final = calcularTasaFinal(statsTotales);
  if (rol === 'Ruptura') {
    statsTotales.HP_Final = calcularHpFinal(statsTotales);
    statsTotales.Sheer_Final = calcularSheer(statsTotales);
  }

  let danoBase;
  if (rol === 'Atacante') danoBase = calcularDanoAtacante(statsTotales, 0, 0, 952.8);
  else if (rol === 'Anomalo') danoBase = calcularDanoAnomalo(statsTotales, 0, 0, elemento, 952.8);
  else danoBase = calcularDanoRuptura(statsTotales, 0, 0, 952.8);

  const danoInfo = calcularDanoSkillInsignia(
    avatarNombre, dupesPersonaje, danoBase, statsTotales, 952.8, rol,
  );
  return danoInfo.dano_skill_insignia;
}
