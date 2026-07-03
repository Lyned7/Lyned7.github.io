/** Base path para assets en GitHub Pages (project site). Ajustar si el repo no está en la raíz. */
export const BASE_PATH = (() => {
  if (typeof document !== 'undefined') {
    const meta = document.querySelector('meta[name="base-path"]');
    if (meta?.content) return meta.content.replace(/\/$/, '');
  }
  return '';
})();

export function assetUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${p}`;
}
