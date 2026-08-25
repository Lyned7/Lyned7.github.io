const we_dps = {
    "Crimson Thirst": {
        ID: 14161,
        Clase: "Armorer",
        Image: "static/WENGINE/Crimson_Thirst.webp",
        Stats_base: { Def: 431 },
        Stats_main: { Defx: 0.48 },
        buffs: {
            0: { CR: 0.25, Dmg_Electric: 0.15, Sdmg: 0.12 },
            1: { CR: 0.025, Dmg_Electric: 0.025, Sdmg: 0.02 }, 
            2: { CR: 0.025, Dmg_Electric: 0.025, Sdmg: 0.02 },
            3: { CR: 0.025, Dmg_Electric: 0.025, Sdmg: 0.02 },
            4: { CR: 0.025, Dmg_Electric: 0.025, Sdmg: 0.02 }
        }
    },
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
        Stats_main: { CD: 0.48 },
        buffs: {
            1: { Res_Physical: 0.20, Dmg_Physical: 0.25, CD_Physical: 0.25},
            2: { Res_Physical: 0.02, Dmg_Physical: 0.037, CD_Physical: 0.037}, 
            3: { Res_Physical: 0.02, Dmg_Physical: 0.038, CD_Physical: 0.038},
            4: { Res_Physical: 0.02, Dmg_Physical: 0.037, CD_Physical: 0.037},
            5: { Res_Physical: 0.02, Dmg_Physical: 0.038, CD_Physical: 0.038}
        }
    },
    "Sharpened Stinger": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Sharpened_Stinger.webp",
        Stats_base: { Atk: 713 },
        Stats_main: { MA: 90 },
        buffs: {
            1: { Dmg_Physical: 0.36},
            2: { Dmg_Physical: 0.09}, 
            3: { Dmg_Physical: 0.09},
            4: { Dmg_Physical: 0.09},
            5: { Dmg_Physical: 0.09}
        }
    },
    "Qingming Birdcage": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Qingming_Birdcage.webp",
        Stats_base: { Atk: 743 },
        Stats_main: { Hpx: 0.30 },
        buffs: {
            1: { CR: 0.20, Dmg_Ether: 0.16, Rdmg_Ultimate: 0.10},
            2: { Dmg_Physical: 0.09}, 
            3: { Dmg_Physical: 0.09},
            4: { Dmg_Physical: 0.09},
            5: { Dmg_Physical: 0.09}
        }
    },
};

export default we_dps