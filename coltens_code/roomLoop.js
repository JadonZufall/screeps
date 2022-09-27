/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roomLoop');
 * mod.thing == 'a thing'; // true
 */
 
const t4R = require("tierFourManager");
const t2R = require("tierTwoManager");
const t3R = require("tierThreeManager");
const towerRole = require("TowerModule");

module.exports = {
    run: function() {
        var myTerritories = Memory["rooms"];
        //will hold all index lists and make sure that creep counts are where the room stage denotes they should be
        var creepCounts = {};
        
        for (index in myTerritories) {
            
            //index: room name, 0: repair amount, 1: hauler amount, 2: builder amount, 3: harvester amount, 4: colonizer amount, 5: claimer amount, 6: scout amount
            let indexList = {};
            let roomName = index;
        
            if (Game.rooms[roomName]) {
                var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                for (index2 in towers) {
                    let currentTower = towers[index2];
                    towerRole.run(currentTower);
                }
            }
        
            
            
            //For stage 4
            if (myTerritories[roomName]["stage"] == "4") {
                t4R.run(roomName);
                indexList = [2, 2, 3, 2, 0, 0, 0];
                creepCounts[roomName] = indexList;
            }
            else if (myTerritories[roomName]["stage"] == "3") {
                t3R.run(roomName);
                indexList = [2, 2, 2, 2, 0, 0, 0];
                creepCounts[roomName] = indexList;
            }
            else if (myTerritories[roomName]["stage"] == "2") {
                t2R.run(roomName);
                indexList = [1, 1, 0, 0, 4, 0, 0];
                creepCounts[roomName] = indexList;
            }
            else if (myTerritories[roomName]["stage"] == "1") {
                
                indexList = [0, 0, 0, 0, 0, 0, 0];
                creepCounts[roomName] = indexList;
            }
        }
        
        return creepCounts;
    }
};