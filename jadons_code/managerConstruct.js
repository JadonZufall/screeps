const constructSpawn = require("constructSpawn");
const constructTower = require("constructTower");

module.exports = {
    run: function(targetRoom) {
        let myConstructs = targetRoom.find(FIND_MY_STRUCTURES);
        let otherConstructs = targetRoom.find(FIND_STRUCTURES);

        // Itterate over all constructs owned by me in the room.
        for (var index in myConstructs) {
            let targetConstruct = myConstructs[index];
            let targetStructure = targetConstruct.structureType;

            if (targetStructure == STRUCTURE_SPAWN) {
                constructSpawn.run(targetConstruct);
            }
            else if (targetStructure == STRUCTURE_LINK) {
                console.log("Error, unhandled construct type STRUCTURE_LINK!");
            }
            else if (targetStructure == STRUCTURE_TOWER) {
                constructTower.run(targetConstruct);
            }
            else if (targetStructure == STRUCTURE_OBSERVER) {
                console.log("Error, unhandled construct type STRUCTURE_OBSERVER!");
            }
            else if (targetStructure == STRUCTURE_POWER_SPAWN) {
                console.log("Error, unhandled construct type STRUCTURE_POWER_SPAWN!");
            }
            else if (targetStructure == STRUCTURE_LAB) {
                console.log("Error, unhandled construct type STRUCTURE_LAB!");
            }
            else if (targetStructure == STRUCTURE_TERMINAL) {
                console.log("Error, unhandled construct type STRUCTURE_TERMINAL!");
            }
            else if (targetStructure == STRUCTURE_NUKER) {
                console.log("Error, unhandled construct type STRUCTURE_NUKER!");
            }
            else if (targetStructure == STRUCTURE_FACTORY) {
                console.log("Error, unhandled construct type STRUCTURE_FACTORY!");
            }
        }
    }
}