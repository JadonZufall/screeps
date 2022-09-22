/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('SecretModule');
 * mod.thing == 'a thing'; // true
 */
const memTools = require("memTools");
const utils = require("utils");
const civilianUtils = require("civilianUtils");

module.exports = {
    scout: function(targetCreep) {
        var roomMem = Memory["rooms"][targetCreep.memory["homeRoom"]];
        
        var tmp = [];
        for (let index2 in Memory["rooms"]) {
            tmp.push(index2);
        }
        
        for (let index in roomMem["neighbors"]) {
            let nextRoomPos = new RoomPosition(25, 25, roomMem["neighbors"][index]);
            
            if (!tmp.includes(roomMem["neighbors"][index]) && !targetCreep.pos.isEqualTo(nextRoomPos)) {
                targetCreep.moveTo(nextRoomPos);
                return 0;
            }
            
            if (targetCreep.room.name == roomMem["neighbors"][index]) {
                memTools.generateRoomData(targetCreep.room);
                targetCreep.suicide();
                return 0;
            }
        }
    },
    
    claimer: function(targetCreep) {
        if (targetCreep.room.name != targetCreep.memory["homeRoom"]) {
            homeRoomPos = new RoomPosition(25, 25, targetCreep.memory["homeRoom"]);
            targetCreep.moveTo(homeRoomPos);
        }
        else {
            let claimResult = targetCreep.claimController(targetCreep.room.controller);
            if (claimResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(targetCreep.room.controller);
            }
        }
    },
    
    colonizer: function(targetCreep) {
        var thisRoom = targetCreep.room;
        var currentRoomName = targetCreep.room.name;
        
        if (civilianUtils.hideUtil(targetCreep)) {
            return 0;
        }
        
        if (civilianUtils.workerRenewUtil(targetCreep)) {
            return 0;
        }
        
        if (utils.toRoom(targetCreep)) {
            
        }
        else {
            let harvestResult = civilianUtils.harvestUtil(targetCreep);
            if (harvestResult == 1) {
                return 0;
            }
            else if (harvestResult == 0) {
                if (civilianUtils.controllerUpkeepUtil(targetCreep) == 1) {
                    return 0;
                }
                if (civilianUtils.buildUtil(targetCreep) == 1) {
                    return 0;
                }
                if (civilianUtils.controllerUpgradeUtil(targetCreep) == 1) {
                    return 0;
                }
                if (utils.storeEnergy(targetCreep, storeAny=false, storeExtension=true, storeSpawn=true)) {
                    return 0;
                } 
                else if (utils.storeEnergy(targetCreep, storeAny=true)) {
                    return 0;
                }
                else {
                    targetCreep.say("idle");
                }
            }
            
        }
        return 0;
    }
};