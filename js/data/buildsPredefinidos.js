/**
 * Builds óptimos predefinidos por personaje.
 */
import { BUILDS_PREDEFINIDOS } from './buildsPredefinidosData.js';

export { BUILDS_PREDEFINIDOS };

/** Obtiene el build óptimo (100%) de un personaje. */
export function obtenerBuildOptimo(personajeNombre) {
  return BUILDS_PREDEFINIDOS[personajeNombre] ?? null;
}
