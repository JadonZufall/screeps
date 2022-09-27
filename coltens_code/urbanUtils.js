/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('urbanUtils');
 * mod.thing == 'a thing'; // true
 */
const utils = require("utils");

module.exports = {
    urbanHauler: function (targetCreep) {
        if (!targetCreep.memory["fullStatus"]) {
            targetCreep.memory["fullStatus"] = false;
        }
        
        if (targetCreep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            targetCreep.memory["fullStatus"] = true;
        }
        if (targetCreep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            targetCreep.memory["fullStatus"] = false;
        }
        
        if (!targetCreep.memory["fullStatus"]) {
            if (utils.withdrawEnergy(targetCreep, withdrawSpawn=false, withdrawExtension=false, withdrawLink=false, withdrawStorage=false, withdrawTower=false, withdrawTerminal=false, withdrawContainer=true, withdrawAny=false, requireEnergy=true)) {
                return 1;
            }
            else if (utils.withdrawEnergy(targetCreep, withdrawSpawn=false, withdrawExtension=false, withdrawLink=false, withdrawStorage=true, withdrawTower=false, withdrawTerminal=false, withdrawContainer=false, withdrawAny=false, requireEnergy=true)) {
                return 1;
            } 
            else if (utils.withdrawEnergy(targetCreep, withdrawSpawn=false, withdrawExtension=false, withdrawLink=false, withdrawStorage=false, withdrawTower=false, withdrawTerminal=true, withdrawContainer=false, withdrawAny=false, requireEnergy=true)) {
                return 1;
            }
        }
        else {
            if (utils.storeEnergy(targetCreep, storeAny=false, storeExtension=true, storeLink=false, storeStorage=false, storeTower=true, storeTerminal=false, storeContainer=false, storeSpawn=true, requireSpace=true)) {
                return 1;
            }
            else if (utils.storeEnergy(targetCreep, storeAny=false, storeExtension=false, storeLink=false, storeStorage=false, storeTower=false, storeTerminal=true, storeContainer=false, storeSpawn=false, requireSpace=true)) {
                return 1;
            }
            else if (utils.storeEnergy(targetCreep, storeAny=false, storeExtension=false, storeLink=false, storeStorage=true, storeTower=false, storeTerminal=false, storeContainer=false, storeSpawn=false, requireSpace=true)) {
                return 1;
            }
        }
        return 0;
    },
    
    urbanHarvester: function(targetCreep) {
        
        if (!targetCreep.memory["sourceNode"]) {
            let roomSources = Game.rooms[targetCreep.memory["homeRoom"]].find(FIND_SOURCES);
            let usedSources = [];
            for (aCreep in Game.creeps) {
                if (Memory["creeps"][aCreep]["homeRoom"] == targetCreep.memory["homeRoom"] && Memory["creeps"][aCreep]["role"] == "harvester" ) {
                    usedSources.push(Memory["creeps"][aCreep]["sourceNode"]);
                }
            }
            for (let aSource in roomSources) {
                if (!usedSources.includes(roomSources[aSource].id)) {
                    targetCreep.memory["sourceNode"] = roomSources[aSource].id;
                }
            }
        }
        
        if (!targetCreep.memory["fullStatus"]) {
            targetCreep.memory["fullStatus"] = false;
        }
        
        if (targetCreep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            targetCreep.memory["fullStatus"] = false;
        }
        
        if (targetCreep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            targetCreep.memory["fullStatus"] = true;
        }
        
        if (targetCreep.memory["fullStatus"]) {
            if (utils.storeEnergy(targetCreep, storeAny=false, storeExtension=false, storeLink=false, storeStorage=false, storeTower=false, storeTerminal=false, storeContainer=true, storeSpawn=false, requireSpace=true)) {
                return 1;
            }
        }
        else if (!targetCreep.memory["fullStatus"]) {
            var harvestResult = targetCreep.harvest(Game.getObjectById(targetCreep.memory["sourceNode"]));
            if (harvestResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(Game.getObjectById(targetCreep.memory["sourceNode"]));
            }
            return 1;
        }
        return 0;
    }
};