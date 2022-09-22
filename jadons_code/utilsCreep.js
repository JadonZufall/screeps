/* Module containing actions that a creep can perfrom. */
var CONSTANTS = require("utilsConstants");
var utils = require("utils");


const defaultArgs = {
    storeEnergy: {
        // The structures that are allowed to be searched for.
        allowedStructures: {
            STRUCTURE_CONTAINER: true,
            STRUCTURE_EXTENSION: true,
            STRUCTURE_FACTORY: true,
            STRUCTURE_LAB: true,
            STRUCTURE_LINK: true,
            STRUCTURE_POWER_BANK: true, 
            STRUCTURE_POWER_SPAWN: true,
            STRUCTURE_SPAWN: true,
            STRUCTURE_TERMINAL: true,
            STRUCTURE_TOWER: true,
            STRUCTURE_STORAGE: true,
        },
        preferedStructures: {
            STRUCTURE_CONTAINER: false,
            STRUCTURE_EXTENSION: true,
            STRUCTURE_FACTORY: false,
            STRUCTURE_LAB: false,
            STRUCTURE_LINK: false,
            STRUCTURE_POWER_BANK: false, 
            STRUCTURE_POWER_SPAWN: false,
            STRUCTURE_SPAWN: true,
            STRUCTURE_TERMINAL: false,
            STRUCTURE_TOWER: true,
            STRUCTURE_STORAGE: false,
        },
        // The max distance a creep will sacrafice in order to drop all in one go.
        bestAddedMaxDistance: 10,
    },
    withdrawEnergy: {
        allowedStructures: {
            STRUCTURE_CONTAINER: true,
            STRUCTURE_EXTENSION: true,
            STRUCTURE_FACTORY: false,
            STRUCTURE_LAB: false,
            STRUCTURE_LINK: true,
            STRUCTURE_POWER_BANK: true, 
            STRUCTURE_POWER_SPAWN: false,
            STRUCTURE_SPAWN: true,
            STRUCTURE_TERMINAL: true,
            STRUCTURE_TOWER: false,
            STRUCTURE_STORAGE: true,
        },
        preferedStructures: {
            STRUCTURE_CONTAINER: true,
            STRUCTURE_EXTENSION: false,
            STRUCTURE_FACTORY: false,
            STRUCTURE_LAB: false,
            STRUCTURE_LINK: true,
            STRUCTURE_POWER_BANK: true, 
            STRUCTURE_POWER_SPAWN: false,
            STRUCTURE_SPAWN: false,
            STRUCTURE_TERMINAL: true,
            STRUCTURE_TOWER: false,
            STRUCTURE_STORAGE: true,
        },
        bestAddedMaxDistance: 10,
    }
};

module.exports = {
    defaultArgs: defaultArgs,

    findEnergyStorage: function(targetCreep, args=defaultArgs.storeEnergy) {
        let allTargetStorages = [];
        let bestTargetStorages = [];
        let preferedTargetStorages = [];
        let bestPreferedTargetStorages = [];

        let allStructures = targetCreep.room.find(FIND_STRUCTURES);
        for (let index in allTargetStorages) {
            let structure = allStructures[index];
            if (!structure) {
                continue;
            }
            else if (!CONSTANTS.structureTypesStorage.includes(structure.structureType)) {
                continue;
            }
            else if (!args.allowedStructures[structure.structureType]) {
                continue;
            }
            else if (structure.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                continue;    
            }
            else {
                if (structure.store.getFreeCapacity(RESOURCE_ENERGY) >= targetCreep.store.getUsedCapacity(RESOURCE_ENERGY)) {
                    if (args.preferedStructures[structure.structureType]) {
                        bestPreferedTargetStorages.push(structure);
                    }
                    else {
                        bestTargetStorages.push(structure);
                    }
                }
                else {
                    if (args.preferedStructures[structure.structureType]) {
                        preferedTargetStorages.push(structure);
                    }
                    else {
                        allTargetStorages.push(structure);
                    }
                }
            }
        }

        let foundStructure = null;
        if (preferedTargetStorages.length || bestPreferedTargetStorages.length) {
            if (!preferedTargetStorages.length) {
                foundStructure = targetCreep.pos.findClosestByPath(bestPreferedTargetStorages);
            }
            else if (!bestPreferedTargetStorages.length) {
                foundStructure = targetCreep.pos.findClosestByPath(preferedTargetStorages);
            }
            else {
                let bestStructure = targetCreep.pos.findClosestByPath(bestPreferedTargetStorages);
                let bestDistance = utils.calculateDistnace(targetCreep, bestStructure);
                if (bestDistance <= args.bestAddedMaxDistance) {
                    foundStructure = bestStructure;
                }
                else {
                    let otherStructure = targetCreep.pos.findClosestByPath(preferedTargetStorages);
                    let otherDistance = utils.calculateDistance(targetCreep, otherStructure);
                    if (bestDistance - otherDistance >= args.bestAddedMaxDistance) {
                        foundStructure = otherStructure;
                    }
                    else {
                        foundStructure = bestStructure;
                    }
                }
            }
        }
        else if (allTargetStorages.length || bestTargetStorages.length) {
            if (!allTargetStorages.length) {
                foundStructure = targetCreep.pos.findClosestByPath(bestTargetStorages);
            }
            else if (!bestTargetStorages.length) {
                foundStructure = targetCreep.pos.findClosestByPath(allTargetStorages);
            }
            else {
                let bestStructure = targetCreep.pos.findClosestByPath(bestTargetStorages);
                let bestDistance = utils.calculateDistnace(targetCreep, bestStructure);
                if (bestDistance <= args.bestAddedMaxDistance) {
                    foundStructure = bestStructure;
                }
                else {
                    let otherStructure = targetCreep.pos.findClosestByPath(allTargetStorages);
                    let otherDistance = utils.calculateDistance(targetCreep, otherStructure);
                    if (bestDistance - otherDistance >= args.bestAddedMaxDistance) {
                        foundStructure = otherStructure;
                    }
                    else {
                        foundStructure = bestStructure;
                    }
                }
            }
        }
        else {
            return null;
        }
        return foundStructure;
    },
};