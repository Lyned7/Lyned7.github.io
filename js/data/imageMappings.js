/**
 * Rutas locales de imágenes (personajes, armas, gear, substats).
 */
import {
  AVATAR_IMAGE_PATHS,
  GEAR_SET_IMAGES,
  WEAPON_IMAGE_PATHS,
  CHARACTER_NAME_TO_ID,
} from './imageMappingsData.js';
import { obtenerSetNombrePorId } from './apiMappings.js';

export { AVATAR_IMAGE_PATHS, GEAR_SET_IMAGES, WEAPON_IMAGE_PATHS, CHARACTER_NAME_TO_ID };

export function getCharacterIcon(avatarId) {
  return AVATAR_IMAGE_PATHS[avatarId]?.icon ?? '/static/pj/default.webp';
}

export function getCharacterFull(avatarId) {
  return AVATAR_IMAGE_PATHS[avatarId]?.icon ?? '/static/pj/default.webp';
}

export function getCharacterCircle(avatarId) {
  return AVATAR_IMAGE_PATHS[avatarId]?.circle ?? '/static/pj/default.webp';
}

export function getCharacterImageByName(characterName) {
  const avatarId = CHARACTER_NAME_TO_ID[characterName];
  return avatarId ? getCharacterCircle(avatarId) : '/static/pj/default.webp';
}

export function getSubstatIcon(statName) {
  if (!statName) return '/static/ss/default.webp';
  const fileName = statName.replace('%', 'x') + '.webp';
  return `/static/ss/${fileName}`;
}

export function getGearSetImage(setName) {
  return GEAR_SET_IMAGES[setName] ?? null;
}

export function getWeaponImage(weaponId) {
  return WEAPON_IMAGE_PATHS[weaponId] ?? '/static/we/default.webp';
}

export function getDiscPieceImage(discId, setName = null, _slot = null) {
  const resolvedSet = setName ?? (discId != null ? obtenerSetNombrePorId(discId) : null);
  if (resolvedSet) {
    const image = getGearSetImage(resolvedSet);
    if (image) return image;
  }
  return '/static/gear/default.webp';
}
