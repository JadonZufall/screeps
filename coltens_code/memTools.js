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
        Memory["rooms"][room.name]["sources"] = {};
        
        sources = room.find(FIND_SOURCES);
        
        for (var index in sources) {
            Memory["rooms"][room.name]["sources"][index] = {};
            Memory["rooms"][room.name]["sources"][index]["sourceId"] = sources[index].id;
            Memory["rooms"][room.name]["sources"][index]["users"] = 0;
        }
    }
};