/**
 * app.js
 * -----------------------------------------------------------------------
 * Controlador de la pestana "Optimizer".
 *
 * Conecta los modulos de datos (dps, we_dps, supp, we_supp, disk_dps,
 * disk_supp, enemy) con los elementos del HTML marcados con el atributo
 * data-select="...".
 *
 * Para agregar un nuevo selector en el futuro (esta u otra pestana) solo
 * hace falta:
 *   1) Marcar el/los elemento(s) en el HTML con data-select="mi-clave".
 *   2) Agregar una entrada en SELECTORS (abajo) apuntando a esos elementos
 *      y al modulo de datos que quieres listar.
 * No hace falta tocar selection-menu.js ni la logica de apertura/cierre.
 * -----------------------------------------------------------------------
 */

import dps from "../../data/Characters/dps_data.js";
import we_dps from "../../data/Wengine/we_dps_data.js";
import supp from "../../data/Characters/supp_data.js";
import we_supp from "../../data/Wengine/we_supp_data.js";
import disk_dps from "../../data/Disks/disk_dps_data.js";
import disk_supp from "../../data/Disks/disk_supp_data.js";
import enemy from "../../data/Enemy/enemy_data.js";
import da from "../../data/Enemy/da.js";
import mainstats from "../../data/Stats/stats.js";
import substats from "../../data/Stats/sub.js";

import { openGridMenu, openListMenu, openInfoMenu, openCompactLevelMenu } from "../../seleccion_menu.js";
import { optimizarDiscos } from "../calculation/optimizer.js";
import { fetchEnkaShowcase, parseEnkaShowcase } from "./enkaImport.js";

/* ------------------------------------------------------------------- */
/*  Estado global de la seleccion actual (util para el boton OPTIMIZAR  */
/*  y para cualquier logica de calculo futura).                        */
/* ------------------------------------------------------------------- */
export const state = {
    dpsCharacter: null,
    dpsCharacterLevel: 0,   // C0 - C6
    dpsSkillName: null,     // Nombre de la skill del DPS elegido
    dpsSkillValue: null,    // Valor de esa skill segun el nivel de dupe actual
    dpsForceStun: false,    // true si el DPS elegido obliga el stun a ON
    enemyStunOn: false,     // estado actual del toggle Stun del enemigo
    dpsWeapon: null,
    dpsWeaponLevel: 1,      // W1 - W5
    dpsSet4p: null,
    dpsSet2p: null,
    dpsMainStatD4: null,
    dpsMainStatD5: null,
    dpsMainStatD6: null,

    support1Character: null,
    support1CharacterLevel: 0,
    support1Weapon: null,
    support1WeaponLevel: 1,
    support1Set: null,
    support1BuffValue: 0,

    support2Character: null,
    support2CharacterLevel: 0,
    support2Weapon: null,
    support2WeaponLevel: 1,
    support2Set: null,
    support2BuffValue: 0,

    enemy: null,
    da: null,

    topResults: [],       // hasta 5 combinaciones { disks, danoPromedio }, de mayor a menor dano
    topResultIndex: -1,   // cual de las 5 esta mostrada actualmente (-1 = ninguna)
    optimizedStatsMode: "menu", // "menu" | "combat"
};

/* ------------------------------------------------------------------- */
/*  Helpers                                                             */
/* ------------------------------------------------------------------- */

/** Asegura que la ruta de imagen tenga "/" inicial (coherente con el HTML). */
function normalizeImage(path) {
    if (!path) return "";
    return path.startsWith("/") ? path : "/" + path;
}

/** Traduce claves internas de stats solo para mostrarlas en la interfaz. */
const STAT_DISPLAY_NAMES = {
    Hpp: "HP",
    Hpx: "HP%",
    Atkp: "ATK",
    Atkx: "ATK%",
    Atke: "ATK",
    Atkf: "ATK%",
    Defp: "DEF",
    Defx: "DEF%",
    Defe: "DEF",
    Deff: "DEF%",
    CR: "CRIT Rate",
    CR_Base: "CRIT Rate",
    CD: "CRIT DMG",
    CD_Base: "CRIT DMG",
    Penp: "PEN",
    Penx: "PEN Ratio",
    Dmg: "DMG%",
    Dmg_Physical: "Phys%",
    Dmg_Fire: "Fire%",
    Dmg_Ice: "Ice%",
    Dmg_Electric: "Electric%",
    Dmg_Ether: "Ether%",
    Dmg_Wind: "Wind%",
    Tasax: "Anomaly Mastery",
    ERx: "Energy Regen%",
    Impactx: "Impact%",
    MA: "Anomaly Proficiency",
    MA_Base: "Anomaly Proficiency",
    Admg: "Anomaly DMG%",
    Rdmg: "EX DMG%",
    Stun: "Stun DMG%",
    Sdmg: "Stun DMG%",
    Cont: "DMG%",
};

function getStatDisplayName(statName) {
    return STAT_DISPLAY_NAMES[statName] || statName;
}

/** Convierte un modulo de datos { nombre: {Image, ...} } en items para el grid. */
function toGridItems(dataObj, filter) {
    return Object.entries(dataObj)
        .filter(([key, val]) => !filter || filter(key, val))
        .map(([key, val]) => ({
            key,
            name: key,
            image: normalizeImage(val.Image),
        }));
}

/** Genera items 0..n o n1..n2 para menus de nivel (dupes / refinamientos). */
function levelItems(min, max, prefix) {
    const items = [];
    for (let n = min; n <= max; n++) {
        items.push({ label: `${prefix}${n}`, value: n });
    }
    return items;
}

/**
 * Normaliza la info de escalado de un Support, ya que el diccionario `supp`
 * usa DOS formas distintas segun el personaje:
 *   - stat_escalado: { stat_fuente, max_buff_umbral, ... }   (Roxy, Rina)
 *   - buffs_bar:     { stat_buff,   max_buff_umbral, ... }   (Sunna)
 * Devuelve siempre la misma forma: { statFuente, maxBuffUmbral }.
 */
function getScalingInfo(entry) {
    if (entry && entry.stat_escalado) {
        return {
            statFuente: entry.stat_escalado.stat_fuente ?? "",
            maxBuffUmbral: entry.stat_escalado.max_buff_umbral ?? 0,
        };
    }
    if (entry && entry.buffs_bar) {
        return {
            statFuente: entry.buffs_bar.stat_buff ?? "",
            maxBuffUmbral: entry.buffs_bar.max_buff_umbral ?? 0,
        };
    }
    return { statFuente: "", maxBuffUmbral: 0 };
}

/** Redondea un valor al multiplo de `step` mas cercano, dentro de [0, max]. */
function clampToStep(value, max, step) {
    if (Number.isNaN(value)) return 0;
    const clamped = Math.min(Math.max(value, 0), max);
    const rounded = Math.round(clamped / step) * step;
    // Evita errores de coma flotante tipo 0.30000000000000004
    return Math.round(rounded * 1000) / 1000;
}

/* ------------------------------------------------------------------- */
/*  Binder generico: click en un elemento -> abre grid -> actualiza     */
/*  texto + imagen + estado.                                           */
/* ------------------------------------------------------------------- */
function bindGridSelector({ selector, dataObj, ratioClass, title, textEl, imgEl, stateKey, filter, onChange }) {
    const triggers = document.querySelectorAll(selector);
    if (!triggers.length) return;

    triggers.forEach((trigger) => {
        trigger.classList.add("selectable");
        trigger.addEventListener("click", (e) => {
            // Si el click vino de un sub-elemento de nivel (field-side), lo ignoramos aqui.
            if (e.target.closest("[data-select$='-level']")) return;

            openGridMenu({
                items: toGridItems(dataObj, filter),
                ratioClass,
                title,
                onSelect: (key) => {
                    const entry = dataObj[key];
                    if (textEl) {
                        const target = document.querySelector(textEl);
                        if (target) target.textContent = key;
                    }
                    if (imgEl) {
                        document.querySelectorAll(imgEl).forEach((img) => {
                            img.src = normalizeImage(entry.Image);
                            img.alt = key;
                        });
                    }
                    if (stateKey) state[stateKey] = key;
                    if (onChange) onChange(key, entry);
                },
            });
        });
    });
}

/** Binder generico para selectores de NIVEL (C0-C6, W1-W5...). */
let activeCompactTrigger = null;
function bindLevelSelector({ selector, min, max, prefix, title, stateKey, onChange, compact = false }) {
    const trigger = document.querySelector(selector);
    if (!trigger) return;

    trigger.classList.add("selectable");

    trigger.addEventListener("click", (e) => {
        e.stopPropagation();

        if (compact) {
            const existingMenu = document.querySelector(".dupe-inline-menu");

            // Si el menú está abierto sobre esta misma celda, cerrarlo
            if (existingMenu && activeCompactTrigger === trigger) {
                closeCompactLevelMenu();
                activeCompactTrigger = null;
                return;
            }

            // Si hay otro menú abierto, cerrarlo primero
            if (existingMenu) {
                closeCompactLevelMenu();
            }

            activeCompactTrigger = trigger;

            const items = levelItems(min, max, prefix);

            openCompactLevelMenu({
                anchorEl: trigger,
                items,
                onSelect: (value) => {
                    trigger.textContent = `${prefix}${value}`;

                    if (stateKey) state[stateKey] = value;
                    if (onChange) onChange(value);

                    activeCompactTrigger = null;
                },
            });

            return;
        }

        const items = levelItems(min, max, prefix);

        openListMenu({
            items,
            title,
            onSelect: (value) => {
                trigger.textContent = `${prefix}${value}`;

                if (stateKey) state[stateKey] = value;
                if (onChange) onChange(value);
            },
        });
    });
}

function closeCompactLevelMenu() {
    const menu = document.querySelector(".dupe-inline-menu");

    if (menu) {
        menu.remove();
    }

    activeCompactTrigger = null;
}

/**
 * Dibuja el chip removible con el nombre del stat elegido dentro del
 * contenedor de la celda (D4 / D5 / D6...).
 */
function renderStatChip(container, statName, stateKey) {
    if (!container) return;
    container.innerHTML = "";

    const chip = document.createElement("div");
    chip.className = "stat-chip";

    const name = document.createElement("span");
    name.className = "stat-chip-name";
    name.textContent = getStatDisplayName(statName);

    const remove = document.createElement("span");
    remove.className = "stat-chip-remove";
    remove.textContent = "×";
    remove.title = "Quitar stat";
    remove.addEventListener("click", (e) => {
        e.stopPropagation();
        container.innerHTML = "";
        if (stateKey) state[stateKey] = null;
    });

    chip.appendChild(name);
    chip.appendChild(remove);
    container.appendChild(chip);

    if (stateKey) state[stateKey] = statName;
}

/**
 * Binder para la barra de "Stat Buff" de un panel de Support (input editable
 * + slider). Devuelve una funcion `applySupport(key, entry)` que hay que
 * llamar cuando se elige un Support, para fijar el maximo y el texto segun
 * ese personaje.
 */
function bindSupportBuffBar({ prefix, stateKey }) {
    const valueInput = document.querySelector(`[data-select='${prefix}-buff-value']`);
    const nameLabel = document.querySelector(`[data-select='${prefix}-buff-name']`);
    const slider = document.querySelector(`[data-select='${prefix}-buff-slider']`);
    const maxLabel = document.querySelector(`[data-select='${prefix}-buff-max']`);

    if (!valueInput || !nameLabel || !slider || !maxLabel) return null;

    let max = 0;
    let step = 1;

    function setValue(rawValue) {
        const value = clampToStep(parseFloat(rawValue), max, step);
        valueInput.value = value;
        slider.value = value;
        if (stateKey) state[stateKey] = value;
    }

    // Escribir el numero a mano en el cuadro editable.
    valueInput.addEventListener("input", () => setValue(valueInput.value));
    valueInput.addEventListener("blur", () => setValue(valueInput.value));

    // Mover la barra deslizante.
    slider.addEventListener("input", () => setValue(slider.value));

    /** Se llama al elegir un Support: fija el maximo, el texto y resetea el valor. */
    function applySupport(key, entry) {
        const { statFuente, maxBuffUmbral } = getScalingInfo(entry);
        max = maxBuffUmbral || 0;
        // Valores tipo ratio (CR, Pen%...) suelen ir de 0 a ~1; valores tipo
        // stat absoluto (Atke...) son numeros grandes. Se ajusta el paso
        // automaticamente para que la barra se sienta natural en ambos casos.
        step = max > 10 ? 1 : 0.01;

            nameLabel.textContent = `${key} ${getStatDisplayName(statFuente)}`.trim();
        maxLabel.textContent = max;

        slider.min = "0";
        slider.max = String(max);
        slider.step = String(step);
        slider.disabled = false;
        valueInput.disabled = false;

        setValue(0);
    }

    return applySupport;
}

/**
 * Binder para las celdas de STAT PRINCIPAL de un slot de disco (D4/D5/D6).
 * Al hacer click en la celda abre una lista con los stats disponibles para
 * ese slot (segun data/Stats/stats.js) y dibuja el chip removible elegido.
 */
function bindStatSlotSelector({ selector, slotKey, title, stateKey }) {
    const trigger = document.querySelector(selector);
    if (!trigger) return;

    const chipContainer = trigger.querySelector(".stat-chip-slot");
    trigger.classList.add("selectable");

    trigger.addEventListener("click", (e) => {
        // El boton "X" del chip maneja su propio click con stopPropagation,
        // pero se deja esta verificacion como resguardo adicional.
        if (e.target.closest(".stat-chip-remove")) return;

        const options = mainstats[slotKey] || {};
        const items = Object.keys(options).map((statName) => ({
            label: getStatDisplayName(statName),
            value: statName,
        }));

        openListMenu({
            items,
            title: title || `Stat principal (${slotKey})`,
            onSelect: (statName) => renderStatChip(chipContainer, statName, stateKey),
        });
    });
}

/**
 * Modal "+ NEW DISK" (pestana Mis Discos).
 * Por ahora solo controla apertura/cierre reutilizando el mismo fondo
 * oscurecido + blur (.selection-overlay) de los demas menus. El contenido
 * interno (slots, sets, rolls, Confirm) todavia no es interactivo.
 */
function bindNewDiskModal({ onOpen } = {}) {
    const trigger = document.querySelector(".new-button");
    const overlay = document.getElementById("newdisk-overlay");
    if (!trigger || !overlay) return;

    trigger.classList.add("selectable");

    function open() {
        if (onOpen) onOpen();
        overlay.classList.add("active");
    }
    function close() {
        overlay.classList.remove("active");
    }

    trigger.addEventListener("click", open);

    // Cerrar al hacer click en el fondo oscurecido (fuera del panel).
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });

    // El boton "Cancel" del propio panel tambien cierra el modal.
    const cancelBtn = overlay.querySelector(".cancel-button");
    if (cancelBtn) cancelBtn.addEventListener("click", close);

    // Cerrar con Escape.
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close();
    });

    return { close };
}

/* ----------------------------------------------------------------------- */
/*  DISCOS GUARDADOS: persistencia en localStorage + render de tarjetas    */
/* ----------------------------------------------------------------------- */

const DISKS_STORAGE_KEY = "lyned_disks";
const diskFilters = {
    slot: null,
    mainStat: null,
};

/** Formatea un valor numerico como porcentaje (ratios <=1) o numero plano. */
function formatStatValue(value) {
    if (value === null || value === undefined || Number.isNaN(value)) return "--";
    if (Math.abs(value) <= 1) {
        const pct = Math.round(value * 10000) / 100;
        return `${trimTrailingZeros(pct)} %`;
    }
    return `${trimTrailingZeros(value)}`;
}

/** Quita ceros decimales sobrantes (0.30 -> 0.3, 4.80 -> 4.8, 19.00 -> 19). */
function trimTrailingZeros(num) {
    return Number(num.toFixed(4)).toString();
}

function loadDisks() {
    try {
        const raw = localStorage.getItem(DISKS_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.warn("No se pudieron leer los discos guardados:", err);
        return [];
    }
}

function saveDisks(disks) {
    try {
        localStorage.setItem(DISKS_STORAGE_KEY, JSON.stringify(disks));
    } catch (err) {
        console.warn("No se pudieron guardar los discos:", err);
    }
}

function bindDiskFilters() {
    const slotButtons = document.querySelectorAll("[data-filter-slot]");
    const statButtons = document.querySelectorAll("[data-filter-stat]");

    function renderFilterState() {
        slotButtons.forEach((button) => {
            button.classList.toggle("slot-selected", button.dataset.filterSlot === diskFilters.slot);
        });
        statButtons.forEach((button) => {
            button.classList.toggle("slot-selected", button.dataset.filterStat === diskFilters.mainStat);
        });
    }

    slotButtons.forEach((button) => {
        button.classList.add("selectable");
        button.addEventListener("click", () => {
            diskFilters.slot = diskFilters.slot === button.dataset.filterSlot
                ? null
                : button.dataset.filterSlot;
            renderFilterState();
            renderAllDisks();
        });
    });

    statButtons.forEach((button) => {
        button.classList.add("selectable");
        button.addEventListener("click", () => {
            diskFilters.mainStat = diskFilters.mainStat === button.dataset.filterStat
                ? null
                : button.dataset.filterStat;
            renderFilterState();
            renderAllDisks();
        });
    });

    renderFilterState();
}

/** Construye el elemento DOM de una tarjeta de disco guardado. */
function createDiskCardElement(disk) {
    const card = document.createElement("section");
    card.className = "disk-card";
    card.dataset.diskId = disk.id;

    const header = document.createElement("div");
    header.className = "panel-header";
    header.textContent = disk.slot;
    card.appendChild(header);

    const deleteBtn = document.createElement("div");
    deleteBtn.className = "disk-delete-btn selectable";
    deleteBtn.textContent = "×";
    deleteBtn.title = "Delete disk";
    deleteBtn.addEventListener("click", () => deleteDisk(disk.id));
    card.appendChild(deleteBtn);

    const main = document.createElement("div");
    main.className = "di-main";

    const img = document.createElement("img");
    const setEntry = disk.set ? disk_dps[disk.set] : null;
    img.src = normalizeImage(setEntry ? setEntry.Image : "static/DISKS/Set_Base.webp");
    img.alt = disk.set || "";
    main.appendChild(img);

    const mainStatBox = document.createElement("div");
    mainStatBox.className = "di-main-stat";
    const mainLabel = document.createElement("div");
    mainLabel.textContent = "Main Stat:";
    const mainStrong = document.createElement("strong");
    mainStrong.textContent = getStatDisplayName(disk.mainStat);
    const mainValueSpan = document.createElement("span");
    mainValueSpan.textContent = formatStatValue(disk.mainStatValue);
    mainStrong.appendChild(mainValueSpan);
    mainStatBox.appendChild(mainLabel);
    mainStatBox.appendChild(mainStrong);
    main.appendChild(mainStatBox);

    card.appendChild(main);

    disk.subStats.forEach((sub) => {
        const row = document.createElement("div");
        row.className = "di-row";
        row.innerHTML =
            `<span></span><span>${getStatDisplayName(sub.stat)}</span>` +
            `<b>${sub.rolls > 0 ? "+" + sub.rolls : ""}</b>` +
            `<span></span><span class="di-align">${formatStatValue(sub.value)}</span><span></span>`;
        card.appendChild(row);
    });

    return card;
}

/** Vuelve a dibujar todas las tarjetas de la pestana "Mis Discos" desde localStorage. */
function renderAllDisks() {
    const grid = document.getElementById("inv-grid");
    const emptyState = document.getElementById("inv-empty-state");
    if (!grid) return;

    const disks = loadDisks();

    grid.querySelectorAll(".disk-card").forEach((card) => card.remove());

    const filteredDisks = disks.filter((disk) => {
        const matchesSlot = !diskFilters.slot || disk.slot === diskFilters.slot;
        const matchesMainStat = !diskFilters.mainStat || disk.mainStat === diskFilters.mainStat;
        return matchesSlot && matchesMainStat;
    });

    if (emptyState) {
        emptyState.style.display = filteredDisks.length ? "none" : "";
        emptyState.textContent = disks.length && (diskFilters.slot || diskFilters.mainStat)
            ? "No Results."
            : "No disks. Use \"+ NEW DISK\" to create one.";
    }

    filteredDisks.forEach((disk) => grid.appendChild(createDiskCardElement(disk)));
}

/** Elimina un disco por su id y vuelve a dibujar la lista. */
function deleteDisk(id) {
    const disks = loadDisks().filter((d) => d.id !== id);
    saveDisks(disks);
    renderAllDisks();
}
function getDiskEqualityKey(disk) {
    const subStats = (disk.subStats || [])
        .map((sub) => `${sub.stat}:${sub.rolls ?? 0}`)
        .sort();
    return JSON.stringify([
        disk.slot,
        disk.set,
        disk.mainStat,
        disk.mainStatValue,
        subStats,
    ]);
}
/** Combina discos, omitiendo los que ya existen con los mismos atributos. */
function mergeDisks(existentes, importados) {
    const porId = new Map(existentes.map((disk) => [disk.id, disk]));
    const clavesExistentes = new Set(existentes.map(getDiskEqualityKey));
    let duplicados = 0;

    importados.forEach((disk) => {
        if (clavesExistentes.has(getDiskEqualityKey(disk))) {
            duplicados++;
            return;
        }
        porId.set(disk.id, disk);
        clavesExistentes.add(getDiskEqualityKey(disk));
    });

    return { disks: Array.from(porId.values()), duplicados };
}

/* ----------------------------------------------------------------------- */
/*  IMPORT DESDE ENKA NETWORK: UID -> hasta 36 discos automaticos          */
/* ----------------------------------------------------------------------- */
function bindEnkaImport() {
    const uidInput = document.querySelector("[data-select='enka-uid']");
    const importBtn = document.querySelector("[data-select='enka-import-button']");
    const statusEl = document.querySelector("[data-select='enka-import-status']");
    if (!uidInput || !importBtn) return;

    importBtn.classList.add("selectable");

    function setStatus(message) {
        if (statusEl) statusEl.textContent = message || "";
    }

    importBtn.addEventListener("click", async () => {
        const uid = uidInput.value.trim();
        if (!uid) {
            setStatus("Insert your UID first");
            return;
        }

        setStatus("Loading Enka Network...");
        importBtn.classList.add("newdisk-locked");

        try {
            const json = await fetchEnkaShowcase(uid);
            const { disks, skipped, totalEncontrados } = parseEnkaShowcase(json);

            if (!totalEncontrados) {
                setStatus("No Disks on your Profile");
                return;
            }
            
            const resultadoMerge = mergeDisks(loadDisks(), disks);
            saveDisks(resultadoMerge.disks);
            renderAllDisks();

            const omitidos = skipped.setDesconocido + skipped.mainStatDesconocido + skipped.otros;
            let mensaje = `${disks.length - resultadoMerge.duplicados} of ${totalEncontrados} Disk Imported.`;
            if (resultadoMerge.duplicados > 0) {
                mensaje += ` ${resultadoMerge.duplicados} omitted duplicates.`;
            }
            if (omitidos > 0) {
                mensaje += ` ${omitidos} omitted`;
                if (skipped.setDesconocido > 0) mensaje += ` (unknown set: ${skipped.setDesconocido})`;
                mensaje += ".";
            }
            setStatus(mensaje);
        } catch (err) {
            console.error("Enka Network is not working:", err);
            setStatus(`ERROR: ${err.message}`);
        } finally {
            importBtn.classList.remove("newdisk-locked");
        }
    });
}

/* ----------------------------------------------------------------------- */
/*  FLUJO DE CREACION: modal "+ NEW DISK"                                  */
/*  Slot (D1-D6) -> Set -> Main Stat (depende del slot) -> hasta 4 Sub     */
/*  Stats con hasta 5 rolls (+1) repartidos entre ellos -> Confirm.        */
/* ----------------------------------------------------------------------- */
function bindNewDiskCreation({ onSave } = {}) {
    const overlay = document.getElementById("newdisk-overlay");
    if (!overlay) return null;

    const slotButtons = overlay.querySelectorAll("[data-select='newdisk-slot']");
    const setField = overlay.querySelector("[data-select='newdisk-set-field']");
    const setImage = overlay.querySelector("[data-select='newdisk-set-image']");
    const setWrapper = setField ? setField.closest(".left-set-slot") : null;
    const mainStatField = overlay.querySelector("[data-select='newdisk-main-stat']");
    const mainStatValueField = overlay.querySelector("[data-select='newdisk-main-stat-value']");
    const confirmBtn = overlay.querySelector("[data-select='newdisk-confirm']");

    const SUBSTAT_SLOTS = [1, 2, 3, 4];
    const MAX_TOTAL_ROLLS = 5;

    function createEmptyDraft() {
        return {
            slot: null,
            set: null,
            mainStat: null,
            mainStatValue: null,
            subStats: SUBSTAT_SLOTS.map(() => ({ stat: null, baseValue: null, rolls: 0 })),
        };
    }

    let draft = createEmptyDraft();

    function totalRolls() {
        return draft.subStats.reduce((sum, s) => sum + s.rolls, 0);
    }

    function renderSlot() {
        slotButtons.forEach((btn) => {
            btn.classList.toggle("slot-selected", btn.dataset.slotValue === draft.slot);
        });

        const unlocked = Boolean(draft.slot);
        if (setWrapper) setWrapper.classList.toggle("newdisk-locked", !unlocked);
        if (setImage) setImage.classList.toggle("newdisk-locked", !unlocked);
        if (mainStatField) mainStatField.classList.toggle("newdisk-locked", !unlocked);
    }

    function renderSet() {
        if (setField) setField.textContent = draft.set || "Disk Set";
        const img = setImage ? setImage.querySelector("img") : null;
        if (img) {
            const entry = draft.set ? disk_dps[draft.set] : null;
            img.src = normalizeImage(entry ? entry.Image : "static/DISKS/Set_Base.webp");
            img.alt = draft.set || "";
        }
    }

    function renderMainStat() {
        if (mainStatField) mainStatField.textContent = getStatDisplayName(draft.mainStat) || "Stat";
        if (mainStatValueField) {
            mainStatValueField.textContent = draft.mainStat ? formatStatValue(draft.mainStatValue) : "--";
        }
    }

    function renderSubstat(index) {
        const sub = draft.subStats[index - 1];
        const nameCell = overlay.querySelector(`[data-select='newdisk-substat-${index}']`);
        const valueCell = overlay.querySelector(`[data-select='newdisk-subvalue-${index}']`);
        if (!nameCell || !valueCell) return;

        const rollBadge = nameCell.querySelector(".roll-level");
        // Se reescribe solo el nodo de texto, para no perder el span.roll-level.
        nameCell.childNodes[0].textContent = getStatDisplayName(sub.stat) || "Sub Stat";
        if (rollBadge) rollBadge.textContent = sub.rolls > 0 ? `+${sub.rolls}` : "";

        valueCell.textContent = sub.stat ? formatStatValue(sub.baseValue * (sub.rolls + 1)) : "--";
    }

    function renderAll() {
        renderSlot();
        renderSet();
        renderMainStat();
        SUBSTAT_SLOTS.forEach((i) => renderSubstat(i));
    }

    /** Reinicia el formulario. Se llama cada vez que se abre el modal. */
    function reset() {
        draft = createEmptyDraft();
        renderAll();
    }

    /* ---- Slot D1-D6: botones tipo tab, click directo selecciona ---- */
    slotButtons.forEach((btn) => {
        btn.classList.add("selectable");
        btn.addEventListener("click", () => {
            draft.slot = btn.dataset.slotValue;
            // El Main Stat depende del slot: si el slot cambia, se invalida.
            draft.mainStat = null;
            draft.mainStatValue = null;
            renderAll();
        });
    });

    /* ---- Set: bloqueado hasta elegir slot ---- */
    function openSetMenu() {
        if (!draft.slot) return;
        openGridMenu({
            items: toGridItems(disk_dps),
            ratioClass: "ratio-disk",
            title: "Select a Set",
            onSelect: (key) => {
                draft.set = key;
                renderSet();
            },
        });
    }
    if (setField) {
        setField.classList.add("selectable");
        setField.addEventListener("click", openSetMenu);
    }
    if (setImage) {
        setImage.classList.add("selectable");
        setImage.addEventListener("click", openSetMenu);
    }

    /* ---- Main Stat: opciones dependen del slot elegido ---- */
    if (mainStatField) {
        mainStatField.classList.add("selectable");
        mainStatField.addEventListener("click", () => {
            if (!draft.slot) return;
            const options = mainstats[draft.slot] || {};
            const items = Object.keys(options).map((name) => ({
                label: getStatDisplayName(name),
                value: name,
            }));
            openListMenu({
                items,
                title: `Main Stat (${draft.slot})`,
                onSelect: (name) => {
                    draft.mainStat = name;
                    draft.mainStatValue = options[name];
                    renderMainStat();
                },
            });
        });
    }

    /* ---- Sub Stats (4 slots), + hasta 5 rolls repartidos entre ellos ---- */
    SUBSTAT_SLOTS.forEach((index) => {
        const nameCell = overlay.querySelector(`[data-select='newdisk-substat-${index}']`);
        const addBtn = overlay.querySelector(`[data-select='newdisk-substat-${index}-add']`);
        const minusBtn = overlay.querySelector(`[data-select='newdisk-substat-${index}-minus']`);

        if (nameCell) {
            nameCell.classList.add("selectable");
            nameCell.addEventListener("click", () => {
                const items = Object.keys(substats).map((name) => ({
                    label: getStatDisplayName(name),
                    value: name,
                }));
                openListMenu({
                    items,
                    title: "Elige un Sub Stat",
                    onSelect: (name) => {
                        draft.subStats[index - 1] = { stat: name, baseValue: substats[name], rolls: 0 };
                        renderSubstat(index);
                    },
                });
            });
        }

        if (addBtn) {
            addBtn.classList.add("selectable");
            addBtn.addEventListener("click", () => {
                const sub = draft.subStats[index - 1];
                if (!sub.stat) return; // primero hay que elegir un sub stat
                if (totalRolls() >= MAX_TOTAL_ROLLS) return; // tope global de 5 rolls
                sub.rolls += 1;
                renderSubstat(index);
            });
        }

        if (minusBtn) {
            minusBtn.classList.add("selectable");
            minusBtn.addEventListener("click", () => {
                const sub = draft.subStats[index - 1];
                if (!sub.stat) return;
                if (sub.rolls > 0) {
                    sub.rolls -= 1;
                } else {
                    // En el valor base, -1 quita la seleccion (igual que clickar la celda).
                    draft.subStats[index - 1] = { stat: null, baseValue: null, rolls: 0 };
                }
                renderSubstat(index);
            });
        }
    });

    /* ---- Confirmar: guarda el disco en localStorage ---- */
    if (confirmBtn) {
        confirmBtn.classList.add("selectable");
        confirmBtn.addEventListener("click", () => {
            if (!draft.slot || !draft.mainStat) return; // slot + main stat son obligatorios

            const disk = {
                id: `disk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                slot: draft.slot,
                set: draft.set,
                mainStat: draft.mainStat,
                mainStatValue: draft.mainStatValue,
                subStats: draft.subStats
                    .filter((s) => s.stat)
                    .map((s) => ({
                        stat: s.stat,
                        baseValue: s.baseValue,
                        rolls: s.rolls,
                        value: s.baseValue * (s.rolls + 1),
                    })),
            };

            const disks = loadDisks();
            disks.push(disk);
            saveDisks(disks);

            if (onSave) onSave();
        });
    }

    renderAll();

    return { reset };
}

/* ------------------------------------------------------------------- */
/*  Inicializacion: se ejecuta cuando el DOM esta listo                 */
/* ------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/*  SKILL DEL DPS (Damage Results -> "Skill:")                             */
/* ----------------------------------------------------------------------- */

/** Encuentra la skill a mostrar, priorizando Ultimate si el DPS la tiene. */
function getDpsSkill(entry) {
    if (!entry || !entry.skills) return null;
    const skillNames = Object.keys(entry.skills);
    const name = skillNames.find((n) => entry.skills[n].tipo === "Ultimate") || skillNames[0];
    if (!name) return null;
    return { name, data: entry.skills[name] };
}

/**
 * Repinta la celda "Skill:" de Damage Results con el nombre de la skill
 * del DPS elegido, y guarda en `state` el valor correspondiente al nivel de
 * dupe actual (C0-C6) para usarlo mas adelante en el calculo de dano.
 */
function updateSkillDisplay() {
    const skillNameEl = document.querySelector(".statd-skill");
    if (!skillNameEl) return;

    const entry = state.dpsCharacter ? dps[state.dpsCharacter] : null;
    const skill = entry ? getDpsSkill(entry) : null;

    if (!skill) {
        skillNameEl.textContent = "--";
        state.dpsSkillName = null;
        state.dpsSkillValue = null;
        return;
    }

    const level = state.dpsCharacterLevel ?? 0;
    const value = skill.data[level] ?? skill.data[0] ?? null;

    skillNameEl.textContent = skill.name;
    state.dpsSkillName = skill.name;
    state.dpsSkillValue = value;
}

/* ----------------------------------------------------------------------- */
/*  TOGGLE "Stun" (panel Enemy)                                            */
/*  ON/OFF libre, salvo que el DPS elegido tenga force_stun:true, en cuyo  */
/*  caso queda forzado en ON y bloqueado.                                  */
/* ----------------------------------------------------------------------- */
function bindStunToggle() {
    const track = document.querySelector(".stun-toggle");
    const knob = document.querySelector(".stun-toggle-1");
    if (!track || !knob) return null;

    track.classList.add("selectable");

    function render() {
        knob.textContent = state.enemyStunOn ? "ON" : "OFF";
        knob.classList.toggle("stun-state-on", state.enemyStunOn);
        knob.classList.toggle("stun-state-off", !state.enemyStunOn);
        knob.classList.toggle("stun-knob-locked", state.dpsForceStun);
        track.classList.toggle("stun-locked", state.dpsForceStun);
    }

    track.addEventListener("click", () => {
        if (state.dpsForceStun) return; // bloqueado por el DPS elegido
        state.enemyStunOn = !state.enemyStunOn;
        render();
    });

    render();

    return {
        /** Se llama cuando cambia el DPS elegido, segun su force_stun. */
        setForceStun(forced) {
            state.dpsForceStun = Boolean(forced);
            if (state.dpsForceStun) state.enemyStunOn = true;
            render();
        },
    };
}

/* ----------------------------------------------------------------------- */
/*  OPTIMIZADOR: boton OPTIMIZAR, Top Results (1-5) y render de las 6      */
/*  tarjetas de discos (di-1..di-6) con la combinacion elegida.            */
/* ----------------------------------------------------------------------- */

/** Mapea el slot ("D1".."D6") a la clase de su tarjeta preview en el di-grid. */
function diCardSelectorForSlot(slot) {
    const n = slot.replace("D", "");
    return `.di-${n}`;
}

/** Escribe un disco dentro de una tarjeta .di-N del preview del Optimizer. */
function renderDiskIntoCard(slot, disk) {
    const card = document.querySelector(diCardSelectorForSlot(slot));
    if (!card) return;

    const img = card.querySelector(".di-main img");
    if (img) {
        const setEntry = disk.set ? disk_dps[disk.set] : null;
        img.src = normalizeImage(setEntry ? setEntry.Image : "static/DISKS/Set_Base.webp");
        img.alt = disk.set || "";
    }

    const mainStrong = card.querySelector(".di-main-stat strong");
    if (mainStrong) {
        mainStrong.childNodes[0].textContent = getStatDisplayName(disk.mainStat) || "--";
        const span = mainStrong.querySelector("span");
        if (span) span.textContent = formatStatValue(disk.mainStatValue);
    }

    const rows = card.querySelectorAll(".di-row");
    rows.forEach((row, i) => {
        const sub = disk.subStats ? disk.subStats[i] : null;
        const nameSpan = row.children[1];
        const rollB = row.querySelector("b");
        const valueSpan = row.querySelector(".di-align");

        if (nameSpan) nameSpan.textContent = sub ? getStatDisplayName(sub.stat) : "";
        if (rollB) rollB.textContent = sub && sub.rolls > 0 ? `+${sub.rolls}` : "";
        if (valueSpan) valueSpan.textContent = sub ? formatStatValue(sub.value) : "";
    });
}

function bindOptimizer() {
    const optimizeBtn = document.querySelector("[data-select='optimize-button']");
    const statusEl = document.querySelector("[data-select='optimizer-status']");
    const dmgEl = document.querySelector("[data-select='optimizer-dmg']");
    const topCells = document.querySelectorAll("[data-select='top-result']");
    const infoBtn = document.querySelector("[data-select='results-info']");

    const menuStat1 = document.querySelector("[data-select='optimizer-stat1']");
    const menuStat2 = document.querySelector("[data-select='optimizer-stat2']");
    const menuStat3 = document.querySelector("[data-select='optimizer-stat3']");
    const menuStat4 = document.querySelector("[data-select='optimizer-stat4']");

    const nameStat1 = document.querySelector("[data-select='name-stat1']");
    const nameStat2 = document.querySelector("[data-select='name-stat2']");
    const nameStat3 = document.querySelector("[data-select='name-stat3']");
    const nameStat4 = document.querySelector("[data-select='name-stat4']");


    if (!optimizeBtn) return;

    optimizeBtn.classList.add("selectable");
    if (infoBtn) infoBtn.classList.add("selectable");

    /** Redondea un factor de la formula a un numero legible (no es %, es un multiplicador). */
    function formatFactorValue(value) {
        if (value === null || value === undefined || Number.isNaN(value)) return "--";
        return trimTrailingZeros(value);
    }

    function setStatus(message) {
        if (statusEl) statusEl.textContent = message || "";
    }

    function renderTopCellsAvailability() {
        topCells.forEach((cell) => {
            const idx = Number(cell.dataset.topIndex);
            const disponible = idx < state.topResults.length;
            cell.classList.toggle("top-result-disabled", !disponible);
            cell.classList.toggle("top-result-active", idx === state.topResultIndex);
        });
    }
    
    function formatOptimizedStatValue(value) {
        if (value === null || value === undefined || value === "") return "--";
        const numeric = Number(value);
        if (!Number.isFinite(numeric)) return String(value);
        return numeric.toLocaleString("es-PE", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
        });
    }

    function renderOptimizedStats(entry) {
        if (!entry) return;

        const useCombat = state.optimizedStatsMode === "combat";
        const values = [
            [useCombat ? (entry.stat_combat1 ?? entry.stat1) : entry.stat1, menuStat1, nameStat1, entry.stat1_name],
            [useCombat ? (entry.stat_combat2 ?? entry.stat2) : entry.stat2, menuStat2, nameStat2, entry.stat2_name],
            [useCombat ? (entry.stat_combat3 ?? entry.stat3) : entry.stat3, menuStat3, nameStat3, entry.stat3_name],
            [useCombat ? (entry.stat_combat4 ?? entry.stat4) : entry.stat4, menuStat4, nameStat4, entry.stat4_name],
        ];

        values.forEach(([value, valueEl, nameEl, name]) => {
            if (valueEl) {
                valueEl.textContent = formatOptimizedStatValue(value);
            }
            if (nameEl && name !== undefined && name !== null) {
                nameEl.textContent = String(name).toLocaleString("es-PE");
            }
        });
    }

    function renderStatModeToggle() {
        const toggle = document.querySelector(".combat-toggle");
        const knob = document.querySelector(".combat-toggle-1");
        if (!toggle || !knob) return;

        const isCombat = state.optimizedStatsMode === "combat";
        knob.textContent = isCombat ? "Combat" : "Menu";
        knob.classList.toggle("combat-toggle-knob-active", isCombat);
        toggle.classList.toggle("combat-toggle-active", isCombat);
    }

    function selectTopResult(index) {
        const entry = state.topResults[index];
        if (!entry) return;

        state.topResultIndex = index;
        renderTopCellsAvailability();

        if (dmgEl) {
            dmgEl.textContent = Math.round(entry.danoReal).toLocaleString("es-PE");
        }
        renderOptimizedStats(entry);

        entry.disks.forEach((disk) => renderDiskIntoCard(disk.slot, disk));
    }

    const statToggle = document.querySelector(".combat-toggle");
    const statToggleKnob = document.querySelector(".combat-toggle-1");
    if (statToggle && statToggleKnob) {
        statToggle.classList.add("selectable");
        statToggle.addEventListener("click", () => {
            state.optimizedStatsMode = state.optimizedStatsMode === "combat" ? "menu" : "combat";
            renderStatModeToggle();
            const entry = state.topResults[state.topResultIndex];
            if (entry) renderOptimizedStats(entry);
        });
        renderStatModeToggle();
    }
    
    topCells.forEach((cell) => {
        cell.addEventListener("click", () => {
            const idx = Number(cell.dataset.topIndex);
            if (idx < state.topResults.length) selectTopResult(idx);
        });
    });

    optimizeBtn.addEventListener("click", () => {
        const resultado = optimizarDiscos(state, loadDisks());

        if (!resultado.ok) {
            state.topResults = [];
            state.topResultIndex = -1;
            renderTopCellsAvailability();
            setStatus(resultado.message);
            if (dmgEl) dmgEl.textContent = "--";
            return;
        }

        state.topResults = resultado.top;
        setStatus("");
        selectTopResult(0);
    });

    
}

document.addEventListener("DOMContentLoaded", () => {

    let newDiskModalControls = null;

    const newDiskCreation = bindNewDiskCreation({
        onSave: () => {
            renderAllDisks();
            if (newDiskModalControls) newDiskModalControls.close();
        },
    });

    newDiskModalControls = bindNewDiskModal({
        onOpen: () => newDiskCreation && newDiskCreation.reset(),
    });

    // Pinta los discos ya guardados (si los hay) al cargar la pagina.
    renderAllDisks();
    bindDiskFilters();
    bindEnkaImport();

    const stunToggle = bindStunToggle();
    bindOptimizer();

    /* ---------- DPS: Personaje ---------- */
    bindGridSelector({
        selector: "[data-select='dps-character-field'], [data-select='dps-character-image']",
        dataObj: dps,
        ratioClass: "ratio-dps",
        title: "Select DPS",
        textEl: "[data-select='dps-character-field'] span:first-child",
        imgEl: "[data-select='dps-character-image'] img",
        stateKey: "dpsCharacter",
        onChange: (key, entry) => {
            if (state.dpsWeapon && we_dps[state.dpsWeapon]?.Clase !== entry.Clase) {
                state.dpsWeapon = null;
                document.querySelector("[data-select='dps-weapon-field'] span:first-child").textContent = "W-Engine";
                document.querySelector("[data-select='dps-weapon-image'] img").src = normalizeImage("static/WENGINE/We_Base.webp");
            }
            updateSkillDisplay();
            if (stunToggle) stunToggle.setForceStun(entry.force_stun);
        },
    });

    bindLevelSelector({
        selector: "[data-select='dps-character-level']",
        min: 0, max: 6, prefix: "C",
        title: "Cinema",
        stateKey: "dpsCharacterLevel",
        onChange: () => updateSkillDisplay(),
        compact: true,
    });

    /* ---------- DPS: W-Engine ---------- */
    bindGridSelector({
        selector: "[data-select='dps-weapon-field'], [data-select='dps-weapon-image']",
        dataObj: we_dps,
        ratioClass: "ratio-weapon",
        title: "Select a W-Engine",
        textEl: "[data-select='dps-weapon-field'] span:first-child",
        imgEl: "[data-select='dps-weapon-image'] img",
        stateKey: "dpsWeapon",
        filter: (key, entry) => state.dpsCharacter && entry.Clase === dps[state.dpsCharacter]?.Clase,
    });

    bindLevelSelector({
        selector: "[data-select='dps-weapon-level']",
        min: 1, max: 5, prefix: "W",
        title: "W-Engine",
        stateKey: "dpsWeaponLevel",
        compact: true,
    });

    /* ---------- DPS: Sets de discos (4P / 2P) ---------- */
    bindGridSelector({
        selector: "[data-select='dps-set-4p']",
        dataObj: disk_dps,
        ratioClass: "ratio-disk",
        title: "Select (4P) Set ",
        imgEl: "[data-select='dps-set-4p'] img",
        stateKey: "dpsSet4p",
    });

    bindGridSelector({
        selector: "[data-select='dps-set-2p']",
        dataObj: disk_dps,
        ratioClass: "ratio-disk",
        title: "Selec (2P) Set ",
        imgEl: "[data-select='dps-set-2p'] img",
        stateKey: "dpsSet2p",
    });

    /* ---------- DPS: Stat principal por slot (D4 / D5 / D6) ---------- */
    bindStatSlotSelector({
        selector: "[data-select='dps-main-stat-d4']",
        slotKey: "D4",
        title: "Main Stat (D4)",
        stateKey: "dpsMainStatD4",
    });

    bindStatSlotSelector({
        selector: "[data-select='dps-main-stat-d5']",
        slotKey: "D5",
        title: "Main Stat (D5)",
        stateKey: "dpsMainStatD5",
    });

    bindStatSlotSelector({
        selector: "[data-select='dps-main-stat-d6']",
        slotKey: "D6",
        title: "Main Stat (D6)",
        stateKey: "dpsMainStatD6",
    });

    /* ---------- Support 1 ---------- */
    const applySupport1Buff = bindSupportBuffBar({
        prefix: "support1",
        stateKey: "support1BuffValue",
    });

    bindGridSelector({
        selector: "[data-select='support1-character-field'], [data-select='support1-character-image']",
        dataObj: supp,
        ratioClass: "ratio-support",
        title: "Select a Support",
        textEl: "[data-select='support1-character-field'] span:first-child",
        imgEl: "[data-select='support1-character-image'] img",
        stateKey: "support1Character",
        onChange: (key, entry) => {
            if (state.support1Weapon && we_supp[state.support1Weapon]?.Clase !== entry.Clase) {
                state.support1Weapon = null;
                document.querySelector("[data-select='support1-weapon-field'] span:first-child").textContent = "W Engine";
                document.querySelector("[data-select='support1-weapon-image'] img").src = normalizeImage("static/WENGINE/We_Base.webp");
            }
            if (applySupport1Buff) applySupport1Buff(key, entry);
        },
    });

    bindLevelSelector({
        selector: "[data-select='support1-character-level']",
        min: 0, max: 6, prefix: "C",
        title: "Cinema",
        stateKey: "support1CharacterLevel",
        compact: true,
    });

    bindGridSelector({
        selector: "[data-select='support1-weapon-field'], [data-select='support1-weapon-image']",
        dataObj: we_supp,
        ratioClass: "ratio-weapon",
        title: "Select a W-Engine",
        textEl: "[data-select='support1-weapon-field'] span:first-child",
        imgEl: "[data-select='support1-weapon-image'] img",
        stateKey: "support1Weapon",
        filter: (key, entry) => state.support1Character && entry.Clase === supp[state.support1Character]?.Clase,
    });

    bindLevelSelector({
        selector: "[data-select='support1-weapon-level']",
        min: 1, max: 5, prefix: "W",
        title: "W-Engine",
        stateKey: "support1WeaponLevel",
        compact: true,
    });

    bindGridSelector({
        selector: "[data-select='support1-set']",
        dataObj: disk_supp,
        ratioClass: "ratio-disk",
        title: "Select a Set",
        imgEl: "[data-select='support1-set'] img",
        stateKey: "support1Set",
    });

    /* ---------- Support 2 ---------- */
    const applySupport2Buff = bindSupportBuffBar({
        prefix: "support2",
        stateKey: "support2BuffValue",
    });

    bindGridSelector({
        selector: "[data-select='support2-character-field'], [data-select='support2-character-image']",
        dataObj: supp,
        ratioClass: "ratio-support",
        title: "Select a Support",
        textEl: "[data-select='support2-character-field'] span:first-child",
        imgEl: "[data-select='support2-character-image'] img",
        stateKey: "support2Character",
        onChange: (key, entry) => {
            if (state.support2Weapon && we_supp[state.support2Weapon]?.Clase !== entry.Clase) {
                state.support2Weapon = null;
                document.querySelector("[data-select='support2-weapon-field'] span:first-child").textContent = "W Engine";
                document.querySelector("[data-select='support2-weapon-image'] img").src = normalizeImage("static/WENGINE/We_Base.webp");
            }
            if (applySupport2Buff) applySupport2Buff(key, entry);
        },
    });

    bindLevelSelector({
        selector: "[data-select='support2-character-level']",
        min: 0, max: 6, prefix: "C",
        title: "Cinema",
        stateKey: "support2CharacterLevel",
        compact: true,
    });

    bindGridSelector({
        selector: "[data-select='support2-weapon-field'], [data-select='support2-weapon-image']",
        dataObj: we_supp,
        ratioClass: "ratio-weapon",
        title: "Select a W-Engine",
        textEl: "[data-select='support2-weapon-field'] span:first-child",
        imgEl: "[data-select='support2-weapon-image'] img",
        stateKey: "support2Weapon",
        filter: (key, entry) => state.support2Character && entry.Clase === supp[state.support2Character]?.Clase,
    });

    bindLevelSelector({
        selector: "[data-select='support2-weapon-level']",
        min: 1, max: 5, prefix: "W",
        title: "W-Engine",
        stateKey: "support2WeaponLevel",
        compact: true,
    });

    bindGridSelector({
        selector: "[data-select='support2-set']",
        dataObj: disk_supp,
        ratioClass: "ratio-disk",
        title: "Select a Set",
        imgEl: "[data-select='support2-set'] img",
        stateKey: "support2Set",
    });

    /* ---------- Enemigo ---------- */
    bindGridSelector({
        selector: "[data-select='enemy-name'], [data-select='enemy-image']",
        dataObj: enemy,
        ratioClass: "ratio-enemy",
        title: "Select an Enemy",
        textEl: "[data-select='enemy-name']",
        imgEl: "[data-select='enemy-image'] img",
        stateKey: "enemy",
    });

      bindGridSelector({
        selector: "[data-select='da-name'], [data-select='da-image']",
        dataObj: da,
        ratioClass: "ratio-da",
        title: "Select a DA buff",
        textEl: "[data-select='da-name']",
        imgEl: "[data-select='da-image'] img",
        stateKey: "da",
    });

});
