const STORE_PRIORITY = [
    //STRUCTURE_LINK, 
    STRUCTURE_TOWER, 
    STRUCTURE_TERMINAL,
    STRUCTURE_SPAWN,
    STRUCTURE_EXTENSION,
    STRUCTURE_LAB,
    STRUCTURE_STORAGE,
];

const WITHDRAW_PRIORITY = [
    //STRUCTURE_LINK,
    STRUCTURE_STORAGE,
    STRUCTURE_CONTAINER,
    STRUCTURE_EXTENSION
];

Flag.prototype.update = function() {
    if (!this.memory.hasOwnProperty("tick")) {
        this.memory["tick"] = Game.tick;
    }
    if (!this.memory.hasOwnProperty("team")) {
        if (true) {
            this.memory["team"] = -1
        }
        else {
            this.memory["team"] = 0;
        }
    }
    if (!this.memory.hasOwnProperty("type")) {
        if (this.name.includes("rally")) {
            this.memory["type"] = "rally";
        }
    }
    if (!this.memory.hasOwnProperty("scope")) {
        if (this.name.includes("room")) {
            this.memory["scope"] = "room";
        }
        else if (this.name.includes("adj")) {
            this.memory["scope"] = "adj";
        }
        else if (this.name.includes("none")) {
            this.memory["scope"] = "none";
        }
        else {
            this.memory["scope"] = "room";
        }
    }
}

Flag.prototype.lookForConflicts = function() {
    for (var index in Game.flags) {
        var other = Game.flags[index];
        this.isConflicting(other);
    }
}

Flag.prototype.isConflicting = function(other) {
    if (!other.memory.hasOwnProperty("team")) {
        return;
    }
    if (!other.memory.hasOwnProperty("type")) {
        return;
    }
    if (this.memory["team"] == other.memory["team"] && this.memory["type"] == other.memory["type"]) {
        if (!other.memory.hasOwnProperty("tick")) {
            other.memory["tick"] = Game.time;
        }
        if (other.memory["tick"] >= this.memory["tick"]) {
            delete this.memory;
            this.remove();
        }
        else {
            delete other.memory;
            other.remove();
        }
    }
}

Room.prototype.update = function() {
    this.render();
    this.updateMemory();
    this.updateFlags();
    this.updateStructures();
    this.updateCreeps();
}

Room.prototype.updateMemory = function() {
    if (!this.memory.hasOwnProperty("structures")) {
        this.memory["structures"] = {}
    }
    if (!this.memory.hasOwnProperty("creepPop")) {
        this.memory["creepPop"] = {}
    }
    if (!this.memory.hasOwnProperty("hostileStructures")) {
        this.memory["hostileStructures"] = {}
    }
    if (!this.memory.hasOwnProperty("hostileCreeps")) {
        this.memory["hostileCreeps"] = {}
    }
    if (!this.memory.hasOwnProperty("energySources")) {
        this.memory["energySources"] = {}
    }
}

Room.prototype.updateStructures = function() {
    var roomStructures = this.find(FIND_MY_STRUCTURES);
    for (var index in roomStructures) {
        roomStructures[index].update();
    }
}

Room.prototype.updateCreeps = function() {
    var roomCreeps = this.find(FIND_MY_CREEPS);
    for (var index in roomCreeps) {
        roomCreeps[index].update();
    }
}

Room.prototype.updateFlags = function() {
    var roomFlags = this.find(FIND_FLAGS);
    for (var index in roomFlags) {
        roomFlags[index].update();
    }
}

Room.prototype.render = function() {
    var roomCreeps = this.find(FIND_MY_CREEPS);
    var enemyCreeps = this.find(FIND_HOSTILE_CREEPS);
    this.visual.text(roomCreeps.length + " Creeps", new RoomPosition(0, 1, this.name), {color: "#FFFFFF", fontSize: 5, opacity: 0.75, align: "left"});
    this.visual.text(enemyCreeps.length + " Enemy Creeps", new RoomPosition(0, 2, this.name), {color: "#FFFFFF", fontSize: 5, opacity: 0.75, align: "left"});
}

Room.prototype.findLinks = function() {
    return this.find(FIND_MY_STRUCTURES).filter(structure => structure.structureType == STRUCTURE_LINK);
}

Room.prototype.getMemory = function() {
    return this.memory;
}

Store.prototype.isFull = function(resource=RESOURCE_ENERGY) {
    if (this.getFreeCapacity(resource) == 0) {
        return true;
    }
    else {
        return false;
    }
}

Store.prototype.isEmpty = function(resource=RESOURCE_ENERGY) {
    if (this.getUsedCapacity(resource) == 0) {
        return true;
    }
    else {
        return false;
    }
}

Source.prototype.countCreepSpots = function() {
    var lookResult = this.room.lookForAtArea(LOOK_TERRAIN, this.pos.y + 1, this.pos.x + 1, this.pos.y - 1, this.pos.x - 1, asArray=true);
    lookResult = lookResult.filter(terrain => terrain.terrain == TERRAIN_MASK_WALL);
    return 8 - (lookResult.length - 1);
}

Structure.prototype.update = function() {this.render(); return}

Structure.prototype.render = function() {return}

Structure.prototype.renderEnergy = function() {
    this.room.visual.text(Math.round(this.getEnergyPercentage() * 100) + "%", this.pos, {color: "#FFFFFF", fontSize: 5, opacity: 0.75});
}

Structure.prototype.getEnergyPercentage = function () {
    return this.store[RESOURCE_ENERGY] / this.store.getCapacity(RESOURCE_ENERGY);
}

Structure.prototype.getMemory = function() {
    if (!this.room.memory["structures"].hasOwnProperty(this.id)) {
        this.room.memory["structures"][this.id] = {};
    }
    return this.room.memory["structures"][this.id];
}

Structure.prototype.setMemory = function(key, value) {
    if (!this.room.memory["structures"].hasOwnProperty(this.id)) {
        this.room.memory["structures"][this.id] = {};
    }
    return this.room.memory["structures"][this.id][key] = value;
}

Structure.prototype.hasStorage = function() {return this.hasOwnProperty("store")}

// Property method, returns => [true: structure has taken damage / false: structure has not taken damage]
Structure.prototype.isDamaged = function() {
    if (this.hits == this.hitsMax) {
        return false;
    } 
    else {
        return true;
    }
}

StructureExtension.prototype.render = function() {
    this.renderEnergy();
}

StructureStorage.prototype.render = function() {
    this.renderEnergy();
}

StructureSpawn.prototype.update = function() {
    this.render()
    if (this.spawning) {
        return null;
    }
    var roomCreeps = this.room.find(FIND_MY_CREEPS);
    var populationCount = {
        "worker": roomCreeps.filter(creep => creep.memory.role == "worker").length,
        "builder": roomCreeps.filter(creep => creep.memory.role == "builder").length,
    }

    if (populationCount["worker"] < 3) {
        console.log("Spawning Worker")
        this.spawnWorker();
    }
    else if (populationCount["builder"] < 2) {
        console.log("Spawning Builder")
        this.spawnBuilder();
    }
}

StructureSpawn.prototype.render = function() {
    this.renderEnergy();
}

StructureSpawn.prototype.makeCreep = function(role, body) {
    this.spawnCreep(body, role + Game.time.toString() + this.room.name, {memory: {"role": role}});
    return null;
}

StructureSpawn.prototype.spawnWorker = function() {
    this.makeCreep("worker", [MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY]);
}

StructureSpawn.prototype.spawnBuilder = function() {
    this.makeCreep("builder", [MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY]);
}

StructureLink.prototype.update = function() {
    if (!this.doOutput()) {
        return;
    }
    if (this.store[RESOURCE_ENERGY] > this.store.getCapacity(RESOURCE_ENERGY) / 2) {
        var targets = this.room.find(FIND_MY_STRUCTURES);
        for (var index in targets) {
            var target = targets[index];
            if (target.id != this.id) {
                this.transferEnergy(target);
            }
        }
    }
}

StructureLink.prototype.doOutput = function() {
    if (!this.room.memory.hasOwnProperty(this.id)) {
        this.room.memory[this.id] = {"doOutput": false};
    }
    else {
        return this.room.memory[this.id]["doOutput"];
    }
}

StructureTower.prototype.update = function() {
    this.render();
    var actionResult = false;
    if (!actionResult) {
        actionResult = this.fightHostiles();
    }
    if (!actionResult) {
        actionResult = this.healCreeps();
    }
    if (!actionResult) {
        actionResult = this.repairStructures();
    }
}

StructureTower.prototype.render = function() {
    this.renderEnergy();
    this.room.visual.circle(this.pos, {fill: "transparent", radius: TOWER_FALLOFF_RANGE, stroke: "red", opacity: 0.2, strokeWidth: 0.1, lineStyle: "dotted"});
    this.room.visual.circle(this.pos, {fill: "transparent", radius: TOWER_OPTIMAL_RANGE, stroke: "green", opacity: 0.5, strokeWidth: 0.1, lineStyle: "dotted"});
}

StructureTower.prototype.fightHostiles = function() {
    var enemyCreeps = this.room.find(FIND_HOSTILE_CREEPS);
    if (!enemyCreeps.length) {
        return false;
    }
    var target = this.pos.findClosestByRange(enemyCreeps);
    var result = this.attack(target);
    if (result == OK) {
        return true;
    }
    else {
        return false;
    }
}

StructureTower.prototype.repairStructures = function() {
    var structures = this.room.find(FIND_STRUCTURES);
    structures = structures.filter(structure => structure.isDamaged());
    if (!structures.length) {
        return false;
    }
    var target = this.pos.findClosestByRange(structures);
    var result = this.repair(target);
    if (result == OK) {
        return true;
    }
    else {
        return false;
    }
}

StructureTower.prototype.healCreeps = function() {
    var roomCreeps = this.room.find(FIND_MY_CREEPS);
    roomCreeps = roomCreeps.filter(creep => creep.isDamaged());
    if (!roomCreeps.length) {
        return false;
    }
    var target = this.pos.findClosestByRange(roomCreeps);
    var result = this.heal(target);
    if (result == OK) {
        return true;
    }
    else {
        return false;
    }
}

Creep.prototype.update = function() {
    this.render();
    if (!this.memory.hasOwnProperty("homeRoom")) {
        this.memory["homeRoom"] = this.room.name;
    }
    if (!this.memory.hasOwnProperty("targetRoom")) {
        this.memory["targetRoom"] = this.memory["homeRoom"];
    }
    if (!this.memory.hasOwnProperty("renewSelf")) {
        this.memory.renewSelf = false;
    }
    if (this.ticksToLive < 300) {
        this.memory.renewSelf = true;
    }
    if (this.memory.renewSelf) {
        if (this.ticksToLive > 1000) {
            this.memory.renewSelf = false;
        }
        else {
            this.renewLife();
            return;
        }
    }
    if (!this.memory.hasOwnProperty("role")) {
        this.suicide();
    }
    else if (this.memory.role == "worker") {
        this.roleWorker();
    }
    else if (this.memory.role == "builder") {
        this.roleBuilder();
    }
}

Creep.prototype.getSource = function() {
    return Game.getObjectById(this.memory.sourceId);
}

Creep.prototype.render = function() {
    if (this.memory.hasOwnProperty("sourceId")) {
        this.room.visual.line(this.pos, this.getSource().pos, {color: "#00FFFF", lineStyle: "dashed"});
    }
}

Creep.prototype.roleWorker = function() {
    if (!this.memory.hasOwnProperty("working")) {
        this.memory.working = true;
    }
    if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        this.memory.working = false;
    }
    if (this.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
        this.memory.working = true;
    }
    if (this.memory.working) {
        this.gatherEnergy();
    }
    else {
        this.storeEnergy();
    }
}

Creep.prototype.roleBuilder = function() {
    if (!this.memory.hasOwnProperty("working")) {
        this.memory.working = false;
    }
    if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        this.memory.working = true;
    }
    if (this.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
        this.memory.working = false;
    }
    if (this.memory.working) {
        if (!this.buildStructure()) {
            this.upgradeRoom();
        }
    }
    else {
        this.withdrawEnergy();
    }
}

Creep.prototype.roleFighter = function() {
    if (!this.memory.hasOwnProperty("team")) {
        this.memory["team"] = 0;
    }
    var fighterTeam = this.memory["team"];
}

Creep.prototype.gatherEnergy = function() {
    if (!this.memory.hasOwnProperty("sourceId")) {
        this.findSource();
    }
    var targetSource = Game.getObjectById(this.memory.sourceId);
    var harvestResult = this.harvest(targetSource);
    if (harvestResult == ERR_NOT_IN_RANGE) {
        this.moveTo(targetSource);
    }
    return null;
}

Creep.prototype.findSource = function() {
    var roomSources = this.room.find(FIND_SOURCES);
    var roomCreeps = this.room.find(FIND_MY_CREEPS).filter(creep => creep.memory.hasOwnProperty("sourceId"));
    var minIndex = 0;
    var minValue = roomCreeps.length;
    for (var index in roomSources) {
        var sourceCreeps = roomCreeps.filter(creep => creep.memory.sourceId == roomSources[index].id);
        if (minValue > sourceCreeps.length) {
            minIndex = index;
            minValue = sourceCreeps.length;
        }
    }
    this.memory.sourceId = roomSources[index].id;
    return null;
}

Creep.prototype.storeEnergy = function() {
    //var nearbyLink = this.findNearbyLink();
    //if (nearbyLink) {
    //    var storeResult = this.transfer(nearbyLink, RESOURCE_ENERGY);
    //    return;
    //}

    var roomStorages = this.room.find(FIND_MY_STRUCTURES);
    var roomStorages = roomStorages.filter(structure => STORE_PRIORITY.includes(structure.structureType));
    var roomStorages = roomStorages.filter(structure => structure.store.getFreeCapacity(RESOURCE_ENERGY) != 0);
    if (!roomStorages.length) {
        return false;
    }

    for (var index in STORE_PRIORITY) {
        var targetType = STORE_PRIORITY[index];
        var targetStructures = roomStorages.filter(structure => structure.structureType == targetType);
        if (!targetStructures.length) {
            continue;
        }

        var target = this.pos.findClosestByRange(targetStructures);
        if (!target) {
            continue;
        }
        var storeResult = this.transfer(target, RESOURCE_ENERGY);
        if (storeResult == ERR_NOT_IN_RANGE) {
            this.moveTo(target)
        }
        break;
    }
}

Creep.prototype.withdrawEnergy = function() {
    var roomStorages = this.room.find(FIND_MY_STRUCTURES);
    roomStorages = roomStorages.filter(structure => WITHDRAW_PRIORITY.includes(structure.structureType));
    roomStorages = roomStorages.filter(structure => structure.store.getUsedCapacity(RESOURCE_ENERGY) != 0);
    if (!roomStorages.length) {
        return false;
    }
    
    for (var index in WITHDRAW_PRIORITY) {
        var targetType = WITHDRAW_PRIORITY[index];
        targetStructures = roomStorages.filter(structure => structure.structureType == targetType);
        if (!targetStructures.length) {
            continue;
        }

        var targetType = WITHDRAW_PRIORITY[index];
        if (targetType == STRUCTURE_LINK) {
            targetStructures = targetStructures.filter(structure => !structure.room.memory[structure.id]["doOutput"]);
        }

        var target = this.pos.findClosestByRange(targetStructures);
        if (!target) {
            continue;
        }
        var withdrawResult = this.withdraw(target, RESOURCE_ENERGY);
        if (withdrawResult == ERR_NOT_IN_RANGE) {
            this.moveTo(target);
        }
        break;
    }
    return null;
}

Creep.prototype.buildStructure = function() {
    var constructionSites = this.room.find(FIND_MY_CONSTRUCTION_SITES);
    if (constructionSites.length) {
        var targetSite = this.pos.findClosestByPath(constructionSites);
        var buildResult = this.build(targetSite);
        if (buildResult == ERR_NOT_IN_RANGE) {
            this.moveTo(targetSite);
        }
        return true;
    }
    else {
        return false;
    }
}

Creep.prototype.upgradeRoom = function() {
    var upgradeResult = this.upgradeController(this.room.controller);
    if (upgradeResult == ERR_NOT_IN_RANGE) {
        this.moveTo(this.room.controller);
    }
}

Creep.prototype.renewLife = function() {
    this.say("Renew");
    var targetSpawns = this.room.find(FIND_MY_STRUCTURES).filter(structure => structure.structureType == STRUCTURE_SPAWN);
    if (targetSpawns.length) {
        var target = this.pos.findClosestByRange(targetSpawns);
        var renewResult = target.renewCreep(this);
        if (renewResult == ERR_NOT_IN_RANGE) {
            this.moveTo(target);
        }
    }
}

Creep.prototype.findNearbyLink = function() {
    var roomLinks = this.room.find(FIND_MY_STRUCTURES).filter(structure => structure.structureType == STRUCTURE_LINK);
    for (var index in roomLinks) {
        var link = roomLinks[index];
        if (this.pos.inRangeTo(link.pos.x, link.pos.y, 2)) {
            return link;
        }
    }
    return null;
}


Creep.prototype.needToRenew = function() {
    if (!this.memory.hasOwnProperty("renew")) {
        if (this.ticksToLive < 300) {
            this.memory["renew"] = true;
        }
        else {
            this.memory["renew"] = false;
        }
    }
    if (this.memory["renew"]) {
        return true;
    }
    else {
        return false;
    }
}

// Action method, claims the current room the creep is in, returns => [No Value]
Creep.prototype.claimRoom = function() {
    var result = this.claimController(this.room.controller);
    if (result == ERR_NOT_IN_RANGE) {
        this.moveTo(this.room.controller);
    }
}

// Setter method, returns => [No Value]
Creep.prototype.setHomeRoom = function(roomName) {
    this.memory["homeRoom"] = roomName;
    return;
}

// Setter method, returns => [No Value]
Creep.prototype.setTargetRoom = function(roomName) {
    this.memory["targetRoom"] = roomName;
    return;
}

// Property method, returns => [true: creep has been renewed to a good point / false: creep has not be renewed to a good point]
Creep.prototype.isRenewed = function(threshold=1000) {
    if (this.ticksToLive > threshold) {
        return true;
    }
    else {
        return false;
    }
}

// Property method, returns => [true: creep is low on ticks to live / false: creep has enough ticks to live]
Creep.prototype.isDying = function(threshold=300) {
    if (this.ticksToLive < threshold) {
        return true;
    }
    else {
        return false;
    }
}

// Property method, returns => [true: creep has taken damage / false: creep has not taken damage]
Creep.prototype.isDamaged = function() {
    if (this.hits == this.hitsMax) {
        return false;
    }
    else {
        return true;
    }
}

// Property method, returns => [true: creep is tired and can't move / false: creep is not tired and can move]
Creep.prototype.isExhausted = function() {
    if (this.fatigue > 0) {
        return true;
    }
    else {
        return false;
    }
}

// Property method, returns => [true: creep is currently in home room / false: creep is not currently in home room]
Creep.prototype.inHomeRoom = function() {
    if (this.room.name == this.memory["homeRoom"]) {
        return true;
    }
    else {
        return false;
    }
}

// Property method, returns => [true: creep is currently in target room / false: creep is not currently in target room]
Creep.prototype.inTargetRoom = function() {
    if (this.room.name == this.memory["targetRoom"]) {
        return true;
    }
    else {
        return false;
    }
}




// MAIN CODE NO TOUCHY.
for (let creepName in Memory.creeps) {
    if (!Game.creeps[creepName]) {
        delete Memory.creeps[creepName];
    }
}

for (var index in Game.rooms) {
    var targetRoom = Game.rooms[index];
    targetRoom.update();
}