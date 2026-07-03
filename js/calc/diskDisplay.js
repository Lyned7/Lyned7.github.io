/**
 * UI de Drive Disks — port de disk_display.py
 */
import {
  MAIN_PROPERTY_ID_TO_STAT,
  SUBSTAT_PROPERTY_ID_TO_STAT,
  obtenerSetNombrePorId,
} from '../data/apiMappings.js';
import { DISCOS_STATS_PRINCIPALES, SUBSTATS_VALORES } from '../data/dataStructures.js';
import { getDiscPieceImage, getSubstatIcon } from '../data/imageMappings.js';

const DISK_GRID_DISPLAY_ORDER = [1, 6, 2, 5, 3, 4];
const DISK_GRADE_PLACEHOLDERS = ['S', 'S', 'A', 'S', 'S+', 'S'];

const MAIN_STAT_DISPLAY = {
  'Hp%': 'Hp %',
  'Atk%': 'Atk %',
  'Def%': 'Def %',
  'Tasa%': 'Tasa %',
  Dmg: 'Dmg %',
  Pen: 'Pen %',
};

function resolveStatName(propertyId, useMainMap = false) {
  if (useMainMap) {
    const name = MAIN_PROPERTY_ID_TO_STAT[propertyId];
    if (name) return name;
  }
  return SUBSTAT_PROPERTY_ID_TO_STAT[propertyId] ?? MAIN_PROPERTY_ID_TO_STAT[propertyId] ?? null;
}

function mainStatLabel(statName) {
  if (!statName) return '—';
  return MAIN_STAT_DISPLAY[statName] ?? statName;
}

function rollBaseValue(statName) {
  if (statName in SUBSTATS_VALORES) return SUBSTATS_VALORES[statName];
  for (const discoKey of ['Disco 4', 'Disco 5', 'Disco 6']) {
    const posibles = DISCOS_STATS_PRINCIPALES[discoKey]?.stats_posibles ?? {};
    if (statName in posibles) return posibles[statName];
  }
  return null;
}

function isPercentRollStat(statName, base) {
  return typeof base === 'number' && base < 1;
}

export function formatSubstatRollValue(statName, propertyLevel, propertyValue = null) {
  const base = rollBaseValue(statName);
  if (propertyLevel <= 0) return '—';
  if (base == null) {
    if (propertyValue != null) return String(Math.trunc(propertyValue));
    return '—';
  }
  const total = base * propertyLevel;
  if (isPercentRollStat(statName, base)) {
    const pct = total * 100;
    let text = pct.toFixed(1).replace(/\.?0+$/, '');
    return `${text}%`;
  }
  if (Math.abs(total - Math.round(total)) < 1e-6) return String(Math.round(total));
  return total.toFixed(1).replace(/\.?0+$/, '');
}

export function buildDriveDisksUi(avatarData) {
  const bySlot = {};

  for (const equip of avatarData.EquippedList ?? []) {
    const slot = equip.Slot;
    const equipment = equip.Equipment ?? {};
    if (!slot || !equipment || Object.keys(equipment).length === 0) continue;

    const discId = equipment.Id;
    const setName = discId ? obtenerSetNombrePorId(discId) : null;

    const mainProp = (equipment.MainPropertyList ?? [{}])[0];
    const mainStatName = resolveStatName(mainProp.PropertyId, true);

    const substatsUi = [];
    for (const prop of equipment.RandomPropertyList ?? []) {
      const statName = resolveStatName(prop.PropertyId, false);
      if (!statName) continue;
      const level = prop.PropertyLevel ?? 0;
      substatsUi.push({
        name: statName,
        icon: getSubstatIcon(statName),
        level,
        display: formatSubstatRollValue(statName, level, prop.PropertyValue),
      });
    }

    bySlot[slot] = {
      slot,
      slot_label: `D${slot}`,
      equipment_id: discId,
      set_name: setName,
      disc_image: getDiscPieceImage(discId, setName, slot),
      main_stat: mainStatLabel(mainStatName),
      substats: substatsUi,
    };
  }

  return DISK_GRID_DISPLAY_ORDER.map((slot, idx) => {
    const disk = bySlot[slot];
    if (disk) return { ...disk, grade: DISK_GRADE_PLACEHOLDERS[idx] };
    return {
      slot,
      slot_label: `D${slot}`,
      equipment_id: null,
      set_name: null,
      disc_image: null,
      main_stat: '—',
      substats: [],
      grade: DISK_GRADE_PLACEHOLDERS[idx],
    };
  });
}
