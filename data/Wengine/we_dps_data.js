const we_dps = {

    // Atacante
    "Brimstone": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Brimstone.webp",
        Stats_base: { Atk: 684 },
        Stats_main: { Atkx: 0.30 },
        buffs: {
            1: { Atkf: 0.28},
            2: { Atkf: 0.072}, 
            3: { Atkf: 0.064},
            4: { Atkf: 0.064},
            5: { Atkf: 0.08}
        }
    },
    "Cloudcleave Radiance": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Cloudcleave_Radiance.webp",
        Stats_base: { Atk: 743 },
        Stats_main: { CD_Base: 0.48 },
        buffs: {
            1: { Res_Physical: 0.20, Dmg_Physical: 0.25, CD_Physical: 0.25},
            2: { Res_Physical: 0.02, Dmg_Physical: 0.037, CD_Physical: 0.037}, 
            3: { Res_Physical: 0.02, Dmg_Physical: 0.038, CD_Physical: 0.038},
            4: { Res_Physical: 0.02, Dmg_Physical: 0.037, CD_Physical: 0.037},
            5: { Res_Physical: 0.02, Dmg_Physical: 0.038, CD_Physical: 0.038}
        }
    },
    "Serpentine Seeker": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Serpentine_Seeker.webp",
        Stats_base: { Atk: 713},
        Stats_main: { ERx: 0.60 },
        buffs: {
            1: { CR: 0.25, Shred_Electric: 0.28},
            2: { CR: 0.038, Shred_Electric: 0.035}, 
            3: { CR: 0.037, Shred_Electric: 0.035},
            4: { CR: 0.038, Shred_Electric: 0.035},
            5: { CR: 0.037, Shred_Electric: 0.035}
        }
    },
    "Severed Innocence": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Severed_Innocence.webp",
        Stats_base: { Atk: 713},
        Stats_main: { CD_Base: 0.48 },
        buffs: {
            1: { CD: 0.60, Dmg_Electric: 0.20},
            2: { CD: 0.09, Dmg_Electric: 0.03}, 
            3: { CD: 0.09, Dmg_Electric: 0.03},
            4: { CD: 0.09, Dmg_Electric: 0.03},
            5: { CD: 0.09, Dmg_Electric: 0.03}
        }
    },
    "Heartstring Nocturne": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Heartstring_Nocturne.webp",
        Stats_base: { Atk: 713},
        Stats_main: { CR_Base: 0.24 },
        buffs: {
            1: { CD: 0.50, Res_Fire_Chain: 0.25, Res_Fire_Ultimate: 0.25},
            2: { CD: 0.075, Res_Fire_Chain: 0.04, Res_Fire_Ultimate: 0.04}, 
            3: { CD: 0.075, Res_Fire_Chain: 0.04, Res_Fire_Ultimate: 0.04},
            4: { CD: 0.075, Res_Fire_Chain: 0.04, Res_Fire_Ultimate: 0.04},
            5: { CD: 0.075, Res_Fire_Chain: 0.03, Res_Fire_Ultimate: 0.03}
        }
    },
    "Cordis Germina": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Cordis_Germina.webp",
        Stats_base: { Atk: 713},
        Stats_main: { CR_Base: 0.24 },
        buffs: {
            1: { CR: 0.15, Dmg_Electric: 0.25, Shred_Ultimate: 0.20, Shred_Basic: 0.20},
            2: { CR: 0.02, Dmg_Electric: 0.04, Shred_Ultimate: 0.03, Shred_Basic: 0.03}, 
            3: { CR: 0.02, Dmg_Electric: 0.04, Shred_Ultimate: 0.03, Shred_Basic: 0.03},
            4: { CR: 0.02, Dmg_Electric: 0.04, Shred_Ultimate: 0.03, Shred_Basic: 0.03},
            5: { CR: 0.02, Dmg_Electric: 0.03, Shred_Ultimate: 0.03, Shred_Basic: 0.03}
        }
    },
    "Bellicose Blaze": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Bellicose_Blaze.webp",
        Stats_base: { Atk: 713},
        Stats_main: { ERx: 0.60 },
        buffs: {
            1: { CR: 0.20, Shred_Fire_Aftershock: 0.30},
            2: { CR: 0.03, Shred_Fire_Aftershock: 0.044}, 
            3: { CR: 0.03, Shred_Fire_Aftershock: 0.046},
            4: { CR: 0.03, Shred_Fire_Aftershock: 0.044},
            5: { CR: 0.03, Shred_Fire_Aftershock: 0.046}
        }
    },
    "Sol_Exuvia": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Sol_Exuvia.webp",
        Stats_base: { Atk: 713},
        Stats_main: { Atkx: 0.30 },
        buffs: {
            1: { CR: 0.20, Res_Ether: 0.16},
            2: { CR: 0.20, Res_Ether: 0.015}, 
            3: { CR: 0.20, Res_Ether: 0.015},
            4: { CR: 0.20, Res_Ether: 0.015},
            5: { CR: 0.20, Res_Ether: 0.015}
        }
    },
    "Riot Suppressor Mark VI": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Riot_Suppressor_Mark_VI.webp",
        Stats_base: { Atk: 713},
        Stats_main: { CD_Base: 0.48},
        buffs: {
            1: { CR: 0.15, Dmg_Basic: 0.35},
            2: { CR: 0.038, Dmg_Basic: 0.085}, 
            3: { CR: 0.038, Dmg_Basic: 0.085},
            4: { CR: 0.038, Dmg_Basic: 0.085},
            5: { CR: 0.036, Dmg_Basic: 0.095}
        }
    },

    // Anomalo
    "Sharpened Stinger": {
        ID: 14104,
        Clase: "Anomalo",
        Image: "static/WENGINE/Sharpened_Stinger.webp",
        Stats_base: { Atk: 713 },
        Stats_main: { MA_Base: 90 },
        buffs: {
            1: { Dmg_Physical: 0.36},
            2: { Dmg_Physical: 0.09}, 
            3: { Dmg_Physical: 0.09},
            4: { Dmg_Physical: 0.09},
            5: { Dmg_Physical: 0.09}
        }
    },
    "Practiced Perfection": {
        ID: 14104,
        Clase: "Anomalo",
        Image: "static/WENGINE/Practiced_Perfection.webp",
        Stats_base: { Atk: 713 },
        Stats_main: { Atkx: 0.30 },
        buffs: {
            1: { Tasae: 60, Dmg_Physical: 0.40},
            2: { Tasae: 9, Dmg_Physical: 0.06}, 
            3: { Tasae: 9, Dmg_Physical: 0.06},
            4: { Tasae: 9, Dmg_Physical: 0.06},
            5: { Tasae: 9, Dmg_Physical: 0.06}
        }
    },
    "Angel in the Shell": {
        ID: 14104,
        Clase: "Anomalo",
        Image: "static/WENGINE/Angel_in_the_Shell.webp",
        Stats_base: { Atk: 713 },
        Stats_main: { Tasax: 0.30 },
        buffs: {
            1: { MA: 90, Dmg: 0.20, Admg: 0.10},
            2: { MA: 13, Dmg: 0.03, Admg: 0.015}, 
            3: { MA: 14, Dmg: 0.03, Admg: 0.015},
            4: { MA: 13, Dmg: 0.03, Admg: 0.015},
            5: { MA: 14, Dmg: 0.03, Admg: 0.015}
        }
    },

    // Ruptura
    "Qingming Birdcage": {
        ID: 14104,
        Clase: "Ruptura",
        Image: "static/WENGINE/Qingming_Birdcage.webp",
        Stats_base: { Atk: 743 },
        Stats_main: { Hpx: 0.30 },
        buffs: {
            1: { CR: 0.20, Dmg_Ether: 0.16, Rdmg_Ultimate: 0.20},
            2: { CR: 0.03, Dmg_Ether: 0.024, Rdmg_Ultimate: 0.03}, 
            3: { CR: 0.03, Dmg_Ether: 0.024, Rdmg_Ultimate: 0.03},
            4: { CR: 0.03, Dmg_Ether: 0.024, Rdmg_Ultimate: 0.03},
            5: { CR: 0.03, Dmg_Ether: 0.024, Rdmg_Ultimate: 0.03}
        }
    },
};

export default we_dps
