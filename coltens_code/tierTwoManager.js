/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('tierTwoManager');
 * mod.thing == 'a thing'; // true
 */
const utils = require("utils");
const ST = require("spawnTemplates");


module.exports = {
    run: function(roomName) {
        const roomsName = roomName;
        let roomMem = Memory["rooms"][roomsName];
        roomMem["damagedBuildings"] = utils.findDamagedBuildingsByRoomName(roomsName);
        
        let TargetScoutCreepCount = [0];
        
        if (!roomMem["localTrades"]) {
            roomMem["localTrades"] = {};
        }
        
        let tmp = [];
        for (index3 in Memory["rooms"]) {
            tmp.push(index3);
        }
        
        for (index4 in roomMem["neighbors"]) {
            if (!tmp.includes(roomMem["neighbors"][index4])) {
                TargetScoutCreepCount[0] += 1;
            }
        }
        
        if ((TargetScoutCreepCount[0] > 0) && (Game.time % 100 == 0)) {
            let spawnResult = ST.scoutLevelTwo(roomsName);
        }
        
        if (Game.rooms[roomsName].find(FIND_HOSTILE_CREEPS).length || Game.rooms[roomsName].find(FIND_HOSTILE_STRUCTURES).length) {
            let spawnResult = ST.meleeLevelSix(roomsName);
        }
    }
};