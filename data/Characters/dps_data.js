// DPS
const dps = {
    //Atacantes
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
        dupes_stunned: {
            0: {Dmg: 0.225 },
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {}
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
            stat_fuente: "ER_Total",
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
            0: {CR_Base: 0.194, CD_Base: 0.50, Dmg: 0.40, CD: 0.40 },
            1: {CR: 0.08},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {}
        },
        dupes_stunned: {
            0: {CD_Ultimate: 0.40},
            1: {},
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
            stat_fuente: "ER_Total",
            umbral: 160,
            stat_buff: [
                {
                stat: "Atke",
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
            0: { CR_Base: 0.05, CD_Base: 0.788, Dmg_Basic: 0.40, CR: 0.30},
            1: { Dmg_Basic: 0.50},
            2: {},
            3: {},
            4: {Res_Basic: 0.25},
            5: {},
            6: {}
        },
        dupes_stunned: {
            0: { Dmg_Basic: 0.40},
            1: {},
            2: {},
            3: {},
            4: {},
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
    "Hugo": {
        ID: 1431,
        Image: "static/DPS/Hugo.webp",
        Clase: "Atacante",
        Elemento: "Ice",
        force_stun: true,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 919, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CR_Base: 0.194, CD_Base: 0.50, CR: 0.12, CD: 0.25, Atke: 900, Dmg: 0.40, CD_Freeze: 0.10},
            1: { CR: 0.12, CD: 0.30},
            2: { Shred: 0.15},
            3: {},
            4: { Res: 0.12},
            5: {},
            6: { Dmg: 0.60}
        },
        skills: {
            "Ultimate: Blaspheme": {
                0: {Mv: 64.550},
                1: {Mv: 64.550}, 
                2: {Mv: 64.550}, 
                3: {Mv: 67.328}, 
                4: {Mv: 67.328}, 
                5: {Mv: 70.106}, 
                6: {Mv: 70.106},
                tipo: "Ultimate",
            }
        },
    },
    "Harumasa": {
        ID: 1431,
        Image: "static/DPS/Harumasa.webp",
        Clase: "Atacante",
        Elemento: "Electric",
        force_stun: false,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 915, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CR_Base: 0.194, CD_Base: 0.50, CR: 0.25, CD: 0.72, Dmg: 0.40, Atkf: 0.12, Res_Dash: 0.12},
            1: { CR: 0.12, CD: 0.30},
            2: { Dmg_Dash: 0.15},
            3: {},
            4: {},
            5: {},
            6: { Res: 0.15}
        },
        skills: {
            "Ultimate: Zanshin": {
                0: {Mv: 43.816},
                1: {Mv: 43.816}, 
                2: {Mv: 43.816}, 
                3: {Mv: 47.800}, 
                4: {Mv: 47.800}, 
                5: {Mv: 51.784}, 
                6: {Mv: 51.784},
                tipo: "Ultimate",
            }
        },
    },
    "Ellen": {
        ID: 1431,
        Image: "static/DPS/Ellen.webp",
        Clase: "Atacante",
        Elemento: "Ice",
        force_stun: false,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 938, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CR_Base: 0.194, CD_Base: 0.50, CD: 1.48, Dmg: 0.30, Res: 0.10, CD_Freeze: 0.10},
            1: { CR: 0.12},
            2: { CD_Ex: 0.60},
            3: {},
            4: {},
            5: {},
            6: { Penx: 0.20}
        },
        skills: {
            "Ultimate: Endless Winter": {
                0: {Mv: 37.817},
                1: {Mv: 37.817}, 
                2: {Mv: 37.817}, 
                3: {Mv: 41.255}, 
                4: {Mv: 41.255}, 
                5: {Mv: 44.693}, 
                6: {Mv: 44.693},
                tipo: "Ultimate",
            }
        },
    },
    "Nekomata": {
        ID: 1431,
        Image: "static/DPS/Nekomata.webp",
        Clase: "Atacante",
        Elemento: "Physical",
        force_stun: true,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 910, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CR_Base: 0.194, CD_Base: 0.50, Dmg: 0.60, Dmg_Ex: 0.35, CD: 0.60},
            1: { Res: 0.16},
            2: {},
            3: {},
            4: { CR: 0.14},
            5: {},
            6: { CD: 0.54}
        },
        skills: {
            "Ultimate: Claw Smash": {
                0: {Mv: 31.430},
                1: {Mv: 31.430}, 
                2: {Mv: 31.430}, 
                3: {Mv: 34.288}, 
                4: {Mv: 34.288}, 
                5: {Mv: 37.146}, 
                6: {Mv: 37.146},
                tipo: "Ultimate",
            }
        },
    },
    "Corn": {
        ID: 1431,
        Image: "static/DPS/Corn.webp",
        Clase: "Atacante",
        Elemento: "Physical",
        force_stun: false,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 807, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CR_Base: 0.05, CD_Base: 0.788, Dmg_Ex: 0.375 },
            1: { Dmg: 0.12},
            2: { Res: 0.10},
            3: {},
            4: {},
            5: {},
            6: {}
        },
        dupes_stunned: {
            0: { Dmg: 0.35},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {}
        },
        skills: {
            "Ultimate: Very, Very Sorry!": {
                0: {Mv: 40.583},
                1: {Mv: 40.583}, 
                2: {Mv: 40.583}, 
                3: {Mv: 44.273}, 
                4: {Mv: 44.273}, 
                5: {Mv: 47.963}, 
                6: {Mv: 47.963},
                tipo: "Ultimate",
            }
        },
    },
    "Anton": {
        ID: 1431,
        Image: "static/DPS/Anton.webp",
        Clase: "Atacante",
        Elemento: "Electric",
        force_stun: true,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 787, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CR_Base: 0.194, CD_Base: 0.50, Dmg_Ultimate: 0.24, Dmg_Basic: 0.40},
            1: {},
            2: {},
            3: {},
            4: { CR: 0.10},
            5: {},
            6: { Dmg_Basic: 0.24}
        },
        skills: {
            "Ultimate: Go Go Go Go Go!": {
                0: {Mv: 36.336},
                1: {Mv: 36.336}, 
                2: {Mv: 36.336}, 
                3: {Mv: 39.64}, 
                4: {Mv: 39.64}, 
                5: {Mv: 42.944}, 
                6: {Mv: 42.944},
                tipo: "Ultimate",
            }
        },
    },
    "Billy": {
        ID: 1431,
        Image: "static/DPS/Billy.webp",
        Clase: "Atacante",
        Elemento: "Physical",
        force_stun: true,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 787, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CR_Base: 0.194, CD_Base: 0.50, Dmg_Basic: 0.50, Dmg_Ultimate: 1.0},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: { Dmg: 0.30}
        },
        skills: {
            "Ultimate: Starlight, Shine Bright": {
                0: {Mv: 31.960},
                1: {Mv: 31.960}, 
                2: {Mv: 31.960}, 
                3: {Mv: 34.866}, 
                4: {Mv: 34.866}, 
                5: {Mv: 37.772}, 
                6: {Mv: 37.772},
                tipo: "Ultimate",
            }
        },
    },


    
    //Anomalos
    "Miyabi": {
        ID: 1261,
        Image: "static/DPS/Miyabi.webp",
        Clase: "Anomalo",
        Elemento: "Ice",
        force_stun: false,
        Tipo_dmg: "Normal",
        Stats_base: { Atk: 880, ER: 1.5, Tasa: 151 },
        dupes: {
            0: { CR_Base: 0.05, CD_Base: 0.50, Dmg: 0.30, Dmg_Basic: 0.60, Res_Basic: 0.30, CD_Freeze: 0.10},
            1: { Shred: 0.36},
            2: { CR: 0.15},
            3: {},
            4: {},
            5: {},
            6: { Dmg_Basic: 0.30}
        },
        skills: {
            "Ultimate: Lingering Snow": {
                0: {Mv: 47.761},
                1: {Mv: 47.761}, 
                2: {Mv: 47.761}, 
                3: {Mv: 52.103}, 
                4: {Mv: 52.103}, 
                5: {Mv: 56.445}, 
                6: {Mv: 56.445},
                tipo: "Ultimate",
            }
        },
    },
    "Jane": {
        ID: 1261,
        Image: "static/DPS/Jane.webp",
        Clase: "Anomalo",
        Elemento: "Physical",
        force_stun: false,
        Tipo_dmg: "Anomaly",
        Stats_base: { Atk: 880, ER: 1.5, Tasa: 148 },
        dupes: {
            0: { MA_Base: 114},
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
            stat_fuente: "MA_Total",
            umbral: 120,
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
            stat_fuente: "Tasa_Total",
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
        force_stun: true,
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
    "Velina": {
        ID: 1261,
        Image: "static/DPS/Velina.webp",
        Clase: "Anomalo",
        Elemento: "Wind",
        force_stun: false,
        Tipo_dmg: "Anomaly",
        Stats_base: { Atk: 872, ER: 1200, Tasa: 142, Tasae: 0 },
        dupes: {
            0: { MA_Base: 165, Admg: 0.10},
            1: { Res: 0.20},
            2: { Dmg: 0.15},
            3: {},
            4: { Atkf: 0.15},
            5: {},
            6: { Dmg: 0.40}
        },
        skills: {
            "Windswept": {
                0: {Mv: 12.5},
                1: {Mv: 12.5}, 
                2: {Mv: 12.5}, 
                3: {Mv: 12.5}, 
                4: {Mv: 12.5}, 
                5: {Mv: 12.5}, 
                6: {Mv: 12.5},
                tipo: "Element",
            }
        },
        stat_escalado: {
            stat_fuente: "ER_Total",
            umbral: 1200,
            stat_buff: [
                {
                stat: "Dmg",
                razon: 0.0021,
                paso: 10,
                maxbuff: 0.35
                },
            ]
        },
    },
    "Burnice": {
        ID: 1261,
        Image: "static/DPS/Burnice.webp",
        Clase: "Anomalo",
        Elemento: "Fire",
        force_stun: false,
        Tipo_dmg: "Anomaly",
        Stats_base: { Atk: 863, ER: 1560, Tasa: 118},
        dupes: {
            0: { MA_Base: 120, Dmg_Ex: 0.30},
            1: {},
            2: { Penx: 0.20},
            3: {},
            4: {},
            5: {},
            6: { Res: 0.25}
        },
        skills: {
            "Burn": {
                0: {Mv: 0.5},
                1: {Mv: 0.5}, 
                2: {Mv: 0.5}, 
                3: {Mv: 0.5}, 
                4: {Mv: 0.5}, 
                5: {Mv: 0.5}, 
                6: {Mv: 0.5},
                tipo: "Ex",
            }
        },
        stat_escalado: {
            stat_fuente: "ER_Total",
            umbral: 1800,
            stat_buff: [
                {
                stat: "Dmg",
                razon: 0.002,
                paso: 10,
                maxbuff: 0.2
                },
            ]
        },
    },
    "Yanagi": {
        ID: 1261,
        Image: "static/DPS/Yanagi.webp",
        Clase: "Anomalo",
        Elemento: "Electric",
        force_stun: false,
        Tipo_dmg: "Anomaly",
        Stats_base: { Atk: 872, ER: 1560, Tasa: 148},
        dupes: {
            0: { MA_Base: 114, Dmg: 0.30, Penx: 0.10},
            1: { MA: 80},
            2: {},
            3: {},
            4: { Penx: 0.16},
            5: {},
            6: { Dmg_Ex: 0.20}
        },
        skills: {
            "Shock": {
                0: {Mv: 1.25},
                1: {Mv: 1.25}, 
                2: {Mv: 1.25}, 
                3: {Mv: 1.25}, 
                4: {Mv: 1.25}, 
                5: {Mv: 1.25}, 
                6: {Mv: 1.25},
                tipo: "Ex",
            }
        },
    },
    "Grace": {
        ID: 1261,
        Image: "static/DPS/Grace.webp",
        Clase: "Anomalo",
        Elemento: "Electric",
        force_stun: false,
        Tipo_dmg: "Anomaly",
        Stats_base: { Atk: 825, ER: 1560, Tasa: 151},
        dupes: {
            0: { MA_Base: 116, Dmg: 0.66},
            1: {},
            2: { Res: 0.085},
            3: {},
            4: {},
            5: {},
            6: {}
        },
        skills: {
            "Shock": {
                0: {Mv: 1.25},
                1: {Mv: 1.25}, 
                2: {Mv: 1.25}, 
                3: {Mv: 1.25}, 
                4: {Mv: 1.25}, 
                5: {Mv: 1.25}, 
                6: {Mv: 1.25},
                tipo: "Ex",
            }
        },
    },
    "Promeia": {
        ID: 1261,
        Image: "static/DPS/Promeia.webp",
        Clase: "Anomalo",
        Elemento: "Ice",
        force_stun: false,
        Tipo_dmg: "Anomaly",
        Stats_base: { Atk: 872, ER: 1560, Tasa: 148},
        dupes: {
            0: { MA_Base: 114},
            1: { },
            2: { MA: 40},
            3: {},
            4: {},
            5: {},
            6: { Res: 0.15}
        },
        skills: {
            "Shatter": {
                0: {Mv: 5.0},
                1: {Mv: 5.0}, 
                2: {Mv: 5.0}, 
                3: {Mv: 5.0}, 
                4: {Mv: 5.0}, 
                5: {Mv: 5.0}, 
                6: {Mv: 5.0},
                tipo: "Ex",
            }
        },
        stat_escalado: {
            stat_fuente: "Tasa_Total",
            umbral: 150,
            stat_buff: [
                {
                stat: "MA",
                razon: 1.5,
                paso: 1,
                maxbuff: null
                },
            ]
        },
    },
    "Vivian(Supp)": {
        ID: 1261,
        Image: "static/DPS/Vivian.webp",
        Clase: "Anomalo",
        Elemento: "Ether",
        force_stun: false,
        Tipo_dmg: "SortedAP",
        Stats_base: { Atk: 880, ER: 1.5, Tasa: 144 },
        dupes: {
            0: { MA_Base: 118},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {}
        },
        skills: {
            "Highest AP build": {
                0: {Mv: 1},
                1: {Mv: 1}, 
                2: {Mv: 1}, 
                3: {Mv: 1}, 
                4: {Mv: 1}, 
                5: {Mv: 1}, 
                6: {Mv: 1},
                tipo: "Ultimate",
            }
        },
    },
    "Remielle(Supp)": {
        ID: 1261,
        Image: "static/DPS/Remielle.webp",
        Clase: "Anomalo",
        Elemento: "Ether",
        force_stun: false,
        Tipo_dmg: "SortedAPAtk",
        Stats_base: { Atk: 823, ER: 1.5, Tasa: 144 },
        dupes: {
            0: { MA_Base: 170},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {}
        },
        skills: {
            "Highest AP-4000Atk": {
                0: {Mv: 1},
                1: {Mv: 1}, 
                2: {Mv: 1}, 
                3: {Mv: 1}, 
                4: {Mv: 1}, 
                5: {Mv: 1}, 
                6: {Mv: 1},
                tipo: "Ultimate",
            }
        },
    },

    "Piper": {
        ID: 1261,
        Image: "static/DPS/Piper.webp",
        Clase: "Anomalo",
        Elemento: "Physical",
        force_stun: false,
        Tipo_dmg: "Anomaly",
        Stats_base: { Atk: 758, ER: 1.5, Tasa: 116, Tasae: 0 },
        dupes: {
            0: { MA_Base: 118, Dmg: 0.18},
            1: { Dmg: 0.09},
            2: { Dmg: 0.40},
            3: {},
            4: {},
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
            0: { CD_Base: 0.50, CD: 0.40, Dmg: 0.60, CR_Base: 0.194},
            1: { CR: 0.10},
            2: { Res_Ultimate: 0.15, Res_Ex: 0.15},
            3: {},
            4: { Dmg_Ex: 0.60},
            5: {},
            6: { Rdmg: 0.20}
        },
        dupes_stunned: {
            0: { Dmg_Ex: 0.30},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {}
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
    "Silly": {
        ID: 1371,
        Image: "static/DPS/Silly.webp",
        Clase: "Ruptura",
        Elemento: "Physical",
        force_stun: true,
        Tipo_dmg: "Sheer",
        Stats_base: { Atk: 859, Hp: 8497, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CR_Base: 0.194, CD_Base: 0.50, CD: 0.90, Dmg: 0.40},
            1: { Res: 0.18},
            2: { Dmg: 0.50, CD_Ex: 0.50},
            3: {},
            4: { CD: 0.16},
            5: {},
            6: { Rdmg: 0.18}
        },
        skills: {
            "Ultimate: Starlight Knight Flying Kick": {
                0: {Mv: 31.849},
                1: {Mv: 31.849}, 
                2: {Mv: 31.849}, 
                3: {Mv: 34.745}, 
                4: {Mv: 34.745}, 
                5: {Mv: 37.641}, 
                6: {Mv: 37.641},
                tipo: "Ultimate",
            }
        },
    },
    "Yidhari": {
        ID: 1371,
        Image: "static/DPS/Yidhari.webp",
        Clase: "Ruptura",
        Elemento: "Ice",
        force_stun: true,
        Tipo_dmg: "Sheer",
        Stats_base: { Atk: 859, Hp: 8497, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CR_Base: 0.194, CD_Base: 0.50, Hpf_Veil: 0.05, Dmg: 1.0, CD: 0.30},
            1: { Res_Basic: 0.20, Res_Ex: 0.20},
            2: { CD: 0.40},
            3: {},
            4: { Hpf: 0.05},
            5: {},
            6: { Rdmg: 0.25}
        },
        skills: {
            "Ultimate: Final Act - Crossing the River of Regret": {
                0: {Mv: 30.445},
                1: {Mv: 30.445}, 
                2: {Mv: 30.445}, 
                3: {Mv: 33.213}, 
                4: {Mv: 33.213}, 
                5: {Mv: 35.981}, 
                6: {Mv: 35.981},
                tipo: "Ultimate",
            }
        },
    },
    "Banyue": {
        ID: 1371,
        Image: "static/DPS/Banyue.webp",
        Clase: "Ruptura",
        Elemento: "Fire",
        force_stun: true,
        Tipo_dmg: "Sheer",
        Stats_base: { Atk: 859, Hp: 8497, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CR_Base: 0.194, CD_Base: 0.50, Sheere: 300, Dmg: 0.51, CD: 0.36},
            1: { Res: 0.10, Rdmg: 0.10},
            2: { CD: 0.15, Dmg: 0.15},
            3: {},
            4: { Dmg_Basic: 0.30},
            5: {},
            6: { Dmg: 0.24}
        },
        skills: {
            "Ultimate: The World Trembles": {
                0: {Mv: 31.978},
                1: {Mv: 31.978}, 
                2: {Mv: 31.978}, 
                3: {Mv: 34.886}, 
                4: {Mv: 34.886}, 
                5: {Mv: 37.794}, 
                6: {Mv: 37.794},
                tipo: "Ultimate",
            }
        },
    },
    "Manato": {
        ID: 1371,
        Image: "static/DPS/Manato.webp",
        Clase: "Ruptura",
        Elemento: "Fire",
        force_stun: false,
        Tipo_dmg: "Sheer",
        Stats_base: { Atk: 755, Hp: 7724, ER: 1.5, Tasa: 80 },
        dupes: {
            0: { CR_Base: 0.05, CD_Base: 0.50, CD_Basic: 0.50, CR: 0.10, Dmg: 0.20},
            1: { Dmg_Basic: 0.20},
            2: { Res: 0.08},
            3: {},
            4: { Hpf: 0.08},
            5: {},
            6: { Dmg: 0.15}
        },
        skills: {
            "Ultimate: Musou Aratama": {
                0: {Mv: 31.254},
                1: {Mv: 31.254}, 
                2: {Mv: 31.254}, 
                3: {Mv: 34.096}, 
                4: {Mv: 34.096}, 
                5: {Mv: 36.938}, 
                6: {Mv: 36.938},
                tipo: "Ultimate",
            }
        },
    },
    
}


export default dps
