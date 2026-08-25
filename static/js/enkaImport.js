// enkaImport.js
//
// Convierte el showcase publico de Enka Network (API de ZZZ) en discos con
// el mismo formato que usa el resto de la app (creados manualmente via
// "+ NEW DISK"), para poder guardarlos igual en localStorage.
//
// Logica (segun especificacion del usuario):
//   - Equipment.Id (5 digitos): los primeros 4 digitos son el ID del Set
//     (se cruzan contra disk_dps[x].ID), el ultimo digito es el slot (D1-D6).
//   - MainPropertyList[0].PropertyId -> nombre del stat via idStats.js.
//     El valor real se toma de mainstats[slot][nombre] (NO de PropertyValue).
//   - RandomPropertyList (hasta 4): cada PropertyId -> nombre del stat via
//     idStats.js. PropertyLevel es el multiplicador directo sobre el valor
//     base de sub.js (nivel 1 = base, nivel 3 = base x3, etc.).

import disk_dps from "../../data/Disks/disk_dps_data.js";
import stats_id from "../../data/Stats/idStats.js";
import mainstats from "../../data/Stats/stats.js";
import substats from "../../data/Stats/sub.js";

/**
 * idStats.js usa sufijo "%" para los stats tipo ratio (Atk%, Hp%, Def%,
 * Pen%, Tasa%, Impact%, ER%), pero stats.js/sub.js ya usan sufijo "x"
 * (Atkx, Hpx, Defx, Penx, Tasax, Impactx, ERx). Se normaliza aqui antes de
 * buscar el valor, para que ambos vocabularios coincidan.
 */
const NORMALIZAR_NOMBRE = {
    "Atk%": "Atkx",
    "Hp%": "Hpx",
    "Def%": "Defx",
    "Pen%": "Penx",
    "Tasa%": "Tasax",
    "Impact%": "Impactx",
    "ER%": "ERx",
};

function normalizarNombreStat(nombre) {
    return NORMALIZAR_NOMBRE[nombre] || nombre;
}

/** Busca en disk_dps el nombre del set cuyo ID coincide con el derivado del equipo. */
function resolverNombreSet(setId) {
    const entry = Object.entries(disk_dps).find(([, data]) => data.ID === setId);
    return entry ? entry[0] : null;
}

/**
 * Convierte un item de EquippedList (Enka) a nuestro formato de disco.
 * Devuelve { disk } si se pudo armar completo, o { error } con el motivo
 * si hay que omitirlo (set desconocido, main stat desconocido, etc.).
 */
function convertirEquipoADisco(equipped) {
    const equipment = equipped && equipped.Equipment;
    if (!equipment || !equipment.Id) return { error: "sin-equipo" };

    const slotDigit = equipment.Id % 10;
    const setId = Math.floor(equipment.Id / 10);
    if (slotDigit < 1 || slotDigit > 6) return { error: "slot-invalido" };
    const slot = `D${slotDigit}`;

    const setName = resolverNombreSet(setId);
    if (!setName) return { error: "set-desconocido" };

    const mainProp = equipment.MainPropertyList && equipment.MainPropertyList[0];
    if (!mainProp) return { error: "sin-main-stat" };

    const mainStatName = normalizarNombreStat(stats_id[mainProp.PropertyId]);
    const mainStatValue =
        mainStatName && mainstats[slot] ? mainstats[slot][mainStatName] : undefined;
    if (!mainStatName || mainStatValue === undefined) return { error: "main-stat-desconocido" };

    const subStats = [];
    (equipment.RandomPropertyList || []).forEach((prop) => {
        const statName = normalizarNombreStat(stats_id[prop.PropertyId]);
        const baseValue = statName ? substats[statName] : undefined;
        if (!statName || baseValue === undefined) return; // substat no reconocido: se omite solo ese roll

        const nivel = prop.PropertyLevel || 1; // nivel 1 = base (sin +), nivel 3 = base x3, etc.
        subStats.push({
            stat: statName,
            baseValue,
            rolls: nivel - 1,
            value: Math.round(baseValue * nivel * 1e6) / 1e6,
        });
    });

    return {
        disk: {
            id: `disk_enka_${equipment.Uid}`,
            slot,
            set: setName,
            mainStat: mainStatName,
            mainStatValue,
            subStats,
        },
    };
}

/**
 * Recorre el JSON completo del showcase de Enka y devuelve los discos
 * convertidos, junto con contadores de lo que no se pudo importar.
 *
 * @returns {{ disks: Array, skipped: { setDesconocido: number, mainStatDesconocido: number, otros: number }, totalEncontrados: number }}
 */
export function parseEnkaShowcase(json) {
    const avatars = (json && json.PlayerInfo && json.PlayerInfo.ShowcaseDetail && json.PlayerInfo.ShowcaseDetail.AvatarList) || [];
    const disks = [];
    const skipped = { setDesconocido: 0, mainStatDesconocido: 0, otros: 0 };
    let totalEncontrados = 0;

    avatars.forEach((avatar) => {
        (avatar.EquippedList || []).forEach((equipped) => {
            totalEncontrados++;
            const resultado = convertirEquipoADisco(equipped);

            if (resultado.disk) {
                disks.push(resultado.disk);
                return;
            }
            if (resultado.error === "set-desconocido") {
                skipped.setDesconocido++;
            } else if (resultado.error === "main-stat-desconocido" || resultado.error === "sin-main-stat") {
                skipped.mainStatDesconocido++;
            } else {
                skipped.otros++;
            }
        });
    });

    return { disks, skipped, totalEncontrados };
}

/**
 * Descarga el showcase publico a traves del proxy local de Node. Enka no
 * expone CORS para llamadas directas desde el navegador.
 */
export async function fetchEnkaShowcase(uid) {
    const url = `http://localhost:3001/api/zzz/uid/${encodeURIComponent(uid)}`;
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
        let details = "";
        try {
            const error = await response.json();
            details = error.error || "";
        } catch {
            details = "";
        }
        throw new Error(details || `El proxy respondio con el codigo ${response.status}`);
    }

    return response.json();
}
