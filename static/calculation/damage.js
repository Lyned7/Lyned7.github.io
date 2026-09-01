//damage.js

import dpsData from "../../data/Characters/dps_data.js";
import { calcularStatsTotales, aplicarEscalado, evaluarStatFuente } from "./buffs.js";

// Listas de tags válidos para validación dinámica de sufijos
const ELEMENTOS = new Set(["Electric", "Fire", "Ice", "Ether", "Physical", "Wind"]);
const CLASES = new Set(["Atacante", "Armorer", "Anomalo", "Ruptura"]);
const SKILL_TYPES = new Set(["Chain", "Ultimate", "Basic", "Ex", "Aftershock", "Dash"]);

// Helper para obtener un stat de forma segura sin romper la fórmula si es undefined
function getStat(stats, key, defaultValue = 0) {
    return stats && stats[key] !== undefined ? stats[key] : defaultValue;
}

function resolverStatsCondicionales(statsTotales, dpsContext) {
    const statsConsolidadas = { ...statsTotales };

    for (const [key, value] of Object.entries(statsTotales)) {
        if (!key.includes("_") || value === 0) continue;

        const tokens = key.split("_");
        const baseStat = tokens[0];
        const condiciones = tokens.slice(1);

        // Si el primer token no es un sufijo válido, omitimos procesamiento especial
        if (!condiciones.length) continue;

        // Validar si TODAS las condiciones de la clave se cumplen para el DPS/Skill actual
        const cumpleTodasLasCondiciones = condiciones.every(cond => {
            if (ELEMENTOS.has(cond)) return cond === dpsContext.elemento;
            if (CLASES.has(cond)) return cond === dpsContext.clase;
            if (SKILL_TYPES.has(cond)) return cond === dpsContext.tipoSkill;
            return false; // Si no pertenece a ninguna categoría conocida, la rechazamos
        });

        if (cumpleTodasLasCondiciones) {
            // Acumular el valor al stat base consolidado
            statsConsolidadas[baseStat] = (statsConsolidadas[baseStat] || 0) + value;
        }
    }

    return statsConsolidadas;
}

// Cálculo específico para el tipo "Sharp"
function calcularDanoSharp(stats, aturdido) {
    const Mv = getStat(stats, "Mv", 0);
    const Def = getStat(stats, "Def", 0);
    const Defx = getStat(stats, "Defx", 0);
    const Defp = getStat(stats, "Defp", 0);
    const Deff = getStat(stats, "Deff", 0);
    const Defe = getStat(stats, "Defe", 0);

    const Lac = getStat(stats, "Lac", 0);
    const CR = getStat(stats, "CR", 0);

    const Dmg = getStat(stats, "Dmg", 0);
    const Res = getStat(stats, "Res", 0);
    const Stun = getStat(stats, "Stun", 0);
    const Vuln = getStat(stats, "Vuln", 0);
    const Taken = getStat(stats, "Taken", 0);

    
    const Sdmg = getStat(stats, "Sdmg", 0);
    const Cont = getStat(stats, "Cont", 0);

    const Penx = getStat(stats, "Penx", 0);
    const Shred = Math.max(0, Math.min(getStat(stats, "Shred", 0), 1));
    const Penp = getStat(stats, "Penp", 0);

    const Defense = getStat(stats, "Defense", 0);

    // Factores de la fórmula Sharp
    const Mv_factor = Mv;
    const Def_factor = (Math.floor((Def * (1 + Defx)) + Defp) * (1+Deff)) + Defe;
    const Lac_factor = (1 + Lac) * (1+(Math.min((CR-1), 1) * (Lac)));
    const Lac_real = (1 + Lac) * (1+Lac);
    const Dmg_factor = 1 + Dmg;
    const Res_factor = 1 + Res;
    const Target_def = Defense * (1-Shred);
    const Efective_def = Target_def * (1-Penx) - Penp;
    const Defense_factor = Math.max(0,Math.min((794) / (794 + Efective_def), 1));
    // El bonus de Stun solo se aplica si el enemigo esta realmente aturdido
    // (toggle "Stun" del panel Enemy). Sin aturdir, no hay bonus.
    const Stun_factor = aturdido ? (1.5 + Stun + Vuln) : 1;
    const Sdmg_factor = 1 + Sdmg;
    const Cont_factor = 1 + Cont;
    const Taken_factor = 1 + Taken;


    const danoPromedio = Mv_factor * Def_factor * Lac_factor * Dmg_factor * Res_factor * Stun_factor * Defense_factor * Sdmg_factor * Cont_factor * Taken_factor;
    const danoReal = Mv_factor * Def_factor * Lac_real * Dmg_factor * Res_factor * Stun_factor * Defense_factor * Sdmg_factor * Cont_factor * Taken_factor;

    const stat1 = Math.floor((Def * (1 + Defx)) + Defp);
    const stat2 = getStat(stats, "Penp", 0);
    const stat3 = (getStat(stats, "CR_Base", 0))*100;
    const stat4 = (getStat(stats, "CD_Base", 0))*100;

    const stat_combat1 = Math.floor(Math.floor((Def * (1 + Defx)) + Defp) * (1+Deff)) + Defe;
    const stat_combat2 = getStat(stats, "Penp", 0);
    const stat_combat3 = ((getStat(stats, "CR_Base", 0))+(getStat(stats, "CR", 0)))*100;
    const stat_combat4 = (getStat(stats, "CD_Base", 0))*100;

    const stat1_name = "DEF";
    const stat2_name = "PEN";
    const stat3_name = "CR";
    const stat4_name = "CD";

    return {
        danoReal,
        danoPromedio,

        stat1,
        stat2,
        stat3,
        stat4,
        stat_combat1,
        stat_combat2,
        stat_combat3,
        stat_combat4,
        stat1_name,
        stat2_name,
        stat3_name,
        stat4_name,
        
        factores: {
            Mv_factor,
            Def_factor,
            Lac_factor,
            Dmg_factor,
            Res_factor,
            Stun_factor,
            Sdmg_factor,
            Cont_factor
        }
    };
}

function calcularDanoNormal(stats, aturdido) {
    const Mv = getStat(stats, "Mv", 0);
    const Atk = getStat(stats, "Atk", 0);
    const Atkx = getStat(stats, "Atkx", 0);
    const Atkp = getStat(stats, "Atkp", 0);
    const Atkf = getStat(stats, "Atkf", 0);
    const Atke = getStat(stats, "Atke", 0);
    const Atke_Idol = Math.max(0, Math.min(getStat(stats, "Atke_Idol", 0), 50));

    const CR = getStat(stats, "CR", 0);
    const CR_Base = getStat(stats, "CR_Base", 0);

    const CD = getStat(stats, "CD", 0);
    const CD_Base = getStat(stats, "CD_Base", 0);
    const CDf = getStat(stats, "CDf", 0);
    const CD_Freeze = Math.max(0, Math.min(getStat(stats, "CD_Freeze", 0), 0.10));

    const Dmg = getStat(stats, "Dmg", 0);
    const Res = getStat(stats, "Res", 0);
    const Stun = getStat(stats, "Stun", 0);
    const Vuln = getStat(stats, "Vuln", 0);
    const Taken = getStat(stats, "Taken", 0);
    
    const Cont = getStat(stats, "Cont", 0);

    const Penx = getStat(stats, "Penx", 0);
    const Shred = Math.max(0, Math.min(getStat(stats, "Shred", 0), 1));
    const Penp = getStat(stats, "Penp", 0);

    const Defense = getStat(stats, "Defense", 0);

    // Factores de la fórmula Normal
    const Mv_factor = Mv;
    const Atk_factor = (Math.floor((Atk * (1 + Atkx)) + Atkp) * (1+Atkf)) + Atke + Atke_Idol;
    const Crit_factor = (1+((Math.min((CR+CR_Base), 1)) * ((CD + CD_Base)*(1+CDf)+ CD_Freeze)));
    const Crit_real = (1+((CD + CD_Base)*(1+CDf)+ CD_Freeze));
    const Dmg_factor = 1 + Dmg;
    const Res_factor = 1 + Res;
    const Target_def = Defense * (1-Shred);
    const Efective_def = Target_def * (1-Penx) - Penp;
    const Defense_factor = Math.max(0,Math.min((794) / (794 + Efective_def), 1));
    const Stun_factor = aturdido ? (1.5 + Stun + Vuln) : 1;
    const Cont_factor = 1 + Cont;
    const Taken_factor = 1 + Taken;


    const danoPromedio = Mv_factor * Atk_factor * Crit_factor * Dmg_factor * Res_factor * Stun_factor * Defense_factor * Cont_factor * Taken_factor;
    const danoReal = Mv_factor * Atk_factor * Crit_real * Dmg_factor * Res_factor * Stun_factor * Defense_factor * Cont_factor * Taken_factor;

    const stat1 = Math.floor((Atk * (1 + Atkx)) + Atkp);
    const stat2 = getStat(stats, "Penp", 0);
    const stat3 = (getStat(stats, "CR_Base", 0))*100;
    const stat4 = (getStat(stats, "CD_Base", 0))*100;

    const stat_combat1 = Math.floor(Math.floor((Atk * (1 + Atkx)) + Atkp) * (1+Atkf)) + Atke + Atke_Idol;
    const stat_combat2 = getStat(stats, "Penp", 0);
    const stat_combat3 = ((getStat(stats, "CR_Base", 0))+(getStat(stats, "CR", 0)))*100;
    const stat_combat4 = ((getStat(stats, "CD_Base", 0))+(getStat(stats, "CD", 0)))*100;

    const stat1_name = "ATK";
    const stat2_name = "PEN";
    const stat3_name = "CR";
    const stat4_name = "CD";
    
    return {
        danoReal,
        danoPromedio,

        stat1,
        stat2,
        stat3,
        stat4,
        stat_combat1,
        stat_combat2,
        stat_combat3,
        stat_combat4,
        stat1_name,
        stat2_name,
        stat3_name,
        stat4_name,

        factores: {
            Mv_factor,
            Atk_factor,
            Crit_factor,
            Dmg_factor,
            Target_def,
            Efective_def,
            Defense_factor,
            Res_factor,
            Stun_factor,
            Cont_factor,
            danoPromedio,
            danoReal,
        }
    };
}

function calcularDanoAnomaly(stats, aturdido) {
    const Mv = getStat(stats, "Mv", 0);
    const Atk = getStat(stats, "Atk", 0);
    const Atkx = getStat(stats, "Atkx", 0);
    const Atkp = getStat(stats, "Atkp", 0);
    const Atkf = getStat(stats, "Atkf", 0);
    const Atke = getStat(stats, "Atke", 0);
    const Atke_Idol = Math.max(0, Math.min(getStat(stats, "Atke_Idol", 0), 50));

    const MA = getStat(stats, "MA", 0);
    const MA_Base = getStat(stats, "MA_Base", 0);
    
    const Ref = getStat(stats, "Ref", 0);
    const Admg = getStat(stats, "Admg", 0);

    const Dmg = getStat(stats, "Dmg", 0);
    const Res = getStat(stats, "Res", 0);
    const Stun = getStat(stats, "Stun", 0);
    const Vuln = getStat(stats, "Vuln", 0);
    const Taken = getStat(stats, "Taken", 0);

    const Penx = getStat(stats, "Penx", 0);
    const Shred = Math.max(0, Math.min(getStat(stats, "Shred", 0), 1));
    const Penp = getStat(stats, "Penp", 0);

    const Defense = getStat(stats, "Defense", 0);
    const Tasax = getStat(stats, "Tasax", 0);
    const Tasa = getStat(stats, "Tasa", 0);
    const Tasa_Total = getStat(stats, "Tasa_Total", 0);
    

    // Factores de la fórmula Anomaly
    const Mv_factor = Mv;
    const Atk_factor = (Math.floor((Atk * (1 + Atkx)) + Atkp) * (1+Atkf)) + Atke + Atke_Idol;
    const Dmg_factor = 1 + Dmg;
    const Res_factor = 1 + Res;

    const Admg_factor = 1 + Admg;
    const MA_factor = ((MA + MA_Base)/100);
    const Ref_factor = 1+Ref;

    const Target_def = Defense * (1-Shred);
    const Efective_def = Target_def * (1-Penx) - Penp;
    const Defense_factor = Math.max(0,Math.min((794) / (794 + Efective_def), 1));
    const Stun_factor = aturdido ? (1.5 + Stun + Vuln) : 1;
    const Taken_factor = 1 + Taken;


    const danoPromedio = Mv_factor * Atk_factor * MA_factor * Dmg_factor * Admg_factor * Res_factor * Stun_factor * Defense_factor * 2 * Ref_factor * Taken_factor;
    const danoReal = Mv_factor * Atk_factor * MA_factor * Dmg_factor * Admg_factor * Res_factor * Stun_factor * Defense_factor * 2 * Ref_factor * Taken_factor;

    const stat1 = Math.floor((Atk * (1 + Atkx)) + Atkp);
    const stat2 = getStat(stats, "Penp", 0);
    const stat3 = getStat(stats, "Tasa", 0);
    const stat4 = getStat(stats, "MA_Base", 0);

    const stat_combat1 = Math.floor(Math.floor((Atk * (1 + Atkx)) + Atkp) * (1+Atkf)) + Atke + Atke_Idol;
    const stat_combat2 = getStat(stats, "Penp", 0);
    const stat_combat3 = Tasa_Total;
    const stat_combat4 = ((getStat(stats, "MA_Base", 0))+(getStat(stats, "MA", 0)));

    const stat1_name = "ATK";
    const stat2_name = "PEN";
    const stat3_name = "AM";
    const stat4_name = "AP";
    
    

    return {
        danoReal,
        danoPromedio,
        
        stat1,
        stat2,
        stat3,
        stat4,
        stat_combat1,
        stat_combat2,
        stat_combat3,
        stat_combat4,
        stat1_name,
        stat2_name,
        stat3_name,
        stat4_name,
        
        factores: {
            Mv_factor,
            Atk_factor,
            MA_factor,
            Dmg_factor,
            Admg_factor,
            Target_def,
            Efective_def,
            Defense_factor,
            Res_factor,
            Stun_factor,
            Ref_factor,
            Tasax,
            Tasa,
            Atke,
        }
    };
}

function calcularDanoSheer(stats, aturdido) {
    const Mv = getStat(stats, "Mv", 0);

    const Atk = getStat(stats, "Atk", 0);
    const Atkx = getStat(stats, "Atkx", 0);
    const Atkp = getStat(stats, "Atkp", 0);
    const Atkf = getStat(stats, "Atkf", 0);
    const Atke = getStat(stats, "Atke", 0);
    const Atke_Idol = Math.max(0, Math.min(getStat(stats, "Atke_Idol", 0), 50));

    const Hp = getStat(stats, "Hp", 0);
    const Hpx = getStat(stats, "Hpx", 0);
    const Hpp = getStat(stats, "Hpp", 0);
    const Hpf = getStat(stats, "Hpf", 0);
    const Hpe = getStat(stats, "Hpe", 0);

    const Sheere = getStat(stats, "Sheere", 0);
    const Hpf_Veil = Math.max(0, Math.min(getStat(stats, "Hpf_Veil", 0), 0.05));

    const CR = getStat(stats, "CR", 0);
    const CD = getStat(stats, "CD", 0);

    const CR_Base = getStat(stats, "CR_Base", 0);
    const CD_Base = getStat(stats, "CD_Base", 0);
    const CD_Freeze = Math.max(0, Math.min(getStat(stats, "CD_Freeze", 0), 0.10));

    const Rdmg = getStat(stats, "Rdmg", 0);

    const Dmg = getStat(stats, "Dmg", 0);
    const Res = getStat(stats, "Res", 0);
    const Stun = getStat(stats, "Stun", 0);
    const Taken = getStat(stats, "Taken", 0);
    const Vuln = getStat(stats, "Vuln", 0);
    const Cont = getStat(stats, "Cont", 0);

    // Factores de la fórmula Sheer
    const Mv_factor = Mv;
    const Atk_factor = (Math.floor((Atk * (1 + Atkx)) + Atkp) * (1+Atkf)) + Atke + Atke_Idol;
    const Hp_factor = (Math.floor((Hp * (1 + Hpx)) + Hpp) * (1+(Hpf+Hpf_Veil))) + Hpe;
    const Sheer_factor = (Atk_factor*0.3 + Hp_factor*0.1) + Sheere;
    const Crit_factor = (1+((Math.min((CR+CR_Base), 1)) * ((CD + CD_Base)+ CD_Freeze)));
    const Crit_real = (1+((CD + CD_Base)+ CD_Freeze));
    const Dmg_factor = 1 + Dmg;
    const Res_factor = 1 + Res;
    const Taken_factor = 1 + Taken;

    const Rdmg_factor = 1 + Rdmg;

    const Stun_factor = aturdido ? (1.5 + Stun + Vuln) : 1;
    const Cont_factor = 1 + Cont;

    const danoPromedio = Mv_factor * Sheer_factor * Crit_factor * Dmg_factor * Rdmg_factor * Res_factor * Stun_factor * Cont_factor * Taken_factor;
    const danoReal = Mv_factor * Sheer_factor * Crit_real * Dmg_factor * Rdmg_factor * Res_factor * Stun_factor * Cont_factor * Taken_factor;
    
    const stat1 = Math.floor((Hp * (1 + Hpx)) + Hpp);
    const stat2 = Math.floor((Atk * (1 + Atkx)) + Atkp);
    const stat3 = getStat(stats, "CR_Base", 0)*100;
    const stat4 = getStat(stats, "CD_Base", 0)*100;

    const stat_combat1 = Math.floor(Math.floor((Hp * (1 + Hpx)) + Hpp) * (1+Hpf+Hpf_Veil)) + Hpe;
    const stat_combat2 = Math.floor(Math.floor((Atk * (1 + Atkx)) + Atkp) * (1+Atkf)) + Atke + Atke_Idol;
    const stat_combat3 = ((getStat(stats, "CR_Base", 0))+(getStat(stats, "CR", 0)))*100;
    const stat_combat4 = ((getStat(stats, "CD_Base", 0))+(getStat(stats, "CD", 0)))*100;

    const stat1_name = "HP";
    const stat2_name = "ATK";
    const stat3_name = "CR";
    const stat4_name = "CD";

    return {
        danoReal,
        danoPromedio,
        
        stat1,
        stat2,
        stat3,
        stat4,
        stat_combat1,
        stat_combat2,
        stat_combat3,
        stat_combat4,
        stat1_name,
        stat2_name,
        stat3_name,
        stat4_name,
        
        factores: {
            Mv_factor,
            Atk_factor,
            Hp_factor,
            Sheer_factor,
            Crit_factor,
            Dmg_factor,
            Rdmg_factor,
            Res_factor,
            Stun_factor,
            Cont_factor,
            Sheere,
            Crit_real
        }
    };
}

function calcularDanoSortedAP(stats, aturdido) {

    const Atk = getStat(stats, "Atk", 0);
    const Atkx = getStat(stats, "Atkx", 0);
    const Atkp = getStat(stats, "Atkp", 0);

    const Tasa = getStat(stats, "Tasa", 0);
    const Tasax = getStat(stats, "Tasax", 0);
    const Tasa_Total = getStat(stats, "Tasa_Total", 0);

    const Mv = getStat(stats, "Mv", 0);

    const MA = getStat(stats, "MA", 0);
    const MA_Base = getStat(stats, "MA_Base", 0);

    // Factores de la fórmula Anomaly
    const Mv_factor = Mv;

    const MA_factor = ((MA + MA_Base));

    const danoPromedio = Mv_factor* MA_factor ;
    const danoReal = Mv_factor * MA_factor;

    const stat1 = Math.floor((Atk * (1 + Atkx)) + Atkp);
    const stat2 = getStat(stats, "Penp", 0);
    const stat3 = (getStat(stats, "MA_Base", 0));
    const stat4 = (Tasa * (1 + Tasax));

    const stat_combat1 = Math.floor((Atk * (1 + Atkx)) + Atkp);
    const stat_combat2 = getStat(stats, "Penp", 0);
    const stat_combat3 = Tasa_Total;
    const stat_combat4 = (getStat(stats, "MA_Base", 0))+getStat(stats, "MA", 0);

    const stat1_name = "ATK";
    const stat2_name = "PEN";
    const stat3_name = "AM";
    const stat4_name = "AP";

    return {
        danoReal,
        danoPromedio,

        stat1,
        stat2,
        stat3,
        stat4,
        stat_combat1,
        stat_combat2,
        stat_combat3,
        stat_combat4,
        stat1_name,
        stat2_name,
        stat3_name,
        stat4_name,

        factores: {
            Mv_factor,
            MA_factor,
            Tasax,
        }
    };
}

function calcularDanoSortedAPAtk(stats, aturdido) {

    const Atk = getStat(stats, "Atk", 0);
    const Atkx = getStat(stats, "Atkx", 0);
    const Atkp = getStat(stats, "Atkp", 0);

    const Tasa = getStat(stats, "Tasa", 0);
    const Tasax = getStat(stats, "Tasax", 0);
    const Tasa_Total = getStat(stats, "Tasa_Total", 0);

    const Mv = getStat(stats, "Mv", 0);

    const MA = getStat(stats, "MA", 0);
    const MA_Base = getStat(stats, "MA_Base", 0);

    // Factores de la fórmula Anomaly
    const Mv_factor = Mv;
    const Atk_factor = Math.min(Math.floor((Atk * (1 + Atkx)) + Atkp),4000);
    const MA_factor = 1 + ((MA + MA_Base)/10000);

    const danoPromedio = Mv_factor * Atk_factor * MA_factor;
    const danoReal = MA + MA_Base;

    const stat1 = Math.floor((Atk * (1 + Atkx)) + Atkp);
    const stat2 = getStat(stats, "Penp", 0);
    const stat3 = (getStat(stats, "MA_Base", 0));
    const stat4 = (Tasa * (1 + Tasax));

    const stat_combat1 = Math.floor((Atk * (1 + Atkx)) + Atkp);
    const stat_combat2 = getStat(stats, "Penp", 0);
    const stat_combat3 = Tasa_Total;
    const stat_combat4 = (getStat(stats, "MA_Base", 0))+getStat(stats, "MA", 0);

    const stat1_name = "ATK";
    const stat2_name = "PEN";
    const stat3_name = "MA";
    const stat4_name = "AP";

    return {
        danoReal,
        danoPromedio,

        stat1,
        stat2,
        stat3,
        stat4,
        stat_combat1,
        stat_combat2,
        stat_combat3,
        stat_combat4,
        stat1_name,
        stat2_name,
        stat3_name,
        stat4_name,

        factores: {
            Mv_factor,
            MA_factor,
            Tasax,
        }
    };
}

// ==========================================
// FUNCIÓN PRINCIPAL
// ==========================================

export function calcularDanoFinal(seleccion) {
    const rawStatsTotales = calcularStatsTotales(seleccion);
    const dpsSeleccionado = dpsData[seleccion.dps];

    if (!dpsSeleccionado) {
        console.error(`No se encontró la información para el DPS: ${seleccion.dps}`);
        return null;
    }

    // Extraer primera habilidad configurada o skill seleccionada
    const primeraSkillKey = Object.keys(dpsSeleccionado.skills || {})[0];
    const skillObjeto = seleccion.skill_nombre
        ? dpsSeleccionado.skills[seleccion.skill_nombre]
        : dpsSeleccionado.skills[primeraSkillKey];

    const dpsContext = {
        elemento: dpsSeleccionado.Elemento,
        clase: dpsSeleccionado.Clase,
        tipoSkill: skillObjeto ? skillObjeto.tipo : null
    };

    // Resolver y consolidar stats condicionales (ej: Dmg_Ice -> Dmg si el DPS es Ice)
    const statsTotales = resolverStatsCondicionales(rawStatsTotales, dpsContext);

    // Stat escalado PROPIO del DPS: se aplica aqui, DESPUES de consolidar
    // condicionales, para que su stat_fuente vea los stats ya sumados por
    // elemento/clase/tipo de skill (ej. que "Dmg" ya incluya "Dmg_Ice"), y
    // para poder usar tanto un stat simple ("MA") como una formula completa
    // ("MA * CR * CD", "(Atk + 2) * Atkf", etc.).
    if (dpsSeleccionado.stat_escalado) {
        const statFuenteActual = evaluarStatFuente(statsTotales, dpsSeleccionado.stat_escalado.stat_fuente);
        aplicarEscalado(statsTotales, dpsSeleccionado.stat_escalado, statFuenteActual);
    }

    const tipoDmg = dpsSeleccionado.Tipo_dmg;
    const aturdido = Boolean(seleccion.enemigoAturdido);

    let resultado;
    switch (tipoDmg) {
        case "Sharp":
            resultado = calcularDanoSharp(statsTotales, aturdido);
            break;
        case "Sheer":
            resultado = calcularDanoSheer(statsTotales, aturdido);
            break;
        case "Normal":
            resultado = calcularDanoNormal(statsTotales, aturdido);
            break;
        case "Anomaly":
            resultado = calcularDanoAnomaly(statsTotales, aturdido);
            break;
        case "SortedAP":
            resultado = calcularDanoSortedAP(statsTotales, aturdido);
            break;
        case "SortedAPAtk":
            resultado = calcularDanoSortedAPAtk(statsTotales, aturdido);
            break;
        default:
            resultado = calcularDanoNormal(statsTotales, aturdido);
            break;
    }

    return {
        tipo: tipoDmg,
        contexto: dpsContext,
        statsConsolidadas: statsTotales,
        ...resultado
    };
}
