module.exports = {
    CREEP_ROLES: {
        NO_ROLE: "none",            // Creep does not have an assigned role.
        DEFAULT: "default",         // Creep performs the default function of harvesting energy and upgrading the rooms controller.
        WORKER: "worker",           // Creep harvests energy and stores it in the room's storages.
        BUILDER: "builder",         // Creep collects energy from the rooms storages and builds structures, if no structures upgrades controller.
        UPGRADER: "upgrader",       // Creep upgrades the rooms controller.
        MINER: "miner",             // Creep mines the rooms resource node.
        CLAIMER: "claimer",         // Creep claims target rooms adjacent to it's spawn room.
        BALANCER: "balancer",       // Creep balances storages throughout a room.
        HAULER: "hauler",           // Creep transports resources from one room to another.
        PORTER: "porter",           // Creep helps other creeps who need help moving move (only contains move parts).
        CLEANER: "cleaner",         // Creep collects all dropped resources and gathers resources from destroyed structures.
        HEALER: "healer",           // Creep heals friendly creeps who are damaged in the room.
        FIGHTER: "fighter",         // Creep attacks hostile creeps in a room with melee attacks.
        RANGER: "ranger",           // Creep attacks hostile creeps and kites away from melee range.
        DEFENDER: "defender",       // Creep defends room from hostile creeps.
    },

    // Contains the creep bodies for the controller level.
    CREEP_BODYS: {
        NO_ROLE: {0: [], 1: [], 2: [], 3: [], 4: [], 5:[], 6:[], 7:[], 8:[]},
        DEFAULT: {0: [], 1: [MOVE, WORK, CARRY], 2: [], 3: [], 4: [], 5:[], 6:[], 7:[], 8:[]},
        WORKER: {0: [], 1: [], 2: [], 3: [], 4: [], 5:[], 6:[], 7:[], 8:[]},
        BUILDER: {1: [], 2: [], 3: [], 4: [], 5:[], 6:[], 7:[], 8:[]},
        UPGRADER: {1: [], 2: [], 3: [], 4: [], 5:[], 6:[], 7:[], 8:[]},
        MINER: {1: [], 2: [], 3: [], 4: [], 5:[], 6:[], 7:[], 8:[]},
        CLAIMER: {1: [], 2: [], 3: [], 4: [], 5:[], 6:[], 7:[], 8:[]},
        BALANCER: {1: [], 2: [], 3: [], 4: [], 5:[], 6:[], 7:[], 8:[]},
        HAULER: {1: [], 2: [], 3: [], 4: [], 5:[], 6:[], 7:[], 8:[]},
        PORTER: {1: [], 2: [], 3: [], 4: [], 5:[], 6:[], 7:[], 8:[]},
        CLEANER: {1: [], 2: [], 3: [], 4: [], 5:[], 6:[], 7:[], 8:[]},
        HEALER: {1: [], 2: [], 3: [], 4: [], 5:[], 6:[], 7:[], 8:[]},
        FIGHTER: {1: [], 2: [], 3: [], 4: [], 5:[], 6:[], 7:[], 8:[]},
        RANGER: {1: [], 2: [], 3: [], 4: [], 5:[], 6:[], 7:[], 8:[]},
        DEFENDER: {1: [], 2: [], 3: [], 4: [], 5:[], 6:[], 7:[], 8:[]},
    },

    // Contains the creep population count for the controller level.
    CREEP_COUNT: {
        NO_ROLE: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
        DEFAULT: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
        WORKER: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
        BUILDER: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
        UPGRADER: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
        MINER: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
        CLAIMER: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
        BALANCER: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
        HAULER: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
        PORTER: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
        CLEANER: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
        HEALER: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
        FIGHTER: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
        RANGER: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
        DEFENDER: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
    }
}