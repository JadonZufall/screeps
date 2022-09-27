/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memTools');
 * mod.thing == 'a thing'; // true
 */
 
 const utils = require("utils");

module.exports = {
    generateRoomData: function(room) {
        if (!Memory["rooms"][room.name]) {
            Memory["rooms"][room.name] = {};
        
            roomMem = Memory["rooms"][room.name];
            
            roomMem["stage"] = 1;
            roomMem["homePoint"] = [25, 25, room.name];
            roomMem["spawns"] = {};
            
            roomMem["mapCoordinates"] = {};
            roomMem["mapCoordinates"][room.name[0]] = room.name[1];
            roomMem["mapCoordinates"][room.name[2]] = room.name[3];
            
            roomMem["neighbors"] = {};
            
            let leftExit = room.find(FIND_EXIT_LEFT);
            if (leftExit.length) {
                let leftNeighborName = room.name[0] + String(parseInt(room.name[1]) + 1) + room.name[2] + String(room.name[3]);
                roomMem["neighbors"]["left"] = leftNeighborName;
            }
            
            let rightExit = room.find(FIND_EXIT_RIGHT);
            if (rightExit.length) {
                let rightNeighborName = room.name[0] + String(parseInt(room.name[1]) - 1) + room.name[2] + String(room.name[3]);
                roomMem["neighbors"]["right"] = rightNeighborName;
            }
            
            let topExit = room.find(FIND_EXIT_TOP);
            if (topExit.length) {
                let topNeighborName = room.name[0] + String(room.name[1]) + room.name[2] + String(parseInt(room.name[3]) + 1);
                roomMem["neighbors"]["top"] = topNeighborName;
            }
            
            let bottomExit = room.find(FIND_EXIT_BOTTOM);
            if (bottomExit.length) {
                let bottomNeighborName = room.name[0] + String(room.name[1]) + room.name[2] + String(parseInt(room.name[3]) - 1);
                roomMem["neighbors"]["bottom"] = bottomNeighborName;
            }
            
            roomMem["damagedBuildings"] = {};
        }
    },
    
    creepMemCleaner: function() {
        //Manages creeps in memory
        for (name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }
};