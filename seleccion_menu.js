/**
 * selection-menu.js
 * -----------------------------------------------------------------------
 * Motor GENERICO y reutilizable para desplegar menus de seleccion
 * (overlay + modal) en cualquier pestana de la app.
 *
 * No conoce nada sobre "DPS", "Support", "Discos", etc. Solo sabe
 * renderizar dos tipos de menu:
 *
 *   - openGridMenu()  -> grilla de imagenes (personajes, armas, discos,
 *                        enemigos...)
 *   - openListMenu()  -> lista simple de texto (niveles C0-C6, W1-W5...)
 *   - openInfoMenu()  -> lista de solo lectura (pares etiqueta/valor), sin
 *                        seleccion; solo se cierra (click afuera, Escape,
 *                        o el boton "Cerrar").
 *
 * Cualquier feature nueva que necesite "click -> elegir opcion -> aplicar"
 * debe reutilizar este motor en vez de crear su propio overlay.
 * -----------------------------------------------------------------------
 */

const OVERLAY_ID = "selection-overlay";

/** Devuelve (o crea) el overlay unico que se reutiliza para todos los menus. */
function getOverlay() {
    let overlay = document.getElementById(OVERLAY_ID);
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = OVERLAY_ID;
        overlay.className = "selection-overlay";
        document.body.appendChild(overlay);
    }
    return overlay;
}

/** Cierra cualquier menu abierto. */
export function closeSelectionMenu() {
    const overlay = document.getElementById(OVERLAY_ID);
    if (!overlay) return;
    overlay.classList.remove("active");
    overlay.innerHTML = "";
}

/**
 * Abre un menu tipo GRILLA de imagenes (personajes, armas, discos, enemigos).
 *
 * @param {Object}   config
 * @param {Array}    config.items       [{ key, name, image }, ...]
 * @param {string}   config.ratioClass  Clase de proporcion de imagen
 *                                      (ratio-dps, ratio-support, ratio-weapon,
 *                                       ratio-enemy, ratio-disk...)
 * @param {string}   [config.title]     Titulo opcional del menu
 * @param {Function} config.onSelect    (key) => void
 */
export function openGridMenu({ items, ratioClass, title, onSelect }) {
    const overlay = getOverlay();
    overlay.innerHTML = "";

    const modal = document.createElement("div");
    modal.className = "selection-modal";

    if (title) {
        const heading = document.createElement("div");
        heading.className = "modal-title";
        heading.textContent = title;
        modal.appendChild(heading);
    }

    const grid = document.createElement("div");
    grid.className = "modal-grid";

    items.forEach(({ key, name, image }) => {
        const item = document.createElement("div");
        item.className = "modal-item";

        const img = document.createElement("img");
        img.src = image;
        img.alt = name;
        img.className = ratioClass || "";

        const label = document.createElement("div");
        label.textContent = name;

        item.appendChild(img);
        item.appendChild(label);

        item.addEventListener("click", () => {
            onSelect(key);
            closeSelectionMenu();
        });

        grid.appendChild(item);
    });

    modal.appendChild(grid);
    overlay.appendChild(modal);
    overlay.classList.add("active");
}

/**
 * Abre un menu tipo LISTA simple de texto (niveles de dupe, refinamiento...).
 *
 * @param {Object}   config
 * @param {Array}    config.items    [{ label, value }, ...]
 * @param {string}   [config.title]  Titulo opcional del menu
 * @param {Function} config.onSelect (value) => void
 */
export function openListMenu({ items, title, onSelect }) {
    const overlay = getOverlay();
    overlay.innerHTML = "";

    const modal = document.createElement("div");
    modal.className = "selection-modal";

    if (title) {
        const heading = document.createElement("div");
        heading.className = "modal-title";
        heading.textContent = title;
        modal.appendChild(heading);
    }

    const list = document.createElement("div");
    list.className = "modal-list";

    items.forEach(({ label, value }) => {
        const item = document.createElement("div");
        item.className = "modal-list-item";
        item.textContent = label;
        item.addEventListener("click", () => {
            onSelect(value);
            closeSelectionMenu();
        });
        list.appendChild(item);
    });

    modal.appendChild(list);
    overlay.appendChild(modal);
    overlay.classList.add("active");
}

/**
 * Abre un menu tipo LISTA DE SOLO LECTURA (pares etiqueta/valor). No hay
 * seleccion posible; se usa para mostrar informacion, como los factores de
 * una formula de calculo. Se cierra igual que los demas (click afuera,
 * Escape, o el boton "Cerrar" que se agrega automaticamente).
 *
 * @param {Object} config
 * @param {Array}  config.rows    [{ label, value }, ...]
 * @param {string} [config.title] Titulo opcional del menu
 */
export function openInfoMenu({ rows, title }) {
    const overlay = getOverlay();
    overlay.innerHTML = "";

    const modal = document.createElement("div");
    modal.className = "selection-modal";

    if (title) {
        const heading = document.createElement("div");
        heading.className = "modal-title";
        heading.textContent = title;
        modal.appendChild(heading);
    }

    const list = document.createElement("div");
    list.className = "modal-info-list";

    rows.forEach(({ label, value }) => {
        const row = document.createElement("div");
        row.className = "modal-info-row";

        const labelEl = document.createElement("span");
        labelEl.className = "modal-info-label";
        labelEl.textContent = label;

        const valueEl = document.createElement("span");
        valueEl.className = "modal-info-value";
        valueEl.textContent = value;

        row.appendChild(labelEl);
        row.appendChild(valueEl);
        list.appendChild(row);
    });

    modal.appendChild(list);

    const closeBtn = document.createElement("div");
    closeBtn.className = "modal-info-close";
    closeBtn.textContent = "Cerrar";
    closeBtn.addEventListener("click", closeSelectionMenu);
    modal.appendChild(closeBtn);

    overlay.appendChild(modal);
    overlay.classList.add("active");
}

/* Cerrar el menu al hacer click fuera del modal, o con la tecla Escape. */
document.addEventListener("click", (e) => {
    const overlay = document.getElementById(OVERLAY_ID);
    if (overlay && e.target === overlay) {
        closeSelectionMenu();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSelectionMenu();
});
