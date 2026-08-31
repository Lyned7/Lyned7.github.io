// optimizer.js
//
// Toma el `state` de la app (elecciones de DPS, Supports, Enemy, filtros de
// Set 4P/2P y Main Stat D4-D6) mas la lista de discos guardados por el user,
// y encuentra las 5 mejores combinaciones de 6 discos (D1-D6) segun el dano
// promedio calculado por damage.js.

import { calcularDanoFinal } from "./damage.js";

const SLOTS = ["D1", "D2", "D3", "D4", "D5", "D6"];
const TOP_N = 5;

/** Traduce el `state` de la app + un combo de 6 discos al objeto que espera calcularDanoFinal/calcularStatsTotales. */
function buildSeleccion(state, comboDisks) {
    return {
        dps: state.dpsCharacter,
        dpsDupe: state.dpsCharacterLevel,
        dpsWE: state.dpsWeapon,
        dpsWEDupe: state.dpsWeaponLevel,
        dpsSet2: state.dpsSet2p,
        dpsSet4: state.dpsSet4p,

        supp: state.support1Character,
        suppDupe: state.support1CharacterLevel,
        suppStatFuente: state.support1BuffValue,
        suppWE: state.support1Weapon,
        suppWEDupe: state.support1WeaponLevel,
        suppSet: state.support1Set,

        supp2: state.support2Character,
        suppDupe2: state.support2CharacterLevel,
        suppStatFuente2: state.support2BuffValue,
        suppWE2: state.support2Weapon,
        suppWEDupe2: state.support2WeaponLevel,
        suppSet2: state.support2Set,

        enemy_selected: state.enemy,
        da_selected: state.da,
        enemigoAturdido: state.enemyStunOn,
        skill_nombre: state.dpsSkillName,

        discosEquipados: comboDisks,
    };
}

/** Agrupa los discos guardados por slot (D1..D6). */
function agruparPorSlot(savedDisks) {
    const bySlot = { D1: [], D2: [], D3: [], D4: [], D5: [], D6: [] };
    savedDisks.forEach((disk) => {
        if (bySlot[disk.slot]) bySlot[disk.slot].push(disk);
    });
    return bySlot;
}

/**
 * Busca las TOP_N mejores combinaciones de discos (una por slot D1-D6) segun
 * el dano promedio, respetando:
 *   - Exactamente 4 discos del Set "4P" elegido y 2 del Set "2P" elegido
 *     (sin importar en que slot caiga cada uno).
 *   - En D4/D5/D6, el disco debe tener el Main Stat filtrado para ese slot.
 *
 * @returns {{ ok: true, top: Array }} | {{ ok: false, reason: string, message: string }}
 */
export function optimizarDiscos(state, savedDisks) {
    if (!state.dpsCharacter) {
        return { ok: false, reason: "falta-dps", message: "Choose a DPS first" };
    }
    if (!state.dpsSet4p || !state.dpsSet2p) {
        return { ok: false, reason: "faltan-sets", message: "Select a 4P/2P Set first" };
    }
    if (!state.dpsMainStatD4 || !state.dpsMainStatD5 || !state.dpsMainStatD6) {
        return { ok: false, reason: "faltan-mainstats", message: "Select D4,D5,D6 Main Stat first" };
    }

    const bySlot = agruparPorSlot(savedDisks || []);
    const set4p = state.dpsSet4p;
    const set2p = state.dpsSet2p;

    const esSetValido = (disco) => disco.set === set4p || disco.set === set2p;

    const candidatos = {
        D1: bySlot.D1.filter(esSetValido),
        D2: bySlot.D2.filter(esSetValido),
        D3: bySlot.D3.filter(esSetValido),
        D4: bySlot.D4.filter((d) => esSetValido(d) && d.mainStat === state.dpsMainStatD4),
        D5: bySlot.D5.filter((d) => esSetValido(d) && d.mainStat === state.dpsMainStatD5),
        D6: bySlot.D6.filter((d) => esSetValido(d) && d.mainStat === state.dpsMainStatD6),
    };

    const slotSinCandidatos = SLOTS.find((slot) => candidatos[slot].length === 0);
    if (slotSinCandidatos) {
        return {
            ok: false,
            reason: "sin-candidatos",
            message: `No disk match the slot ${slotSinCandidatos}.`,
        };
    }

    const resultados = [];

    for (const d1 of candidatos.D1) {
        for (const d2 of candidatos.D2) {
            for (const d3 of candidatos.D3) {
                for (const d4 of candidatos.D4) {
                    for (const d5 of candidatos.D5) {
                        for (const d6 of candidatos.D6) {
                            const combo = [d1, d2, d3, d4, d5, d6];

                            let count4p = 0;
                            let count2p = 0;
                            for (const d of combo) {
                                if (d.set === set4p) count4p++;
                                else if (d.set === set2p) count2p++;
                            }
                            if (count4p !== 4 || count2p !== 2) continue;

                            const seleccion = buildSeleccion(state, combo);
                            const resultado = calcularDanoFinal(seleccion);
                            if (!resultado || !Number.isFinite(resultado.danoPromedio)) continue;

                            resultados.push({
                                disks: combo,
                                danoPromedio: resultado.danoPromedio,
                                danoReal: resultado.danoReal,
                                detalle: resultado,
                                stat1: resultado.stat1,
                                stat2: resultado.stat2,
                                stat3: resultado.stat3,
                                stat4: resultado.stat4,

                                stat_combat1: resultado.stat_combat1,
                                stat_combat2: resultado.stat_combat2,
                                stat_combat3: resultado.stat_combat3,
                                stat_combat4: resultado.stat_combat4,

                                stat1_name: resultado.stat1_name,
                                stat2_name: resultado.stat2_name,
                                stat3_name: resultado.stat3_name,
                                stat4_name: resultado.stat4_name,
                            });
                        }
                    }
                }
            }
        }
    }

    if (!resultados.length) {
        return {
            ok: false,
            reason: "sin-combinaciones",
            message: "No build match the 4P/2P Set.",
        };
    }

    resultados.sort((a, b) => b.danoPromedio - a.danoPromedio);

    return { ok: true, top: resultados.slice(0, TOP_N) };
}
