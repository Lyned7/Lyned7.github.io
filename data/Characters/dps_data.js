// DPS
const dps = {
    //Atacantes
    "Sigrid": {
        ID: 1611,
        Image: "static/DPS/Sigrid.webp",
        Clase: "Atacante",
        Elemento: "Ice",
        force_stun: false,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 938, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CD_Base: 0.50, CR_Base: 0.194, CR: 0.66, Dmg_Basic: 0.20, Atke: 840, Stun: 0.20 },
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
        force_stun: true,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 888, ER: 150, Tasa: 80 },
        dupes: {
            0: { Dmg_Basic: 0.70, Dmg: 0.325, CR_Base: 0.194, CD_Base: 0.50, CD: 0.48},
            1: {},
            2: { Dmg_Basic: 0.36},
            3: {},
            4: {},
            5: {},
            6: { Res_Basic: 0.25}
        },
        skills: {
            "Ultimate: Bellowing Flame": {
                0: {Mv: 42.062},
                1: {Mv: 42.062}, 
                2: {Mv: 42.062}, 
                3: {Mv: 45.886}, 
                4: {Mv: 45.886}, 
                5: {Mv: 49.710}, 
                6: {Mv: 49.710},
                tipo: "Ultimate",
            }
        },
    },
    "Sanby": {
        ID: 1041,
        Image: "static/DPS/Sanby.webp",
        Clase: "Atacante",
        Elemento: "Electric",
        force_stun: false,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 929, ER: 150, Tasa: 80 },
        dupes: {
            0: { Dmg: 0.25, Dmg_Aftershock: 0.50, CR_Base: 0.194, CR: 0.10, CD_Base: 0.50, CDf: 0.35},
            1: {},
            2: { CR: 0.12},
            3: {},
            4: {},
            5: {},
            6: {}
        },
        skills: {
            "Ultimate: Voidstrike": {
                0: {Mv: 34.707},
                1: {Mv: 34.707}, 
                2: {Mv: 34.707}, 
                3: {Mv: 37.863}, 
                4: {Mv: 37.863}, 
                5: {Mv: 41.019}, 
                6: {Mv: 41.019},
                tipo: "Aftershock",
            }
        },
    },
    "YeShunguang": {
        ID: 1431,
        Image: "static/DPS/YeShunguang.webp",
        Clase: "Atacante",
        Elemento: "Physical",
        force_stun: true,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 938, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { Dmg: 0.25, CR_Base: 0.194, CR: 0.30, CD_Base: 0.50},
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
    "Cissia": {
        ID: 1521,
        Image: "static/DPS/Cissia.webp",
        Clase: "Atacante",
        Elemento: "Electric",
        force_stun: true,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 938, ER: 156, Tasa: 80 },
        dupes: {
            0: {CR_Base: 0.05, CR: 0.18, CD_Base: 0.50, CD: 0.55, Shred: 0.06},
            1: { Shred: 0.10, Res: 0.05, Res_Basic: 0.10},
            2: { Dmg_Basic: 0.35},
            3: {},
            4: {},
            5: {},
            6: {}
        },
        skills: {
            "Ultimate: Ophidiophobia": {
                0: {Mv: 36.227},
                1: {Mv: 36.227}, 
                2: {Mv: 36.227}, 
                3: {Mv: 39.521}, 
                4: {Mv: 39.521}, 
                5: {Mv: 42.815}, 
                6: {Mv: 42.815},
                tipo: "Ultimate",
            }
        },
        stat_escalado: {
            stat_fuente: "ER*(1+ERx)",
            umbral: 140,
            stat_buff: [
                {
                stat: "Shred",
                razon: 0.01,
                paso: 12,
                maxbuff: 0.19
                },
            ]
        },
    },
    "Seed": {
        ID: 1431,
        Image: "static/DPS/Seed.webp",
        Clase: "Atacante",
        Elemento: "Electric",
        force_stun: true,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 929, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CR_Base: 0.05, CD_Base: 0.788, Atke: 1000, CD: 0.30, Dmg: 0.30, Res: 0.25},
            1: { CD_Basic: 0.30},
            2: { Shred: 0.20, Dmg_Basic: 0.60},
            3: {},
            4: {Dmg_Ultimate: 0.20},
            5: {},
            6: {CD: 0.50}
        },
        skills: {
            "Ultimate: Clockwork Garden - Bloom!": {
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
    "Pyrois": {
        ID: 1431,
        Image: "static/DPS/Pyrois.webp",
        Clase: "Atacante",
        Elemento: "Ether",
        force_stun: true,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 924, ER: 1.5, Tasa: 80 },
        dupes: {
            0: {CR_Base: 0.194, CD_Base: 0.50, Dmg: 0.40, CD: 0.80 },
            1: {CR: 0.08},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {}
        },
        skills: {
            "Ultimate: Unbound Swordstorm": {
                0: {Mv: 19.468},
                1: {Mv: 19.468}, 
                2: {Mv: 19.468}, 
                3: {Mv: 21.238}, 
                4: {Mv: 21.238}, 
                5: {Mv: 23.008}, 
                6: {Mv: 23.008},
                tipo: "Ultimate",
            }
        },
        stat_escalado: {
            stat_fuente: "Cont",
            umbral: 0,
            stat_buff: [
                {
                stat: "Mv",
                razon: 0.9,
                paso: 0.01,
                maxbuff: 9.0
                },
            ]
        },
    },
    "Evelyn": {
        ID: 1041,
        Image: "static/DPS/Evelyn.webp",
        Clase: "Atacante",
        Elemento: "Fire",
        force_stun: true,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 929, ER: 150, Tasa: 80 },
        dupes: {
            0: {CR_Base: 0.194, CD_Base: 0.50, CR: 0.25, Dmg_Chain: 0.30, Dmg_Ultimate: 0.30},
            1: {Shred: 0.12},
            2: {Atkf: 0.15},
            3: {},
            4: {CD: 0.40},
            5: {},
            6: {}
        },
        skills: {
            "Ultimate: Lunalux Garrote": {
                0: {Mv: 49.71625},
                1: {Mv: 49.71625}, 
                2: {Mv: 49.71625}, 
                3: {Mv: 54.23625}, 
                4: {Mv: 54.23625}, 
                5: {Mv: 58.75625}, 
                6: {Mv: 58.75625},
                tipo: "Ultimate",
            }
        },
    },
    "Orphie": {
        ID: 1041,
        Image: "static/DPS/Orphie.webp",
        Clase: "Atacante",
        Elemento: "Fire",
        force_stun: true,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 929, ER: 156, Tasa: 80 },
        dupes: {
            0: {CR_Base: 0.05, CR: 0.25, CD_Base: 0.50, Dmg_Aftershock: 0.85, Atke: 280, Shred: 0.25},
            1: {Res: 0.15, Dmg: 0.20},
            2: {Atkf: 0.20},
            3: {},
            4: {},
            5: {},
            6: {}
        },
        skills: {
            "EX Special Attack: Crimson Vortex": {
                0: {Mv: 13.571},
                1: {Mv: 13.571}, 
                2: {Mv: 13.571}, 
                3: {Mv: 14.805}, 
                4: {Mv: 14.805}, 
                5: {Mv: 16.039}, 
                6: {Mv: 16.039},
                tipo: "Aftershock",
            }
        },
        stat_escalado: {
            stat_fuente: "ER*(1+ERx)",
            umbral: 160,
            stat_buff: [
                {
                stat: "Shred",
                razon: 20,
                paso: 10,
                maxbuff: 420
                },
            ]
        },
    },
    "Zhu Yuan": {
        ID: 1431,
        Image: "static/DPS/Zhu_Yuan.webp",
        Clase: "Atacante",
        Elemento: "Ether",
        force_stun: true,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 919, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CR_Base: 0.05, CD_Base: 0.788, Dmg_Basic: 0.80, CR: 0.30},
            1: { Dmg_Basic: 0.50},
            2: {},
            3: {},
            4: {Res_Basic: 0.25},
            5: {},
            6: {}
        },
        skills: {
            "Ultimate: Max Eradication Mode": {
                0: {Mv: 39.554},
                1: {Mv: 39.554}, 
                2: {Mv: 39.554}, 
                3: {Mv: 43.150}, 
                4: {Mv: 43.150}, 
                5: {Mv: 46.746}, 
                6: {Mv: 46.746},
                tipo: "Ultimate",
            }
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
    "Alice": {
        ID: 1261,
        Image: "static/DPS/Alice.webp",
        Clase: "Anomalo",
        Elemento: "Physical",
        force_stun: false,
        Tipo_dmg: "Anomaly",
        Stats_base: { Atk: 880, ER: 1.5, Tasa: 142, Tasae: 0 },
        dupes: {
            0: { MA_Base: 118},
            1: { Shred: 0.20},
            2: { Dmg: 0.15},
            3: {},
            4: { Res: 0.10},
            5: {},
            6: {}
        },
        skills: {
            "Assault": {
                0: {Mv: 7.13},
                1: {Mv: 7.13}, 
                2: {Mv: 7.13}, 
                3: {Mv: 7.13}, 
                4: {Mv: 7.13}, 
                5: {Mv: 7.13}, 
                6: {Mv: 7.13},
                tipo: "Element",
            }
        },
        stat_escalado: {
            stat_fuente: "Tasa*(1+Tasax)+Tasae",
            umbral: 140,
            stat_buff: [
                {
                stat: "MA",
                razon: 1.6,
                paso: 1,
                maxbuff: null
                },
            ]
        },
    },
    "Aria": {
        ID: 1261,
        Image: "static/DPS/Aria.webp",
        Clase: "Anomalo",
        Elemento: "Ether",
        force_stun: false,
        Tipo_dmg: "Anomaly",
        Stats_base: { Atk: 863, ER: 1.5, Tasa: 151 },
        dupes: {
            0: { MA_Base: 116, MA: 90, Atke_Idol: 50},
            1: { },
            2: { Shred_Abloom: 0.24},
            3: {},
            4: {},
            5: {},
            6: {}
        },
        skills: {
            "Corrupted": {
                0: {Mv: 0.625},
                1: {Mv: 0.625}, 
                2: {Mv: 0.625}, 
                3: {Mv: 0.625}, 
                4: {Mv: 0.625}, 
                5: {Mv: 0.625}, 
                6: {Mv: 0.625},
                tipo: "Element",
            }
        },
    },

    //Ruptura
    "Yixuan": {
        ID: 1371,
        Image: "static/DPS/Yixuan.webp",
        Clase: "Ruptura",
        Elemento: "Ether",
        force_stun: true,
        Tipo_dmg: "Sheer",
        Stats_base: { Atk: 872, Hp: 8373, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CD_Base: 0.50, CD: 0.40, Dmg: 0.60, Dmg_Ex: 0.30, CR_Base: 0.194},
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
