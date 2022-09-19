/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('BuilderModule');
 * mod.thing == 'a thing'; // true
 */

const utils = require("utils");

module.exports = {
    run: function(targetCreep) {
        if (targetCreep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            targetCreep.memory["fullStore"] = false;
        }
        if (targetCreep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            targetCreep.memory["fullStore"] = true;
        }
        if (targetCreep.memory["fullStore"]) {
            var roomController = targetCreep.room.controller;
            if (roomController.ticksToDowngrade < 3000) {
                var upgradeResult = targetCreep.upgradeController(targetCreep.room.controller);
                if (upgradeResult == ERR_NOT_IN_RANGE) {
                    targetCreep.moveTo(roomController);
                }
            }
            else {
                var targets = targetCreep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    var closestBuild = targetCreep.pos.findClosestByRange(targets);
                    var buildResult = targetCreep.build(closestBuild);
                    if (buildResult == ERR_NOT_IN_RANGE) {
                        targetCreep.moveTo(closestBuild);
                    }
                }
                else if (Game.rooms["W8N3"].memory["damagedBuildings"][0]) {
                    var roomsDamagedBuildings = [];
                    
                    for (index in Game.rooms["W8N3"].memory["damagedBuildings"]) {
                        var buildings = Game.getObjectById(Game.rooms["W8N3"].memory["damagedBuildings"][index]);
                        roomsDamagedBuildings.push(buildings);
                    }
                    
                    var closestDamagedBuilding = targetCreep.pos.findClosestByRange(roomsDamagedBuildings);
                    
                    var repairResult = targetCreep.repair(closestDamagedBuilding);
                    if (repairResult == ERR_NOT_IN_RANGE) {
                        targetCreep.moveTo(closestDamagedBuilding);
                    }
                }
                else {
                    var upgradeResult = targetCreep.upgradeController(targetCreep.room.controller);
                    if (upgradeResult == ERR_NOT_IN_RANGE) {
                        targetCreep.moveTo(targetCreep.room.controller);
                    }
                }
            }
        }
        else {
            utils.withdrawEnergy(targetCreep);
        }
    }
};