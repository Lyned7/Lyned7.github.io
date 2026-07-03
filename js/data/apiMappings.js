/**
 * Mapeos de IDs Enka → nombres internos + utilidades.
 */
import {
  AVATAR_ID_TO_NAME,
  NAME_TO_AVATAR_ID,
  WEAPON_ID_TO_NAME,
  NAME_TO_WEAPON_ID,
  WEAPON_NAME_TO_ID,
  DISC_SET_ID_RANGES,
  MAIN_PROPERTY_ID_TO_STAT,
  SUBSTAT_PROPERTY_ID_TO_STAT,
  PROPERTY_ID_TO_SUBSTAT,
} from './apiMappingsData.js';
import { PERSONAJES_DATA } from './dataStructures.js';

export {
  AVATAR_ID_TO_NAME,
  NAME_TO_AVATAR_ID,
  WEAPON_ID_TO_NAME,
  NAME_TO_WEAPON_ID,
  WEAPON_NAME_TO_ID,
  DISC_SET_ID_RANGES,
  MAIN_PROPERTY_ID_TO_STAT,
  SUBSTAT_PROPERTY_ID_TO_STAT,
  PROPERTY_ID_TO_SUBSTAT,
};

/** Resuelve stat por PropertyId (main o sub). */
export function propertyIdToStat(propertyId) {
  return (
    MAIN_PROPERTY_ID_TO_STAT[propertyId] ??
    SUBSTAT_PROPERTY_ID_TO_STAT[propertyId] ??
    PROPERTY_ID_TO_SUBSTAT[propertyId] ??
    null
  );
}

/** Dado un ID de disco, retorna el nombre del set. */
export function obtenerSetNombrePorId(discId) {
  if (discId == null) return null;
  for (const [setNombre, data] of Object.entries(DISC_SET_ID_RANGES)) {
    const [minId, maxId] = data.range;
    if (discId >= minId && discId <= maxId) {
      return setNombre;
    }
  }
  return null;
}

/** Verifica si un avatar es DPS conocido por el calculador. */
export function esDps(avatarId) {
  const nombre = AVATAR_ID_TO_NAME[avatarId];
  return Boolean(nombre && PERSONAJES_DATA[nombre]);
}

/** Obtiene el rol de un avatar DPS. */
export function obtenerRol(avatarId) {
  const nombre = AVATAR_ID_TO_NAME[avatarId];
  if (!nombre || !PERSONAJES_DATA[nombre]) return null;
  return PERSONAJES_DATA[nombre].rol;
}
