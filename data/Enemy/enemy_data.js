// ENEMIES

const enemy = {
    "Phaethon": {
        def_enemy: { Defense: 952 },
        buffs_enemy: { Res_Electric: 0.2, Res_Physical: -0.2, Sdmg: 0.40},
        buffs_stunned: { Stun: 0.20},
        Image: "static/ENEMY/Phaethon.webp"
    },
    "Kusarikku": {
        def_enemy: { Defense: 952 },
        buffs_enemy: { Res_Electric: 0.2, Res_Fire: 0.2, Res_Ice: -0.2, Taken_Anomalo: -0.40, Sdmg: 0.40},
        buffs_stunned: {},
        Image: "static/ENEMY/Kusarikku.webp"
    },
    "Girtablullu": {
        def_enemy: { Defense: 952 },
        buffs_enemy: {Admg: 0.16, MA: 60},
        buffs_stunned: {},
        Image: "static/ENEMY/Girtablullu.webp"
    },
    "Ye Shiyuan": {
        def_enemy: { Defense: 952 },
        buffs_enemy: { Res_Wind: 0.2, Res_Ice: 0.2, Res_Physical: 0.2, Res_Electric: -0.2, Shred: 0.24},
        buffs_stunned: { CD: 0.50},
        Image: "static/ENEMY/YeShiyuan.webp"
    },
    "Sweeper": {
        def_enemy: { Defense: 476 },
        buffs_enemy: { Res_Ice: 0.20, Res_Physical: -0.20, Res: 0.10, Atkf_Atacante: 0.20, Penx_Atacante: 0.25, CD_Ice: 0.60, CD_Ether: 0.60, MA: 40, Admg: 0.30},
        buffs_stunned: {},
        Image: "static/ENEMY/Sweeper.webp"
    },
    "Butcher": {
        def_enemy: { Defense: 952 },
        buffs_enemy: { Res_Ether: 0.20, Res_Ice: 0.20, CD: 0.75, Admg: 0.45},
        buffs_stunned: {},
        Image: "static/ENEMY/Dead_End_Butcher.webp"
    },
    "Sarah": {
        def_enemy: { Defense: 476 },
        buffs_enemy: { Res_Physical: 0.2, Res_Ether: -0.20, Res_Ice: -0.20, Taken_Anomalo: -0.30, CD: 0.60},
        buffs_stunned: {},
        Image: "static/ENEMY/Sarah.webp"
    },
    "Tyrfing": {
        def_enemy: { Defense: 571.7 },
        buffs_enemy: { Res_Ether: 0.3},
        buffs_stunned: {},
        Image: "static/ENEMY/Tyrfing.webp"
    },
    "Alpeca": {
        def_enemy: { Defense: 921 },
        buffs_enemy: { Res_Ether: 0.3},
        buffs_stunned: {},
        Image: "static/ENEMY/Alpeca.webp"
    },
    "Dullahan": {
        def_enemy: { Defense: 921 },
        buffs_enemy: { Res_Ether: 0.2, Res_Ice: 0.2},
        buffs_stunned: {},
        Image: "static/ENEMY/Dullahan.webp"
    },
    "Rustler": {
        def_enemy: { Defense: 635 },
        buffs_enemy: { Res_Fire: 0.2, Res_Physical:0.2},
        buffs_stunned: {},
        Image: "static/ENEMY/Rustler.webp"
    },
    
};

export default enemy
