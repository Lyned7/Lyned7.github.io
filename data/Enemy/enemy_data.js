// ENEMIES

const enemy = {
    "Butcher [Buff 2] 3 Anomaly Agents": {
        def_enemy: { Defense: 794 },
        buffs_enemy: { Res_Ice: 0.2, Res_Ether: 0.2, CD: 0.75, Admg: -0.15, Atkf: 0.15, Res: 0.10, Shred: 0.10},
        Image: "static/ENEMY/Dead_End_Butcher.webp"
    },
    "Girtablullu [Buff 2] 3 Anomaly Agents": {
        def_enemy: { Defense: 794 },
        buffs_enemy: { Res_Wind: 0.2, Taken_Anomalo: 0.225, Stun: 0.30, Admg: 0.30, Atkf: 0.15, Res: 0.10, Shred: 0.10},
        Image: "static/ENEMY/Girtablullu.webp"
    },
    "Sarah [Buff 3]": {
        def_enemy: { Defense: 794 },
        buffs_enemy: { Res_Physical: 0.2, Taken_Anomalo: -0.30, CD: 0.90, Atkf_Atacante: 0.10, Dmg_Basic: 0.30, Shred_Basic: 0.15},
        Image: "static/ENEMY/Sarah.webp"
    },
    "Tyrfing": {
        def_enemy: { Defense: 571.7 },
        buffs_enemy: { Res_Ether: 0.3},
        Image: "static/ENEMY/Tyrfing.webp"
    },
    "Alpeca": {
        def_enemy: { Defense: 921 },
        buffs_enemy: { Res_Ether: 0.3},
        Image: "static/ENEMY/Alpeca.webp"
    },
    "Dullahan": {
        def_enemy: { Defense: 921 },
        buffs_enemy: { Res_Ether: 0.2, Res_Ice: 0.2},
        Image: "static/ENEMY/Dullahan.webp"
    },
    "Rustler": {
        def_enemy: { Defense: 635 },
        buffs_enemy: { Res_Fire: 0.2, Res_Physical:0.2},
        Image: "static/ENEMY/Rustler.webp"
    },
    
};

export default enemy
