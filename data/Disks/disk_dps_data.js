// DISKS

const disk_dps = {
    // A
    "Astral Voice": {
        ID: 3284,
        Image: "static/DISKS/Astral_Voice.webp",
        buffs_2pc: { Atkx: 0.10 },
        buffs_4pc: { Dmg: 0.24}
    },

    // B
    "Branch & Blade Song": {
        ID: 3274,
        Image: "static/DISKS/Branch_&_Blade_Song.webp",
        buffs_2pc: { CD: 0.16},
        buffs_4pc: { CD: 0.30, CR: 0.12}
    },
    "Bunny in Wonderland": {
        ID: 3374,
        Image: "static/DISKS/Bunny_in_Wonderland.webp",
        buffs_2pc: { Hpx: 0.10},
        buffs_4pc: { Dmg: 0.18}
    },

    // C
    "Chaos Jazz": {
        ID: 3184,
        Image: "static/DISKS/Chaos_Jazz.webp",
        buffs_2pc: { MA: 30},
        buffs_4pc: { Dmg_Fire: 0.15, Dmg_Electric: 0.15, Dmg_Ex: 0.20}
    },
    "Chaotic Metal": {
        ID: 3234,
        Image: "static/DISKS/Chaotic_Metal.webp",
        buffs_2pc: { Dmg_Ether: 0.10},
        buffs_4pc: { CD: 0.53}
    },

    // D
    "Dawns Bloom": {
        ID: 3334,
        Image: "static/DISKS/Dawns_Bloom.webp",
        buffs_2pc: { Dmg_Basic: 0.15},
        buffs_4pc: { Dmg_Basic: 0.40}
    },

    // F
    "Fanged Metal": {
        ID: 3264,
        Image: "static/DISKS/Fanged_Metal.webp",
        buffs_2pc: { Dmg_Physical: 0.10},
        buffs_4pc: { Dmg_Physical: 0.35}
    },
    "Feathered Fate": {
        ID: 3414,
        Image: "static/DISKS/Feathered_Fate.webp",
        buffs_2pc: { MA: 30 },
        buffs_4pc: { MA: 50, Admg_Lumen: 0.15 }
    },
    "Freedom Blues": {
        ID: 3134,
        Image: "static/DISKS/Freedom_Blues.webp",
        buffs_2pc: { MA: 30 },
        buffs_4pc: {}
    },

    // H
    "Hormone Punk": {
        ID: 3144,
        Image: "static/DISKS/Hormone_Punk.webp",
        buffs_2pc: { Atkx: 0.10 },
        buffs_4pc: { Atkf: 0.25}
    },

    // I
    "Inferno Metal": {
        ID: 3224,
        Image: "static/DISKS/Inferno_Metal.webp",
        buffs_2pc: { Dmg_Fire: 0.10 },
        buffs_4pc: { CR: 0.28}
    },

    // K
    "King of the Summit": {
        ID: 3324,
        Image: "static/DISKS/King_of_the_Summit.webp",
        buffs_2pc: { Dazex: 0.06 },
        buffs_4pc: { CD: 0.30}
    },

    // M
    "Moonlight Lullaby": {
        ID: 3344,
        Image: "static/DISKS/Moonlight_Lullaby.webp",
        buffs_2pc: { ERx: 0.20 },
        buffs_4pc: { Dmg: 0.18}
    },

    // N
    "Notes From the Chained": {
        ID: 3384,
        Image: "static/DISKS/Notes_From_the_Chained.webp",
        buffs_2pc: { Dmg_Ice: 0.10 },
        buffs_4pc: { MA: 48, Admg: 0.16}
    },

    // P
    "Phaethons Melody": {
        ID: 3304,
        Image: "static/DISKS/Phaethons_Melody.webp",
        buffs_2pc: { Tasax: 0.08},
        buffs_4pc: { MA: 45, Dmg_Ether: 0.25}
    },
    "Polar Metal": {
        ID: 3254,
        Image: "static/DISKS/Polar_Metal.webp",
        buffs_2pc: { Dmg_Ice: 0.10 },
        buffs_4pc: { Dmg_Basic: 0.40, Dmg_Dash: 0.40}
    },
    "Proto Punk": {
        ID: 3194,
        Image: "static/DISKS/Proto_Punk.webp",
        buffs_2pc: {},
        buffs_4pc: { Dmg: 0.15}
    },
    "Puffer Electro": {
        ID: 3114,
        Image: "static/DISKS/Puffer_Electro.webp",
        buffs_2pc: { Penx: 0.08 },
        buffs_4pc: { Dmg_Ultimate: 0.20, Atkf: 0.15 }
    },

    // S
    "Shadow Harmony": {
        ID: 3294,
        Image: "static/DISKS/Shadow_Harmony.webp",
        buffs_2pc: { Dmg_Aftershock: 0.15, Dmg_Dash: 0.15 },
        buffs_4pc: { Atkf: 0.12, CR: 0.12 }
    },
    "Shining Aria": {
        ID: 3364,
        Image: "static/DISKS/Shining_Aria.webp",
        buffs_2pc: { Dmg_Ether: 0.10},
        buffs_4pc: { MA: 36, Dmg: 0.25 }
    },
    "Shockstar Disco": {
        ID: 3124,
        Image: "static/DISKS/Shockstar_Disco.webp",
        buffs_2pc: { Impactx: 0.06},
        buffs_4pc: {}
    },
    "Soul Rock": {
        ID: 3154,
        Image: "static/DISKS/Soul_Rock.webp",
        buffs_2pc: { Defx: 0.06},
        buffs_4pc: {}
    },
    "Swing Jazz": {
        ID: 3164,
        Image: "static/DISKS/Swing_Jazz.webp",
        buffs_2pc: { ERx: 0.20},
        buffs_4pc: { Dmg: 0.15}
    },

    // T
    "The Sky Ablaze": {
        ID: 3404,
        Image: "static/DISKS/The_Sky_Ablaze.webp",
        buffs_2pc: { Dmg_Ether: 0.10 },
        buffs_4pc: { CD_Ether: 0.30, Atkf: 0.10 }
    },
    "Thorned Rose": {
        ID: 3424,
        Image: "static/DISKS/Thorned_Rose.webp",
        buffs_2pc: { MA: 30 },
        buffs_4pc: { MA: 50, Admg: 0.15 }
    },
    "Thunder Metal": {
        ID: 3244,
        Image: "static/DISKS/Thunder_Metal.webp",
        buffs_2pc: { Dmg_Electric: 0.10 },
        buffs_4pc: { Atkf: 0.28 }   
    },
    
    //W
    "White Water Ballad": {
        ID: 3354,
        Image: "static/DISKS/White_Water_Ballad.webp",
        buffs_2pc: { Dmg_Physical: 0.10},
        buffs_4pc: { CR: 0.20, Atkf: 0.10}
    },
    "Woodpecker Electro": {
        ID: 3104,
        Image: "static/DISKS/Woodpecker_Electro.webp",
        buffs_2pc: { CR: 0.08 },
        buffs_4pc: { Atkf: 0.27 }
    },
    "Wuthering Salon": {
        ID: 3394,
        Image: "static/DISKS/Wuthering_Salon.webp",
        buffs_2pc: { Dmg_Wind: 0.10 },
        buffs_4pc: { MA: 50, Dmg: 0.18 }
    },
    
    //Y
    "Yunkui Tales": {
        ID: 3314,
        Image: "static/DISKS/Yunkui_Tales.webp",
        buffs_2pc: { Hpx: 0.10},
        buffs_4pc: { CR: 0.12, Rdmg: 0.10}
    },
    
};

export default disk_dps
