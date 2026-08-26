// SUPPORTS

const supp = {
    // Apoyo
    "Sunna": {
        ID: 1491,
        Image: "static/SUPPORT/Sunna.webp",
        Clase: "Apoyo",
        buffs: {
            0: { Stun: 0.30, Atke: 50, },
            1: { Shred: 0.21 },
            2: { Atkf: 0.10 },
            3: {},
            4: { Dmg: 0.18 },
            5: {},
            6: {}
        },
        stat_escalado: {
            stat_fuente: "Atk",
            umbral: 0,
            max_buff_umbral: 3500,
            stat_buff: [
                {
                stat: "Atke",
                razon: 0.30,
                paso: 1,
                maxbuff: 1050
                },
            ],
        },
    },
    "Lucia": {
        ID: 1451,
        Image: "static/SUPPORT/Lucia.webp",
        Clase: "Apoyo",
        buffs: {
            0: { Sheere: 12, Dmg: 0.20, Hpf: 0.05, CD: 0.30},
            1: { Res: 0.18 },
            2: { Dmg: 0.15, Rdmg: 0.15 },
            3: {},
            4: { Dmg: 0.18 },
            5: {},
            6: {}
        },
        stat_escalado: {
            stat_fuente: "Hp",
            umbral: 0,
            max_buff_umbral: 25000,
            stat_buff: [
                {
                stat: "Sheere",
                razon: 0.037,
                paso: 1,
                maxbuff: 888
                },
            ],
        },
    },
    "Yuzuha": {
        ID: 1451,
        Image: "static/SUPPORT/Yuzuha.webp",
        Clase: "Apoyo",
        buffs: {
            0: { Dmg: 0.15, Atke: 1200},
            1: { Res: 0.10, Admg: 0.06 },
            2: { Dmg: 0.15},
            3: {},
            4: {},
            5: {},
            6: {}
        },
        buffs_bar: {
            stat_buff: "Admg",
            stat_convertida: "A.Mastery",
            umbral: 100,
            max_buff: 0.20, 
            max_buff_umbral: 200, 
            razon: 0.002, 
            paso: 1 
        }
    },
    "Astra": {
        ID: 1311,
        Image: "static/SUPPORT/Astra.webp",
        Clase: "Apoyo",
        buffs: {
            0: { Dmg: 0.20, CD: 0.25},
            1: { Res: 0.10, Admg: 0.06 },
            2: { Dmg: 0.15},
            3: {},
            4: {},
            5: {},
            6: {}
        },
        buffs_bar: {
            stat_buff: "Atke",
            stat_convertida: "Atk",
            umbral: 0,
            max_buff: 1200, 
            max_buff_umbral: 3430, 
            razon: 0.35, 
            paso: 1 
        }
    },
    "Rina": {
        ID: 1211,
        Image: "static/SUPPORT/Rina.webp",
        Clase: "Apoyo",
        buffs: {
            0: { Penx: 0.12, Dmg_Electric: 0.10},
            1: { Penx: 0.09},
            2: {}, 
            3: {},
            4: {},
            5: {},
            6: {Dmg_Electric: 0.15}
        },
        stat_escalado: {
            stat_fuente: "Pen%",
            umbral: 0,
            max_buff_umbral: 0.72,
            stat_buff: [
                {
                stat: "Atke",
                razon: 8,
                paso: 0.01,
                maxbuff: null
                },
                {
                stat: "Defe",
                razon: 6.5,
                paso: 0.01,
                maxbuff: 468
                },
                {
                stat: "Penx",
                razon: 0.0025,
                paso: 0.01,
                maxbuff: 0.18
                },
            ],
        },
    },

    // Apoyo A-Rank
    "Nicole": {
        ID: 1031,
        Image: "static/SUPPORT/Nicole.webp",
        Clase: "Apoyo",
        buffs: {
            0: { Shred: 0.40, Dmg_Ether: 0.25},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: { CR: 0.15}
        },
    },
    "Lucy": {
        ID: 1031,
        Image: "static/SUPPORT/Lucy.webp",
        Clase: "Apoyo",
        buffs: {
            0: { Atke: 104},
            1: {},
            2: {},
            3: {},
            4: { CD: 0.10},
            5: {},
            6: {}
        },
        buffs_bar: {
            stat_buff: "Atke",
            stat_convertida: "Atk",
            umbral: 0,
            max_buff: 496, 
            max_buff_umbral: 1923, 
            razon: 0.258, 
            paso: 1 
        }
    },
    "Soukaku": {
        ID: 1031,
        Image: "static/SUPPORT/Soukaku.webp",
        Clase: "Apoyo",
        buffs: {
            0: { Dmg_Ice: 0.20},
            1: {},
            2: {},
            3: {},
            4: { Res_Ice: 0.10},
            5: {},
            6: {}
        },
        buffs_bar: {
            stat_buff: "Atke",
            stat_convertida: "Atk",
            umbral: 0,
            max_buff: 1000, 
            max_buff_umbral: 2500, 
            razon: 0.40, 
            paso: 1 
        }
    },

    // Stunner
    "Roxy": {
        ID: 1621,
        Image: "static/SUPPORT/Roxy.webp",
        Clase: "Stunner",
        buffs: {
            0: { Stun: 0.30, Cont: 0.20},
            1: { Res: 0.15 },
            2: { Stun: 0.25 }, // Se van sumando los buffs de cada nivel de dupe
            3: {},
            4: {},
            5: {},
            6: {}
        },
        stat_escalado: {
            stat_fuente: "CR",
            umbral: 0.50,
            max_buff_umbral: 1.0,
            stat_buff: [
                {
                stat: "Lac",
                razon: 0.005,
                paso: 0.01,
                maxbuff: null
                },
                {
                stat: "CD_Atacante",
                razon: 0.01,
                paso: 0.01,
                maxbuff: 0.50
                },
                {
                stat: "CD_Ruptura",
                razon: 0.01,
                paso: 0.01,
                maxbuff: 0.50
                },
            ],
        },
    },
    "Lighter": {
        ID: 1621,
        Image: "static/SUPPORT/Lighter.webp",
        Clase: "Stunner",
        buffs: {
            0: { Res_Fire: 0.15, Res_Ice: 0.15, Dmg_Fire: 0.25, Dmg_Ice: 0.25},
            1: { Res_Fire: 0.10, Res_Ice: 0.10 },
            2: { Stun: 0.25, Dmg_Fire: 0.15, Dmg_Ice: 0.15 },
            3: {},
            4: {},
            5: {},
            6: {}
        },
        stat_escalado: {
            stat_fuente: "Impact",
            umbral: 170,
            max_buff_umbral: 370,
            stat_buff: [
                {
                stat: "Dmg_Fire",
                razon: 0.0025,
                paso: 1,
                maxbuff: 0.50
                },
                {
                stat: "Dmg_Ice",
                razon: 0.0025,
                paso: 1,
                maxbuff: 0.50
                },
            ],
        },
    },
    "Norma": {
        ID: 1621,
        Image: "static/SUPPORT/Norma.webp",
        Clase: "Stunner",
        buffs: {
            0: { Stun: 0.30, Dmg: 0.20},
            1: { Res: 0.15},
            2: { Stun: 0.30},
            3: {},
            4: {},
            5: {},
            6: {}
        },
    },
    "Dialyn": {
        ID: 1481,
        Image: "static/SUPPORT/Dialyn.webp",
        Clase: "Stunner",
        buffs: {
            0: {Stun: 0.30, Dmg: 0.40},
            1: {Res: 0.15},
            2: {Stun: 0.20, Dmg: 0.15},
            3: {},
            4: {},
            5: {},
            6: {}
        },
    },
    "Koleda": {
        ID: 1621,
        Image: "static/SUPPORT/Koleda.webp",
        Clase: "Stunner",
        buffs: {
            0: {Dmg: 0.35, Dmg_Chain: 0.70, Lac: 0.15, CD_Buff: 0.35},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {}
        },
    },
    "JuFufu": {
        ID: 1391,
        Image: "static/SUPPORT/JuFufu.webp",
        Clase: "Stunner",
        buffs: {
            0: {CD_Buff: 0.20, Dmg_Ultimate: 0.40, Dmg_Chain: 0.20},
            1: {Stun: 0.35},
            2: {CD_Buff: 0.22},
            3: {},
            4: {},
            5: {},
            6: {}
        },
        stat_escalado: {
            stat_fuente: "Atk",
            umbral: 2800,
            max_buff_umbral: 3400,
            stat_buff: [
                {
                stat: "CD_Buff",
                razon: 0.0005,
                paso: 1,
                maxbuff: 0.30
                }
            ],
        },
    },
    "Trigger": {
        ID: 1361,
        Image: "static/SUPPORT/Trigger.webp",
        Clase: "Stunner",
        buffs: {
            0: {Vuln: 0.35},
            1: {Vuln: 0.20},
            2: {CD_Buff: 0.24},
            3: {},
            4: {},
            5: {},
            6: {}
        },
    },
    "Nangong": {
        ID: 1511,
        Image: "static/SUPPORT/Nangong.webp",
        Clase: "Stunner",
        buffs: {
            0: {Atke_Idol: 50, Dmg: 0.25, Stun: 0.30},
            1: {Res: 0.18},
            2: {Stun: 0.30},
            3: {},
            4: {},
            5: {},
            6: {}
        },
    },
    "Qingyi": {
        ID: 1251,
        Image: "static/SUPPORT/Qingyi.webp",
        Clase: "Stunner",
        buffs: {
            0: {Stun: 0.80},
            1: {Shred: 0.15},
            2: {Stun: 0.28},
            3: {},
            4: {},
            5: {},
            6: {}
        },
    },
    "Lycaon": {
        ID: 1251,
        Image: "static/SUPPORT/Lycaon.webp",
        Clase: "Stunner",
        buffs: {
            0: {Res_Ice: 0.25, Dmg_Fire: 0.30, Dmg_Electric: 0.30, Dmg_Ether: 0.30, Dmg_Physical: 0.30, Dmg_Wind: 0.30, Stun: 0.35},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {}
        },
    },

    // Stunner A-Rank
    "Pulchra": {
        ID: 1351,
        Image: "static/SUPPORT/Pulchra.webp",
        Clase: "Stunner",
        buffs: {
            0: {Dmg_Aftershock: 0.30},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {Dmg_Aftershock: -0.30, Dmg: 0.30}
        },
    },
    "Anby": {
        ID: 1011,
        Image: "static/SUPPORT/Anby.webp",
        Clase: "Stunner",
        buffs: {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {}
        },
    },

    // Anomalo
    "Velina": {
        ID: 1621,
        Image: "static/SUPPORT/Velina.webp",
        Clase: "Anomalo",
        buffs: {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {}
        },
    },
    "Remielle": {
        ID: 1621,
        Image: "static/SUPPORT/Remielle.webp",
        Clase: "Anomalo",
        buffs: {
            0: {Dmg: 0.18, Ref: 0.10, Atke: 1600},
            1: {Admg: 0.10},
            2: {Ref: 0.20, Shred:0.15},
            3: {},
            4: {},
            5: {},
            6: {}
        },
         stat_escalado: {
            stat_fuente: "MA",
            umbral: 0,
            max_buff_umbral: 1000,
            stat_buff: [
                {
                stat: "Ref",
                razon: 0.0002,
                paso: 1,
                maxbuff: null
                },
            ],
        },
    },
    
    
};

export default supp
