/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawnUtils');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    creepFromNearestSpawn: function (homeRoom, creepName, recipe, creepMem) {
        if (Memory["rooms"][homeRoom]["spawns"][0]) {
            if (!Game.spawns[Memory["rooms"][homeRoom]["spawns"][0]].spawnCreep(recipe, creepName, {memory: creepMem}) == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
        
        for (index in Memory["rooms"][homeRoom]["neighbors"]) {
            if (Memory["rooms"][Memory["rooms"][homeRoom]["neighbors"][index]]) {
                if (Memory["rooms"][Memory["rooms"][homeRoom]["neighbors"][index]]["spawns"][0]) {
                    if (!Game.spawns[Memory["rooms"][Memory["rooms"][homeRoom]["neighbors"][index]]["spawns"][0]].spawnCreep(recipe, creepName, {memory:creepMem}) == 0) {
                        return 1;
                    }
                }
            }
        }
        
        return 0;
    }
};