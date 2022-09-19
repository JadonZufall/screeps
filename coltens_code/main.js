const workerRole = require("WorkerModule");
const builderRole = require("BuilderModule");
const utils = require("utils");
const memTools = require("memTools");
const towerRole = require("TowerModule");

//var firstRoom = Game.rooms["W8N3"];
//memTools.generateRoomData(firstRoom);

const TargetWorkerCreepCount = [4];
const TargetBuilderCreepCount = [3];

const MyDomain = ["W8N3"];

var workerCreepCount = [0];
var builderCreepCount = [0];

//updates the damaged buildings list in memory
if (Game.time % 5 == 0) {
    for (index in MyDomain) {
        Game.rooms[MyDomain[index]].memory["damagedBuildings"] = utils.findDamagedBuildingsByRoomName(Game.rooms[MyDomain[index]]);
    }
}

//Manages creeps in memory
for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
        delete Memory.creeps[name];
    }
}

var towers = Game.rooms["W8N3"].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
for (var index in towers) {
    currentTower = towers[index];
}

for (var name in Game.creeps) {
    var currentCreep = Game.creeps[name];
    
    
    if (currentCreep.memory["role"] == "worker") {
        workerRole.run(currentCreep);
        workerCreepCount[0] += 1;
    }
    
    if (currentCreep.memory["role"] == "builder") {
        builderRole.run(currentCreep);
        builderCreepCount[0] += 1;
    }
}

if (workerCreepCount[0] < TargetWorkerCreepCount[0]) {
    
    Game.spawns["Main"].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], "Worker " + MyDomain[0] + " " + Game.time.toString(), {memory:{"role" : "worker", "emptyStore" : true, "targetSource" : "none", "homeRoom" : MyDomain[0], "imDying" : false}});
}

if (builderCreepCount[0] < TargetBuilderCreepCount[0]) {
    
    Game.spawns["Main"].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], "Builder " + MyDomain[0] + " " + Game.time.toString(), {memory:{"role" : "builder", "fullStore" : false, "homeRoom" : MyDomain[0], "imDying" : false}});
}