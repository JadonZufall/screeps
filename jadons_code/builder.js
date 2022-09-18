/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder');
 * mod.thing == 'a thing'; // true
 */

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
            if (roomController.ticksToDowngrade < 8000) {
                var upgradeResult = targetCreep.upgradeController(targetCreep.room.controller);
                if (upgradeResult == ERR_NOT_IN_RANGE) {
                    targetCreep.moveTo(roomController);
                }
            }
            else {
                var targets = targetCreep.room.find(FIND_MY_CONSTRUCTION_SITES);
                
                if (targets.length) {
                    var buildResult = targetCreep.build(targets[0]);
                    if (buildResult == ERR_NOT_IN_RANGE) {
                        targetCreep.moveTo(targets[0]);
                    }
                }
                else {
                    var dx = targetCreep.pos.x - targetCreep.room.controller.pos.x;
                    var dy = targetCreep.pos.y - targetCreep.room.controller.pos.y;
                    var distance = (dx**2 + dy**2)**0.5
                    
                    if (distance > 3) {
                        targetCreep.moveTo(targetCreep.room.controller);
                    }
                    else {
                        var upgradeResult = targetCreep.upgradeController(targetCreep.room.controller);
                        if (upgradeResult == ERR_NOT_IN_RANGE) {
                            targetCreep.moveTo(targetCreep.room.controller);
                        }
                    }
                }
            }
        }
        else {
            var transferResult = targetCreep.withdraw(Game.spawns["Spawn1"], RESOURCE_ENERGY);
            if (transferResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(Game.spawns["Spawn1"]);
            }
        }
    }
};