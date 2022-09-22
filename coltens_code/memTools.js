/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memTools');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    generateRoomData: function(room) {
        Memory["rooms"][room.name] = {};
        roomMem = Memory["rooms"][room.name];
        
        roomMem["TargetWorkerCount"] = 4;
        roomMem["TargetBuilderCount"] = 3;
        
        roomMem["homePoint"] = {};
        
        roomMem["spawns"] = {};
        roomSpawns = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}});
        
        for (var index in roomSpawns) {
            roomMem["spawns"][index] = roomSpawns[index].name;
        }
        
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
    },
    
    generateSpawnRoomNeighborData: function(roomName) {
        if (Memory["rooms"][roomName]) {
            var roomMem = Memory["rooms"][roomName];
            for (let index in roomMem["neighbors"]) {
                if (!Memory["rooms"][roomMem["neighbors"][index]]) {
                    let neighbor = Game.rooms[roomMem["neighbors"][index]];
                    this.generateRoomData(neighbor);
                }
            }
        }
    }
};