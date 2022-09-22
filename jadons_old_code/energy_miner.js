/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('energy_miner');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(targetCreep) {
        if (targetCreep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            targetCreep.drop(RESOURCE_ENERGY);
        }
        var roomSources = targetCreep.room.find(FIND_SOURCES);
        var closestSource = targetCreep.pos.findClosestByRange(roomSources);
        var harvestResult = targetCreep.harvest(closestSource);
        if (harvestResult == ERR_NOT_IN_RANGE) {
            targetCreep.say("Moving to source!");
            targetCreep.moveTo(closestSource);
        }
    }
};