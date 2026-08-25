// Stats principales disponibles por slot de disco (D1 - D6).
// Cada clave del sub-objeto es el nombre del stat que se muestra en el chip;
// el valor numerico queda disponible para cuando se conecte el calculo real.

const mainstats = {
    "D1": {
        Hpp: 2200
    },
    "D2": {
        Atkp: 316
    },
    "D3": {
        Defp: 184
    },
    "D4": {
        CR_Base: 0.24,
        CD_Base: 0.48,
        Atkx: 0.30,
        Hpx: 0.30,
        Defx: 0.48,
        MA_Base: 92
    },
    "D5": {
        Atkx: 0.30,
        Hpx: 0.30,
        Defx: 0.48,
        Dmg_Physical: 0.30,
        Dmg_Fire: 0.30,
        Dmg_Electric: 0.30,
        Dmg_Ether: 0.30,
        Dmg_Ice: 0.30,
        Dmg_Wind: 0.30,
        Penx: 0.24
    },
    "D6": {
        Atkx: 0.30,
        Hpx: 0.30,
        Defx: 0.48,
        Tasax: 0.30,
        ERx: 0.60,
        Impactx: 0.18
    }
};

export default mainstats;

