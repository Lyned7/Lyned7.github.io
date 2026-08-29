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
    "Deep Sea Visitor": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Deep_Sea_Visitor.webp",
        Stats_base: { Atk: 713},
        Stats_main: { CR_Base: 0.24},
        buffs: {
            1: { CR: 0.20, Dmg_Ice: 0.25},
            2: { CR: 0.05, Dmg_Ice: 0.065}, 
            3: { CR: 0.05, Dmg_Ice: 0.065},
            4: { CR: 0.05, Dmg_Ice: 0.065},
            5: { CR: 0.05, Dmg_Ice: 0.065}
        }
    },
    "Zanshin Herb Case": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Zanshin_Herb_Case.webp",
        Stats_base: { Atk: 713},
        Stats_main: { CD_Base: 0.48},
        buffs: {
            1: { CR: 0.20, Dmg_Electric_Dash: 0.40},
            2: { CR: 0.03, Dmg_Electric_Dash: 0.06}, 
            3: { CR: 0.03, Dmg_Electric_Dash: 0.06},
            4: { CR: 0.03, Dmg_Electric_Dash: 0.06},
            5: { CR: 0.03, Dmg_Electric_Dash: 0.06} 
        }
    },
    "Myriad Eclipse": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Myriad_Eclipse.webp",
        Stats_base: { Atk: 713},
        Stats_main: { CR_Base: 0.24},
        buffs: {
            1: { CD: 0.45, Shred_Ice: 0.25},
            2: { CD: 0.0675, Shred_Ice: 0.0375}, 
            3: { CD: 0.0675, Shred_Ice: 0.0375},
            4: { CD: 0.0675, Shred_Ice: 0.0375},
            5: { CD: 0.0675, Shred_Ice: 0.0375} 
        }
    },
    "Steel Cushion": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Steel_Cushion.webp",
        Stats_base: { Atk: 684},
        Stats_main: { CR_Base: 0.24},
        buffs: {
            1: { Dmg_Physical: 0.20, Dmg: 0.25},
            2: { Dmg_Physical: 0.05, Dmg: 0.065}, 
            3: { Dmg_Physical: 0.05, Dmg: 0.065},
            4: { Dmg_Physical: 0.05, Dmg: 0.06},
            5: { Dmg_Physical: 0.05, Dmg: 0.06} 
        }
    },


    // Atacante A-Rank
    "Starlight Engine Replica": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Starlight_Engine_Replica.webp",
        Stats_base: { Atk: 624},
        Stats_main: { Atkx: 0.25},
        buffs: {
            1: { Dmg: 0.36},
            2: { Dmg: 0.05}, 
            3: { Dmg: 0.055},
            4: { Dmg: 0.055},
            5: { Dmg: 0.055}
        }
    },
    "Housekeeper": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Housekeeper.webp",
        Stats_base: { Atk: 624},
        Stats_main: { Atkx: 0.25},
        buffs: {
            1: { Dmg_Ex: 0.45},
            2: { Dmg_Ex: 0.075}, 
            3: { Dmg_Ex: 0.075},
            4: { Dmg_Ex: 0.06},
            5: { Dmg_Ex: 0.06}
        }
    },
    "Drill Rig": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Drill_Rig.webp",
        Stats_base: { Atk: 624},
        Stats_main: { ERx: 0.50},
        buffs: {
            1: { Dmg_Basic: 0.50},
            2: { Dmg_Basic: 0.075}, 
            3: { Dmg_Basic: 0.075},
            4: { Dmg_Basic: 0.075},
            5: { Dmg_Basic: 0.075}
        }
    },
    "Cannon Rotor": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Cannon_Rotor.webp",
        Stats_base: { Atk: 594},
        Stats_main: { CR_Base: 0.20},
        buffs: {
            1: { Atkf: 0.075},
            2: { Atkf: 0.011}, 
            3: { Atkf: 0.011},
            4: { Atkf: 0.011},
            5: { Atkf: 0.012}
        }
    },
    "Marcato Desire": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Marcato_Desire.webp",
        Stats_base: { Atk: 594},
        Stats_main: { CR_Base: 0.20},
        buffs: {
            1: { Atkf: 0.12},
            2: { Atkf: 0.018}, 
            3: { Atkf: 0.018},
            4: { Atkf: 0.018},
            5: { Atkf: 0.018}
        }
    },
    "Gilded Blossom": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Gilded_Blossom.webp",
        Stats_base: { Atk: 594},
        Stats_main: { Atkx: 0.25},
        buffs: {
            1: { Atkf: 0.06, Dmg_Ex: 0.15},
            2: { Atkf: 0.09, Dmg_Ex: 0.022}, 
            3: { Atkf: 0.09, Dmg_Ex: 0.022},
            4: { Atkf: 0.09, Dmg_Ex: 0.022},
            5: { Atkf: 0.09, Dmg_Ex: 0.022}
        }
    },
    "Starlight Engine": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Starlight_Engine.webp",
        Stats_base: { Atk: 594},
        Stats_main: { Atkx: 0.25},
        buffs: {
            1: { Atkf: 0.12},
            2: { Atkf: 0.018}, 
            3: { Atkf: 0.018},
            4: { Atkf: 0.018},
            5: { Atkf: 0.018}
        }
    },
    "Street Superstar": {
        ID: 14104,
        Clase: "Atacante",
        Image: "static/WENGINE/Street_Superstar.webp",
        Stats_base: { Atk: 594},
        Stats_main: { Atkx: 0.25},
        buffs: {
            1: { Dmg_Ultimate: 0.45},
            2: { Dmg_Ultimate: 0.066}, 
            3: { Dmg_Ultimate: 0.069},
            4: { Dmg_Ultimate: 0.066},
            5: { Dmg_Ultimate: 0.069}
        }
    },

    // Anomalo
    "Hailstorm Shrine": {
        ID: 14104,
        Clase: "Anomalo",
        Image: "static/WENGINE/Hailstorm_Shrine.webp",
        Stats_base: { Atk: 743 },
        Stats_main: { CR_Base: 0.24 },
        buffs: {
            1: { CD: 0.50, Dmg_Ice: 0.40},
            2: { CD: 0.07, Dmg_Ice: 0.06}, 
            3: { CD: 0.08, Dmg_Ice: 0.06},
            4: { CD: 0.07, Dmg_Ice: 0.06},
            5: { CD: 0.08, Dmg_Ice: 0.06}
        }
    },
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
    "Ode of Resurrected Wings": {
        ID: 14104,
        Clase: "Anomalo",
        Image: "static/WENGINE/Ode_of_Resurrected_Wings.webp",
        Stats_base: { Atk: 743 },
        Stats_main: { Atkx: 0.36 },
        buffs: {
            1: { MA: 96, Admg: 0.20, Dmg: 0.30},
            2: { MA: 9, Admg: 0.03, Dmg: 0.045}, 
            3: { MA: 10, Admg: 0.03, Dmg: 0.045},
            4: { MA: 10, Admg: 0.03, Dmg: 0.045},
            5: { MA: 10, Admg: 0.03, Dmg: 0.045}
        }
    },
    "Flamemaker Shaker": {
        ID: 14104,
        Clase: "Anomalo",
        Image: "static/WENGINE/Flamemaker_Shaker.webp",
        Stats_base: { Atk: 713 },
        Stats_main: { Atkx: 0.30 },
        buffs: {
            1: { Dmg: 0.35, MA: 50},
            2: { Dmg: 0.09, MA: 12}, 
            3: { Dmg: 0.08, MA: 13},
            4: { Dmg: 0.09, MA: 12},
            5: { Dmg: 0.08, MA: 13}
        }
    },
    "Fusion Compiler": {
        ID: 14104,
        Clase: "Anomalo",
        Image: "static/WENGINE/Fusion_Compiler.webp",
        Stats_base: { Atk: 684 },
        Stats_main: { Penx: 0.24 },
        buffs: {
            1: { Atkf: 0.12, MA: 75},
            2: { Atkf: 0.03, MA: 18}, 
            3: { Atkf: 0.03, MA: 18},
            4: { Atkf: 0.03, MA: 18},
            5: { Atkf: 0.03, MA: 21}
        }
    },
    "Frostfall Sickle": {
        ID: 14104,
        Clase: "Anomalo",
        Image: "static/WENGINE/Frostfall_Sickle.webp",
        Stats_base: { Atk: 713 },
        Stats_main: { Tasax: 0.30 },
        buffs: {
            1: { Dmg_Ice: 0.40, Dmg_Abloom: 0.35},
            2: { Dmg_Ice: 0.06, Dmg_Abloom: 0.035}, 
            3: { Dmg_Ice: 0.06, Dmg_Abloom: 0.035},
            4: { Dmg_Ice: 0.06, Dmg_Abloom: 0.035},
            5: { Dmg_Ice: 0.06, Dmg_Abloom: 0.045}
        }
    },
    "Joyau Dore": {
        ID: 14104,
        Clase: "Anomalo",
        Image: "static/WENGINE/Joyau_Dore.webp",
        Stats_base: { Atk: 713 },
        Stats_main: { ERx: 0.60 },
        buffs: {
            1: { MA: 130, Dmg_Wind: 0.14},
            2: { MA: 19, Dmg_Wind: 0.02}, 
            3: { MA: 19, Dmg_Wind: 0.02},
            4: { MA: 19, Dmg_Wind: 0.02},
            5: { MA: 19, Dmg_Wind: 0.02}
        }
    },
    "Flight of Fancy": {
        ID: 14104,
        Clase: "Anomalo",
        Image: "static/WENGINE/Flight_of_Fancy.webp",
        Stats_base: { Atk: 713 },
        Stats_main: { MA_Base: 90 },
        buffs: {
            1: { MA: 120},
            2: { MA: 18}, 
            3: { MA: 18},
            4: { MA: 18},
            5: { MA: 18}
        }
    },
    "Timeweaver": {
        ID: 14104,
        Clase: "Anomalo",
        Image: "static/WENGINE/Timeweaver.webp",
        Stats_base: { Atk: 713 },
        Stats_main: { Atkx: 0.30 },
        buffs: {
            1: { MA: 75},
            2: { MA: 10}, 
            3: { MA: 10},
            4: { MA: 10},
            5: { MA: 10}
        }
    },

    // Anomalo A-rank
    "Roaring Ride": {
        ID: 14104,
        Clase: "Anomalo",
        Image: "static/WENGINE/Roaring_Ride.webp",
        Stats_base: { Atk: 624 },
        Stats_main: { Atkx: 0.25 },
        buffs: {
            1: { Atkf: 0.08, MA: 40},
            2: { Atkf: 0.012, MA: 6}, 
            3: { Atkf: 0.012, MA: 6},
            4: { Atkf: 0.012, MA: 6},
            5: { Atkf: 0.012, MA: 6}
        }
    },
    "Boisterous Echoes": {
        ID: 14104,
        Clase: "Anomalo",
        Image: "static/WENGINE/Boisterous_Echoes.webp",
        Stats_base: { Atk: 594 },
        Stats_main: { MA_Base: 75 },
        buffs: {
            1: { Dmg: 0.115},
            2: { Dmg: 0.017}, 
            3: { Dmg: 0.018},
            4: { Dmg: 0.017},
            5: { Dmg: 0.017}
        }
    },
    "Electro-Lip Gloss": {
        ID: 14104,
        Clase: "Anomalo",
        Image: "static/WENGINE/ElectroLip_Gloss.webp",
        Stats_base: { Atk: 594 },
        Stats_main: { MA_Base: 75 },
        buffs: {
            1: { Atkf: 0.10, Dmg: 0.15},
            2: { Atkf: 0.015, Dmg: 0.025}, 
            3: { Atkf: 0.015, Dmg: 0.025},
            4: { Atkf: 0.015, Dmg: 0.025},
            5: { Atkf: 0.015, Dmg: 0.025}
        }
    },
    "Weeping Gemini": {
        ID: 14104,
        Clase: "Anomalo",
        Image: "static/WENGINE/Weeping_Gemini.webp",
        Stats_base: { Atk: 594 },
        Stats_main: { Atkx: 0.25 },
        buffs: {
            1: { MA: 120},
            2: { MA: 16}, 
            3: { MA: 16},
            4: { MA: 16},
            5: { MA: 24}
        }
    },
    "Rainforest Gourmet": {
        ID: 14104,
        Clase: "Anomalo",
        Image: "static/WENGINE/Rainforest_Gourmet.webp",
        Stats_base: { Atk: 594 },
        Stats_main: { MA_Base: 75 },
        buffs: {
            1: { Atkf: 0.25},
            2: { Atkf: 0.03}, 
            3: { Atkf: 0.04},
            4: { Atkf: 0.04},
            5: { Atkf: 0.04}
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
            1: { CR: 0.20, Dmg_Ether: 0.16, Rdmg_Ultimate: 0.10},
            2: { Dmg_Physical: 0.09}, 
            3: { Dmg_Physical: 0.09},
            4: { Dmg_Physical: 0.09},
            5: { Dmg_Physical: 0.09}
        }
    },
    "Wrathful Vajra": {
        ID: 14104,
        Clase: "Ruptura",
        Image: "static/WENGINE/Wrathful_Vajra.webp",
        Stats_base: { Atk: 713 },
        Stats_main: { Hpx: 0.30 },
        buffs: {
            1: { CR: 0.20, Rdmg_Fire: 0.18},
            2: { CR: 0.03, Rdmg_Fire: 0.027}, 
            3: { CR: 0.03, Rdmg_Fire: 0.027},
            4: { CR: 0.03, Rdmg_Fire: 0.027},
            5: { CR: 0.03, Rdmg_Fire: 0.027}
        }
    },
    "Starlight Rider Faceplate": {
        ID: 14104,
        Clase: "Ruptura",
        Image: "static/WENGINE/Starlight_Rider_Faceplate.webp",
        Stats_base: { Atk: 713 },
        Stats_main: { Hpx: 0.30 },
        buffs: {
            1: { CR: 0.20, Rdmg_Physical: 0.20},
            2: { CR: 0.03, Rdmg_Physical: 0.03}, 
            3: { CR: 0.03, Rdmg_Physical: 0.03},
            4: { CR: 0.03, Rdmg_Physical: 0.03},
            5: { CR: 0.03, Rdmg_Physical: 0.03}
        }
    },
    "Krakens Cradle": {
        ID: 14104,
        Clase: "Ruptura",
        Image: "static/WENGINE/Krakens_Cradle.webp",
        Stats_base: { Atk: 713 },
        Stats_main: { Hpx: 0.30 },
        buffs: {
            1: { CR: 0.20, Rdmg_Ice: 0.18},
            2: { CR: 0.03, Rdmg_Fire: 0.03}, 
            3: { CR: 0.03, Rdmg_Fire: 0.03},
            4: { CR: 0.03, Rdmg_Fire: 0.03},
            5: { CR: 0.03, Rdmg_Fire: 0.03}
        }
    },

    // Ruptura A-Rank
    "Grill O-Wisp": {
        ID: 14104,
        Clase: "Ruptura",
        Image: "static/WENGINE/Grill_OWisp.webp",
        Stats_base: { Atk: 624 },
        Stats_main: { Hpx: 0.25 },
        buffs: {
            1: { CR: 0.15, Dmg_Fire: 0.15},
            2: { CR: 0.0225, Dmg_Fire: 0.0225}, 
            3: { CR: 0.0225, Dmg_Fire: 0.0225},
            4: { CR: 0.0225, Dmg_Fire: 0.0225},
            5: { CR: 0.0225, Dmg_Fire: 0.0225}
        }
    },
    "Cauldron of Clarity": {
        ID: 14104,
        Clase: "Ruptura",
        Image: "static/WENGINE/Cauldron_of_Clarity.webp",
        Stats_base: { Atk: 594 },
        Stats_main: { Hpx: 0.25 },
        buffs: {
            1: { CR: 0.065, Dmg: 0.12},
            2: { CR: 0.01, Dmg: 0.018}, 
            3: { CR: 0.01, Dmg: 0.018},
            4: { CR: 0.009, Dmg: 0.018},
            5: { CR: 0.01, Dmg: 0.018}
        }
    },
    "Radiowave Journey": {
        ID: 14104,
        Clase: "Ruptura",
        Image: "static/WENGINE/Radiowave_Journey.webp",
        Stats_base: { Atk: 594 },
        Stats_main: { Hpx: 0.25 },
        buffs: {
            1: { Sheere: 240},
            2: { Sheere: 36}, 
            3: { Sheere: 36},
            4: { Sheere: 36},
            5: { Sheere: 36}
        }
    },
    "Puzzle Sphere": {
        ID: 14104,
        Clase: "Ruptura",
        Image: "static/WENGINE/Puzzle_Sphere.webp",
        Stats_base: { Atk: 594 },
        Stats_main: { Atkx: 0.25 },
        buffs: {
            1: { CD: 0.16, Dmg_Ex: 0.20},
            2: { CD: 0.024, Dmg_Ex: 0.03}, 
            3: { CD: 0.024, Dmg_Ex: 0.03},
            4: { CD: 0.024, Dmg_Ex: 0.03},
            5: { CD: 0.024, Dmg_Ex: 0.03}
        }
    },


};

export default we_dps
