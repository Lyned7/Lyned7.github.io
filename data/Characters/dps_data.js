// DPS
const dps = {
    //Atacantes
    "Sigrid": {
        ID: 1611,
        Image: "static/DPS/Sigrid.webp",
        Clase: "Atacante",
        Elemento: "Ice",
        force_stun: false,
        tipo_dano: "Normal",
        Stats_base: { Atk: 938, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CD: 0.50, CR: 0.854, Dmg_Basic: 0.20, Atke: 840, Stun: 0.20 },
            1: { Atkf: 0.25},
            2: { Penx: 0.24},
            3: {},
            4: { Dmg: 0.18},
            5: {},
            6: {}
        },
        skills: {
            "Ultimate: Frozen Heavens": {
                0: {Mv: 43.799},
                1: {Mv: 43.799}, 
                2: {Mv: 43.799}, 
                3: {Mv: 47.781}, 
                4: {Mv: 47.781}, 
                5: {Mv: 51.763}, 
                6: {Mv: 51.763},
                tipo: "Ultimate",
            }
        },
        stat_escalado: {
            stat_fuente: "Cont",
            umbral: 0,
            max_buff_umbral: 0.20,
            stat_buff: [
                {
                stat: "Dmg",
                razon: 0.0075,
                paso: 0.01,
                maxbuff: 0.15
                },
            ]
        },
    },
    "S11": {
        ID: 1041,
        Image: "static/DPS/Harin.webp",
        Clase: "Atacante",
        Elemento: "Fire",
        force_stun: false,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 888, ER: 150, Tasa: 80 },
        dupes: {
            0: { Dmg_Basic: 0.70, Dmg: 0.10, CR_Base: 0.194, CD_Base: 0.50, CD: 0.48},
            1: {},
            2: { Dmg_Basic: 0.36},
            3: {},
            4: {},
            5: {},
            6: { Res_Basic: 0.25}
        },
        skills: {
            "No tiene sentido nada": {
                0: {Mv: 42.062},
                1: {Mv: 42.062}, 
                2: {Mv: 42.062}, 
                3: {Mv: 45.886}, 
                4: {Mv: 45.886}, 
                5: {Mv: 49.710}, 
                6: {Mv: 49.710},
                tipo: "Basic",
            }
        },
    },
    "YeShunguang": {
        ID: 1431,
        Image: "static/DPS/YeShunguang.webp",
        Clase: "Atacante",
        Elemento: "Physical",
        force_stun: true,
        tipo_dano: "Normal",
        Stats_base: { Atk: 938, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { Dmg: 0.25, CR: 0.494, CD: 0.50},
            1: { Dmg: 0.10, Shred: 0.20},
            2: { Shred_Ultimate: 0.40},
            3: {},
            4: {},
            5: {},
            6: {}
        },
        skills: {
            "Ultimate: Cleaving Heavens": {
                0: {Mv: 61.687},
                1: {Mv: 61.687}, 
                2: {Mv: 61.687}, 
                3: {Mv: 67.295}, 
                4: {Mv: 67.295}, 
                5: {Mv: 72.903}, 
                6: {Mv: 72.903},
                tipo: "Ultimate",
            }
        },
    },
    "YeShunguang2": {
        ID: 1431,
        Image: "static/DPS/YeShunguang.webp",
        Clase: "Atacante",
        Elemento: "Physical",
        force_stun: true,
        tipo_dano: "Normal",
        Stats_base: { Atk: 938, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { Dmg: 0.25, CR: 0.494, CD: 0.50},
            1: { Dmg: 0.10, Shred: 0.20},
            2: { Shred_Ultimate: 0.40},
            3: {},
            4: {},
            5: {},
            6: {}
        },
        skills: {
            "Ultimate: Cleaving Heavens": {
                0: {Mv: 61.687},
                1: {Mv: 61.687}, 
                2: {Mv: 61.687}, 
                3: {Mv: 67.295}, 
                4: {Mv: 67.295}, 
                5: {Mv: 72.903}, 
                6: {Mv: 72.903},
                tipo: "Ultimate",
            }
        },
    },

    //Armorer
    "Claret": {
        ID: 1611,
        Image: "static/DPS/Claret.webp",
        Clase: "Armorer",
        Tipo_dmg: "Sharp",
        Elemento: "Electric",
        force_stun: true,
        Stats_base: { Def: 441, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CD: 0.50, CR: 0.638, Lac: 1.75 },
            1: { Res_Ultimate: 0.16, Res_Chain: 0.16 },
            2: {},
            3: {},
            4: { Dmg_Basic: 0.20, Dmg_Ultimate: 0.20, Dmg_Chain: 0.20 },
            5: {},
            6: {}
        },
        skills: {
            "Ultimate: Blood Blossom Oath - Tempered Through Fire": {
                0: {Mv: 43.712},
                1: {Mv: 43.712}, 
                2: {Mv: 43.712}, 
                3: {Mv: 47.686}, 
                4: {Mv: 47.686}, 
                5: {Mv: 51.660}, 
                6: {Mv: 51.660},
                tipo: "Ultimate",
            }
        },
        stat_escalado: {
            stat_fuente: "CD_Initial",
            umbral: 0,
            max_buff_umbral: null,
            stat_buff: [
                {
                stat: "CR",
                razon: 0.0035,
                paso: 0.01,
                maxbuff: null
                },
            ]
        },
    },
    
    //Anomalos
    "Jane": {
        ID: 1261,
        Image: "static/DPS/Jane.webp",
        Clase: "Anomalo",
        Elemento: "Physical",
        force_stun: false,
        Tipo_dmg: "Anomaly",
        Stats_base: { Atk: 880, ER: 1.5, Tasa: 148 },
        dupes: {
            0: { MA: 114},
            1: { Dmg: 0.30},
            2: { Shred: 0.15},
            3: {},
            4: { Admg: 0.18},
            5: {},
            6: {}
        },
        skills: {
            "Assault": {
                0: {Mv: 12.834},
                1: {Mv: 12.834}, 
                2: {Mv: 16.399}, 
                3: {Mv: 16.399}, 
                4: {Mv: 16.399}, 
                5: {Mv: 16.399}, 
                6: {Mv: 16.399},
                tipo: "Ultimate",
            }
        },
        stat_escalado: {
            stat_fuente: "MA",
            umbral: 120,
            max_buff_umbral: 800,
            stat_buff: [
                {
                stat: "Atke",
                razon: 2,
                paso: 1,
                maxbuff: 600
                },
            ]
        },
    },

    //Ruptura
    "Yixuan": {
        ID: 1371,
        Image: "static/DPS/Yixuan.webp",
        Clase: "Ruptura",
        Elemento: "Ether",
        force_stun: false,
        Tipo_dmg: "Sheer",
        Stats_base: { Atk: 872, Hp: 8373, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CD: 0.90, Dmg: 0.60, Dmg_Ex: 0.30, CR: 0.194},
            1: { CR: 0.10},
            2: { Res_Ultimate: 0.15, Res_Ex: 0.15},
            3: {},
            4: { Dmg_Ex: 0.60},
            5: {},
            6: { Rdmg: 0.20}
        },
        skills: {
            "Ultimate: Endless Talisman Suppression": {
                0: {Mv: 37.069},
                1: {Mv: 29.325}, 
                2: {Mv: 29.325}, 
                3: {Mv: 31.991}, 
                4: {Mv: 31.991}, 
                5: {Mv: 34.657}, 
                6: {Mv: 34.657},
                tipo: "Ultimate",
            }
        },
    },
}

export default dps
