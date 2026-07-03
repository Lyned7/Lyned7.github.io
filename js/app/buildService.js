/**
 * Formatea respuesta para la UI — lógica de main.py sin FastAPI ni DB.
 */
import { AVATAR_ID_TO_NAME } from '../data/apiMappings.js';
import {
  PERSONAJES_DATA,
  SUBSTATS_BASE_CONFIG,
  VIDEOS_GUIAS,
} from '../data/dataStructures.js';
import { obtenerBuildOptimo } from '../data/buildsPredefinidos.js';
import {
  getCharacterIcon,
  getCharacterFull,
  getCharacterCircle,
  getCharacterImageByName,
  getGearSetImage,
  getWeaponImage,
} from '../data/imageMappings.js';
import { compararTodasLasVariantes } from '../calc/comparador.js';
import { buildDriveDisksUi } from '../calc/diskDisplay.js';
import { fetchShowcaseFromEnka } from '../api/enkaData.js';
import { esDps } from '../data/apiMappings.js';

const DISPLAY_STATS_BY_ROLE = {
  Atacante: ['Cd', 'Atk%', 'Atkp', 'Penp', 'Cr'],
  Anomalo: ['MA', 'Atk%', 'Atkp', 'Penp'],
  Ruptura: ['Cd', 'Hp%', 'Hpp', 'Cr', 'Atk%'],
};

const STAT_DISPLAY_NAMES = {
  'Atk%': 'Atk%',
  Atkp: 'Atk',
  Cr: 'C.Rate%',
  Cd: 'C.Dmg%',
  'Hp%': 'Hp%',
  Hpp: 'Hp',
  Defp: 'Def',
  Penp: 'Pen',
  MA: 'Anomaly',
};

function calcularGrade(percentage) {
  if (percentage >= 95) return 'S+';
  if (percentage > 90) return 'S';
  if (percentage > 80) return 'A';
  if (percentage > 75) return 'B';
  return 'C';
}

export async function getCharacters(uid) {
  if (!/^\d{10}$/.test(String(uid))) {
    throw new Error('UID invalido: debe ser exactamente 10 digitos numericos');
  }

  const outcome = await fetchShowcaseFromEnka(Number(uid));
  if (outcome.kind !== 'ok' || !outcome.personajes?.length) {
    const err = new Error(outcome.message ?? 'No se encontraron personajes');
    err.code = outcome.kind;
    throw err;
  }

  const characters = [];
  for (const p of outcome.personajes) {
    const avatarData = p.data_completa;
    const avatarId = avatarData.Id;
    const avatarNombre = AVATAR_ID_TO_NAME[avatarId] ?? 'Unknown';
    if (!esDps(avatarId)) continue;

    characters.push({
      id: avatarId,
      name: avatarNombre,
      image: getCharacterIcon(avatarId),
      circle: getCharacterCircle(avatarId),
      dupes: avatarData.TalentLevel ?? 0,
      raw_data: avatarData,
    });
  }

  return { nickname: outcome.nickname, characters };
}

export function calculateBuild(avatarData, uid, nickname = 'Viajero') {
  if (!/^\d{10}$/.test(String(uid))) {
    throw new Error('UID invalido: debe ser exactamente 10 digitos numericos');
  }

  const resultado = compararTodasLasVariantes(avatarData);
  if (resultado.error) throw new Error(resultado.error);

  const avatarId = avatarData.Id;
  const characterName = AVATAR_ID_TO_NAME[avatarId] ?? 'Unknown';
  const userDamage = resultado.dano_usuario;
  const optimizedDamage = resultado.dano_optimizado;
  const userPercentage = resultado.porcentaje_real ?? resultado.porcentaje ?? 0;
  const substatsUsuario = resultado.substats_usuario ?? {};
  const substatsOptimo = resultado.substats_optimo ?? {};

  const personajeData = PERSONAJES_DATA[characterName];
  const rol = personajeData?.rol;
  const statsToShow = DISPLAY_STATS_BY_ROLE[rol]
    ?? SUBSTATS_BASE_CONFIG[rol]?.stats_competencia
    ?? [];

  const substats = statsToShow.map((statName) => ({
    name: statName,
    display_name: STAT_DISPLAY_NAMES[statName] ?? statName,
    current: substatsUsuario[statName] ?? 0,
    max: substatsOptimo[statName] ?? 0,
  }));

  const buildOptimo = obtenerBuildOptimo(characterName);
  const team = [];
  if (buildOptimo) {
    for (const key of ['support1', 'support2']) {
      const s = buildOptimo[key];
      team.push({
        name: s.nombre,
        image: getCharacterImageByName(s.nombre),
        dupes: s.dupes,
        weapon: s.arma,
        weapon_dupes: s.dupes_arma,
      });
    }
  }

  const weaponId = avatarData.Weapon?.Id;
  const set4 = resultado.gear_usuario?.set_4pc;
  const set2 = resultado.gear_usuario?.set_2pc;

  return {
    character: {
      id: avatarId,
      name: characterName,
      image: getCharacterFull(avatarId),
      circle: getCharacterCircle(avatarId),
      dupes: resultado.dupes_personaje,
      rol: resultado.rol ?? '',
    },
    build: {
      weapon: {
        name: resultado.arma_usuario,
        dupes: resultado.dupes_arma_usuario,
        image: weaponId ? getWeaponImage(weaponId) : '/static/we/default.webp',
      },
      gear: {
        set_4pc: set4,
        set_2pc: set2,
        set_4pc_image: getGearSetImage(set4),
        set_2pc_image: getGearSetImage(set2),
        disks: buildDriveDisksUi(avatarData),
      },
      team,
    },
    substats,
    damage: { perfect: optimizedDamage, user: userDamage },
    porcentaje_user: resultado.porcentaje_user,
    porcentaje_real: resultado.porcentaje_real,
    cr_usuario: resultado.cr_usuario,
    user_percentage: userPercentage,
    ranking: {
      position: null,
      grade: calcularGrade(userPercentage),
    },
    video_guide: VIDEOS_GUIAS[characterName] ?? '',
    nickname,
  };
}
