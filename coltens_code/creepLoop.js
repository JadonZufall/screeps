/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creepLoop');
 * mod.thing == 'a thing'; // true
 */

const builderRole = require("BuilderModule");
const secretRole = require("SecretModule");
const towerRole = require("TowerModule");
const repairRole = require("RepairModule");
const UrbanRole = require("UrbanModule");
const combatRole = require("CombatModule");

module.exports = {
    run: function(creepCounts) {
        for (var name in Game.creeps) {
            var currentCreep = Game.creeps[name];
            
            if (currentCreep.memory["role"] == "builder") {
                builderRole.run(currentCreep);
                creepCounts[currentCreep.memory["homeRoom"]][2] = parseInt(creepCounts[currentCreep.memory["homeRoom"]][2]) - 1;
            }
            
            if (currentCreep.memory["role"] == "scout") {
                secretRole.scout(currentCreep);
                creepCounts[currentCreep.memory["homeRoom"]][6] = parseInt(creepCounts[currentCreep.memory["homeRoom"]][6]) - 1;
            }
            
            if (currentCreep.memory["role"] == "colonizer") {
                secretRole.colonizer(currentCreep);
                creepCounts[currentCreep.memory["homeRoom"]][4] = parseInt(creepCounts[currentCreep.memory["homeRoom"]][4]) - 1;
            }
            
            if (currentCreep.memory["role"] == "claimer") {
                secretRole.claimer(currentCreep);
                creepCounts[currentCreep.memory["homeRoom"]][5] = parseInt(creepCounts[currentCreep.memory["homeRoom"]][5]) - 1;
            }
            
            if (currentCreep.memory["role"] == "repair") {
                repairRole.run(currentCreep);
                creepCounts[currentCreep.memory["homeRoom"]][0] = parseInt(creepCounts[currentCreep.memory["homeRoom"]][0]) - 1;
            }
            
            if (currentCreep.memory["role"] == "harvester") {
                UrbanRole.harvester(currentCreep);
                creepCounts[currentCreep.memory["homeRoom"]][3] = parseInt(creepCounts[currentCreep.memory["homeRoom"]][3]) - 1;
            }
            
            if (currentCreep.memory["role"] == "hauler") {
                UrbanRole.hauler(currentCreep);
                creepCounts[currentCreep.memory["homeRoom"]][1] = parseInt(creepCounts[currentCreep.memory["homeRoom"]][1]) - 1;
            }
            
            if (currentCreep.memory["role"] == "attack") {
                combatRole.melee(currentCreep);
            }
        }
        return creepCounts;
    }
};