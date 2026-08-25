// buffs.js

import dps from "../../data/Characters/dps_data.js";
import we_dps from "../../data/Wengine/we_dps_data.js";
import supp from "../../data/Characters/supp_data.js";
import we_supp from "../../data/Wengine/we_supp_data.js";
import disk_dps from "../../data/Disks/disk_dps_data.js";
import disk_supp from "../../data/Disks/disk_supp_data.js";
import enemy from "../../data/Enemy/enemy_data.js";

// Función universal para sumar stats de un origen al total
function sumarStats(statsAcumuladas, origenDeStats) {
    if (!origenDeStats) return;

    for (let stat in origenDeStats) {
        if (statsAcumuladas[stat] === undefined) {
            statsAcumuladas[stat] = 0;
        }
        statsAcumuladas[stat] += origenDeStats[stat];
    }
}

/**
 * Aplica un `stat_escalado` (Support o DPS) sobre statsTotales, usando
 * `statFuenteActual` como el valor actual del stat que dispara el escalado.
 * Logica: statValido = max(0, statFuenteActual - umbral), recortado por
 * max_buff_umbral si existe; pasos = floor(statValido / paso); el buff
 * ganado = pasos * razon, recortado por maxbuff si existe; se suma al stat
 * objetivo. Se reutiliza tanto para Supports (buffs.js) como para el DPS
 * (damage.js, tras resolverStatsCondicionales).
 */
export function aplicarEscalado(statsTotales, escalado, statFuenteActual) {
    if (!escalado || statFuenteActual === undefined || statFuenteActual === null) return;

    let statValido = Math.max(0, statFuenteActual - escalado.umbral);

    if (escalado.max_buff_umbral !== undefined && escalado.max_buff_umbral !== null) {
        let statMaximo = escalado.max_buff_umbral - escalado.umbral;
        statValido = Math.min(statValido, statMaximo);
    }

    const listaDeBuffs = Array.isArray(escalado.stat_buff) ? escalado.stat_buff : [escalado.stat_buff];

    for (const buffDef of listaDeBuffs) {
        if (!buffDef || !buffDef.stat) continue;

        let pasos = Math.floor(statValido / buffDef.paso);
        let buffTotal = pasos * buffDef.razon;

        // Validación corregida para tolerar maxbuff: null
        if (buffDef.maxbuff !== undefined && buffDef.maxbuff !== null) {
            buffTotal = Math.min(buffTotal, buffDef.maxbuff);
        }

        if (statsTotales[buffDef.stat] === undefined) {
            statsTotales[buffDef.stat] = 0;
        }
        statsTotales[buffDef.stat] += buffTotal;
    }
}

/**
 * Evalua el `stat_fuente` de un stat_escalado, que ahora puede ser:
 *   - Un nombre simple de stat, ej: "MA"                  -> stats.MA
 *   - Una formula con varios stats, ej: "MA * CR * CD"     -> se evalua
 *     usando los stats acumulados (statsConsolidados) como variables.
 *     Cualquier stat que no exista en el pool se trata como 0 (no rompe
 *     la formula), igual que hace `getStat` en el resto de damage.js.
 *
 * @param {Object} stats     statsConsolidados (statsTotales ya pasado por
 *                           resolverStatsCondicionales).
 * @param {string} expresion nombre de stat o formula matematica en texto.
 * @returns {number|undefined} el valor evaluado, o undefined si fallo.
 */
export function evaluarStatFuente(stats, expresion) {
    if (expresion === undefined || expresion === null) return undefined;
    if (typeof expresion !== "string" || !expresion.trim()) return undefined;

    // Cualquier stat ausente en el pool se trata como 0 dentro de la formula.
    const statsConDefault = new Proxy(stats || {}, {
        get(target, prop) {
            if (typeof prop === "symbol") return undefined;
            return prop in target ? target[prop] : 0;
        },
    });

    try {
        // "with" necesita codigo no-estricto; se evalua en una funcion aparte
        // (el codigo creado via `new Function` no hereda el "use strict" del
        // modulo), para poder usar los nombres de stat como variables sueltas.
        const evaluador = new Function("stats", "with (stats) { return (" + expresion + "); }");
        const resultado = evaluador(statsConDefault);
        return Number.isFinite(resultado) ? resultado : undefined;
    } catch (err) {
        console.error(`No se pudo evaluar el stat_fuente "${expresion}":`, err);
        return undefined;
    }
}

// Función principal que recibe tu selección y devuelve el total
export function calcularStatsTotales(seleccion) {
    const statsTotales = {};

    // 1. Extraer el DPS: Stats Base, Dupes acumulados y el Mv (u otro stat)
    //    de la skill segun el nivel de dupe actual.
    const dps_buffs = dps[seleccion.dps];
    if (dps_buffs) {
        sumarStats(statsTotales, dps_buffs.Stats_base);

        for (let i = 0; i <= seleccion.dpsDupe; i++) {
            if (dps_buffs.dupes && dps_buffs.dupes[i]) sumarStats(statsTotales, dps_buffs.dupes[i]);
        }

        for (const skill of Object.values(dps_buffs.skills || {})) {
            if (skill[seleccion.dpsDupe]) {
                sumarStats(statsTotales, skill[seleccion.dpsDupe]);
            }
        }
    }

    // 2. Extraer W-Engine del DPS (Base, Main y Buffs acumulados)
    const dpsWE = we_dps[seleccion.dpsWE];
    if (dpsWE) {
        sumarStats(statsTotales, dpsWE.Stats_base);
        sumarStats(statsTotales, dpsWE.Stats_main);
        for (let i = 0; i <= seleccion.dpsWEDupe; i++) {
            if (dpsWE.buffs && dpsWE.buffs[i]) sumarStats(statsTotales, dpsWE.buffs[i]);
        }
    }

    // 3. Discos del DPS: bonus de set 2P y 4P
    const dpsSet2 = disk_dps[seleccion.dpsSet2];
    if (dpsSet2 && dpsSet2.buffs_2pc) sumarStats(statsTotales, dpsSet2.buffs_2pc);

    const dpsSet4_buff2p = disk_dps[seleccion.dpsSet4];
    if (dpsSet4_buff2p && dpsSet4_buff2p.buffs_2pc) sumarStats(statsTotales, dpsSet4_buff2p.buffs_2pc);

    const dpsSet4 = disk_dps[seleccion.dpsSet4];
    if (dpsSet4 && dpsSet4.buffs_4pc) sumarStats(statsTotales, dpsSet4.buffs_4pc);

    // 3.5 Discos equipados: Main Stat y Sub Stats de cada uno de los 6 discos
    //     (seleccion.discosEquipados = array de 6 discos creados por el user,
    //     uno por slot D1-D6, con la forma { mainStat, mainStatValue, subStats }).
    if (Array.isArray(seleccion.discosEquipados)) {
        for (const disco of seleccion.discosEquipados) {
            if (!disco) continue;

            if (disco.mainStat) {
                sumarStats(statsTotales, { [disco.mainStat]: disco.mainStatValue });
            }

            if (Array.isArray(disco.subStats)) {
                for (const sub of disco.subStats) {
                    if (!sub || !sub.stat) continue;
                    sumarStats(statsTotales, { [sub.stat]: sub.value });
                }
            }
        }
    }

    // 3.6 Enemy Buff y Defense
    const enemy_buffs = enemy[seleccion.enemy_selected];
    if (enemy_buffs) {
        sumarStats(statsTotales, enemy_buffs.buffs_enemy);
        sumarStats(statsTotales, enemy_buffs.def_enemy);
    }

    // ==========================================
    // FUNCIÓN INTERNA PARA PROCESAR CUALQUIER SUPPORT
    // ==========================================
    function procesarSupport(nombreSupp, nivelDupe, statFuente, nombreWE, nivelWEDupe, nombreSet) {
        // A. Support Base y Buffs Fijos
        const supp_buffs = supp[nombreSupp];
        if (supp_buffs) {
            for (let i = 0; i <= nivelDupe; i++) {
                if (supp_buffs.buffs && supp_buffs.buffs[i]) sumarStats(statsTotales, supp_buffs.buffs[i]);
            }

            // B. Lógica para Buffs Escalados
            aplicarEscalado(statsTotales, supp_buffs.stat_escalado, statFuente);
        }

        // C. W-Engine del Support
        const suppWE = we_supp[nombreWE];
        if (suppWE) {
            for (let i = 0; i <= nivelWEDupe; i++) {
                if (suppWE.buffs && suppWE.buffs[i]) sumarStats(statsTotales, suppWE.buffs[i]);
            }
        }

        // D. Set de Discos del Support
        const suppSet = disk_supp[nombreSet];
        if (suppSet && suppSet.buffs) sumarStats(statsTotales, suppSet.buffs);
    }

    // ==========================================
    // EJECUTAR LA FUNCIÓN PARA AMBOS SUPPORTS
    // ==========================================

    // Procesar Support 1
    procesarSupport(
        seleccion.supp, seleccion.suppDupe, seleccion.suppStatFuente,
        seleccion.suppWE, seleccion.suppWEDupe, seleccion.suppSet
    );

    // Procesar Support 2
    procesarSupport(
        seleccion.supp2, seleccion.suppDupe2, seleccion.suppStatFuente2,
        seleccion.suppWE2, seleccion.suppWEDupe2, seleccion.suppSet2
    );

    // NOTA: el stat_escalado PROPIO del DPS (a diferencia del de los
    // Supports) ya NO se aplica aqui. Se mueve a damage.js, DESPUES de
    // resolverStatsCondicionales, para que su stat_fuente pueda ver los
    // stats ya consolidados por elemento/clase/tipo de skill (ej. que
    // "Dmg" ya incluya lo sumado desde "Dmg_Ice"), y para poder admitir
    // formulas (ej. "MA * CR * CD") ademas de un simple nombre de stat.

    return statsTotales;
}

// Función universal para sumar stats de un origen al total (version "Initial")
function sumarInitialStats(statsInitialAcumuladas, origenDeInitialStats) {
    if (!origenDeInitialStats) return;

    for (let stat in origenDeInitialStats) {
        if (statsInitialAcumuladas[stat] === undefined) {
            statsInitialAcumuladas[stat] = 0;
        }
        statsInitialAcumuladas[stat] += origenDeInitialStats[stat];
    }
}

/**
 * Stats "Initial": solo Stats Base + Dupe 0 del DPS, W-Engine base/main y
 * bonus 2pc de los sets, SIN dupes superiores, supports ni enemigo. Se usa
 * como fuente para el stat_escalado propio del DPS (ej. "CD_Initial"). Esta
 * pieza aun no esta conectada al calculo final (queda para una iteracion
 * futura), se deja exportada por si se necesita.
 */
export function calcularStatsInitialTotales(seleccion) {
    const statsInitialTotales = {};

    const dps_Initial_buffs = dps[seleccion.dps];
    if (dps_Initial_buffs) {
        sumarInitialStats(statsInitialTotales, dps_Initial_buffs.Stats_base);
        sumarInitialStats(statsInitialTotales, dps_Initial_buffs.dupes && dps_Initial_buffs.dupes[0]);
    }

    const dps_Initial_WE = we_dps[seleccion.dpsWE];
    if (dps_Initial_WE) {
        sumarInitialStats(statsInitialTotales, dps_Initial_WE.Stats_base);
        sumarInitialStats(statsInitialTotales, dps_Initial_WE.Stats_main);
    }

    const dpsInitialSet2 = disk_dps[seleccion.dpsSet2];
    if (dpsInitialSet2 && dpsInitialSet2.buffs_2pc) sumarInitialStats(statsInitialTotales, dpsInitialSet2.buffs_2pc);

    const dpsInitialSet4_buff2p = disk_dps[seleccion.dpsSet4];
    if (dpsInitialSet4_buff2p && dpsInitialSet4_buff2p.buffs_2pc) sumarInitialStats(statsInitialTotales, dpsInitialSet4_buff2p.buffs_2pc);

    return statsInitialTotales;
}
