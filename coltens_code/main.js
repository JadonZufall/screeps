const workerRole = require("WorkerModule");
const builderRole = require("BuilderModule");
const secretRole = require("SecretModule");
const utils = require("utils");
const memTools = require("memTools");
const towerRole = require("TowerModule");

//var firstRoom = Game.rooms["W8N3"];
//memTools.generateRoomData(firstRoom);
//memTools.generateSpawnRoomNeighborData("W8N3");
//Memory["rooms"]["W8N3"]["homePoint"]["x"] = 28;
//Memory["rooms"]["W8N3"]["homePoint"]["y"] = 17;

const TargetWorkerCreepCount = [4];
const TargetBuilderCreepCount = [2];
var TargetScoutCreepCount = [0];
var TargetColonizerCreepCount = [];

var myTerritories = Memory["rooms"];
var myDomain = [];
var desiredWorkerCount = [];
var currentWorkerCount = [];
var desiredBuilderCount = [];
var currentBuilderCount = [];
var desiredColonizerCount = [];
var currentColonizerCount = [];

for (index in myTerritories) {
    if (myTerritories[index]["spawns"][0]) {
        myDomain.push(index);
        desiredWorkerCount.push(myTerritories[index]["TargetWorkerCount"]);
        currentWorkerCount.push(0);
        desiredBuilderCount.push(myTerritories[index]["TargetBuilderCount"]);
        currentBuilderCount.push(0);
        desiredColonizerCount.push(0);
        currentWorkerCount.push(0);
    }
    else {
        desiredWorkerCount.push(0);
        currentWorkerCount.push(0);
        desiredBuilderCount.push(0);
        currentBuilderCount.push(0);
        desiredColonizerCount.push(Math.floor(parseInt(myTerritories[index]["TargetWorkerCount"]) + parseInt(myTerritories[index]["TargetBuilderCount"])/2));
        currentWorkerCount.push(0);
    }
}

for (index in myDomain) {
    
}

TargetColonizerCreepCount.push(Math.floor(parseInt((Memory["rooms"]["W8N3"]["TargetWorkerCount"]) + parseInt(Memory["rooms"]["W8N3"]["TargetBuilderCount"]))/2));
var colonizerCreepCount = [0];

const MyDomain = ["W8N3"];
const MyColonies = ["W8N2"];

var workerCreepCount = [0];
var builderCreepCount = [0];
var scoutCreepCount = [0];




//updates the damaged buildings list in memory
if (Game.time % 5== 0) {
    for (index in MyDomain) {
        Game.rooms[MyDomain[index]].memory["damagedBuildings"] = utils.findDamagedBuildingsByRoomName(Game.rooms[MyDomain[index]]);
    }
    for (index in MyColonies) {
        Game.rooms[MyColonies[index]].memory["damagedBuildings"] = utils.findDamagedBuildingsByRoomName(Game.rooms[MyColonies[index]]);
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
    towerRole.run(currentTower);
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
    
    if (currentCreep.memory["role"] == "scout") {
        secretRole.scout(currentCreep);
        scoutCreepCount[0] += 1;
    }
    
    if (currentCreep.memory["role"] == "colonizer") {
        secretRole.colonizer(currentCreep);
        colonizerCreepCount[0] += 1;
    }
    
    if (currentCreep.memory["role"] == "claimer") {
        secretRole.claimer(currentCreep);
    }
}

let roomMem = Memory["rooms"][MyDomain[0]];
let tmp = [];
for (let index2 in Memory["rooms"]) {
    tmp.push(index2);
}
    

for (let index in roomMem["neighbors"]) {
    if (!tmp.includes(roomMem["neighbors"][index])) {
        TargetScoutCreepCount[0] += 1;
    }
}

if (workerCreepCount[0] < TargetWorkerCreepCount[0]) {
    
    Game.spawns["Main"].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], "Worker " + MyDomain[0] + " " + Game.time.toString(), {memory:{"role" : "worker", "emptyStore" : true, "targetSource" : "none", "homeRoom" : MyDomain[0], "imDying" : false}});
}

if (builderCreepCount[0] < TargetBuilderCreepCount[0]) {
    
    Game.spawns["Main"].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], "Builder " + MyDomain[0] + " " + Game.time.toString(), {memory:{"role" : "builder", "fullStore" : false, "homeRoom" : MyDomain[0], "imDying" : false}});
}

if (scoutCreepCount[0] < TargetScoutCreepCount[0]) {
    Game.spawns["Main"].spawnCreep([MOVE], "Scout " + MyDomain[0] + " " + Game.time.toString(), {memory:{"role" : "scout", "homeRoom" : MyDomain[0]}});
}

if (colonizerCreepCount[0] < TargetColonizerCreepCount[0]) {
    Game.spawns["Main"].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], "Colonizer " + MyDomain[0] + " " + Game.time.toString(), {memory:{"role" : "colonizer", "homeRoom" : MyColonies[0]}});
}

//Game.spawns["Main"].spawnCreep([MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY], "Worker " + MyDomain[0] + " " + Game.time.toString(), {memory:{"role" : "worker", "emptyStore" : true, "targetSource" : "none", "homeRoom" : MyDomain[0], "imDying" : false}});
//Game.spawns["Main"].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], "Worker " + MyDomain[0] + " " + Game.time.toString(), {memory:{"role" : "worker", "emptyStore" : true, "targetSource" : "none", "homeRoom" : myDomain[1], "imDying" : false}});
//if (0) {
//    Game.spawns["Main"].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CLAIM], "Claimer " + MyDomain[0] + " " + Game.time.toString(), {memory:{"role" : "claimer", "homeRoom" : MyColonies[0]}});
//}
