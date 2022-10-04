module.exports = function() {
    /**
     * Updates the target creep to perform it's role.
     */
    Creep.prototype.update = function() {
        this.updateMemory();
        if (this.updateGeneral()) {
            return;
        }
        let role = this.getRole();
        if (role == "none") {
            this.say("Unassigned role!");
        }
        else if (role == "default") {
            
        }
    };

    Creep.prototype.updateGeneral = function() {
        if (this.getRenew()) {
            this.renewTicks();
            return true;
        }
        else {
            return false;
        }
    };

    Creep.prototype.validateMemory = function() {
        if (!this.memory["role"]) {
            this.memory["role"] = "none";
        }
        if (!this.memory["working"]) {
            this.memory["working"] = false;
        }
        if (!this.memory["renew"]) {
            this.memory["renew"] = false;
        }
        if (!this.memory["spawnRoom"]) {
            this.memory["spawnRoom"] = this.room.name;
        }
        if (!this.memory["targetRoom"]) {
            this.memory["targetRoom"] = this.room.name;
        }
        if (!this.memory["source"]) {
            this.memory["source"] = null;
        }
    };

    Creep.prototype.updateMemory = function() {
        if (this.store.getFreeCapacity(RESOURCES_ALL) == 0) {
            this.memory["working"] = false;
        }
        else if (this.store.getUsedCapacity(RESOURCES_ALL) == 0) {
            this.memory["working"] = true;
        }
        if (this.ticksToLive < 300) {
            this.memory["renew"] = true;
        }
        else if (this.ticksToLive > 1000) {
            this.memory["renew"] = false;
        }
    };
    
    /** 
     * Gets the role of the target creep.
     * @returns {String}    The role of the creep.
    */
    Creep.prototype.getRole = function() {
        return this.memory["role"];
    };
    
    /**
     * Sets the role of the target creep.
     * @param {String} role     The role you wish to set the creep to. 
     */
    Creep.prototype.setRole = function(role) {
        this.memory["role"] = role;
        return;
    };

    Creep.prototype.getWorking = function() {
        return this.memory["working"];
    };

    Creep.prototype.getRenew = function() {
        return this.memory["renew"];
    };

    Creep.prototype.getSpawnRoom = function() {
        return this.memory["spawnRoom"];
    };

    Creep.prototype.setSpawnRoom = function(target) {
        this.memory["spawnRoom"] = target.name;
    };

    Creep.prototype.getTargetRoom = function() {
        return this.memory["targetRoom"];
    };

    Creep.prototype.setTargetRoom = function(target) {
        this.memory["targetRoom"] = target.name;
    };

    Creep.prototype.getSource = function() {
        return Game.getObjectById(this.memory["source"]);
    };

    Creep.prototype.setSource = function(target) {
        if (this.memory["source"]) {
            this.delSource();
        }
        if (target.hasOwnProperty("id")) {
            this.memory["source"] = target.id;
            this.room.memory["sources"][target.id]["creeps"].push(this.id);
        }
        else {
            this.memory["source"] = target;
            this.room.memory["sources"][target]["creeps"].push(this.id);
        }
    };

    Creep.prototype.delSource = function() {
        var roomSourceMemory = this.room.memory["sources"][this.memory["source"]]["creeps"];
        this.room.memory["sources"][this.memory["source"]]["creeps"] = roomSourceMemory.filter(id => id != this.id);
    }

    Creep.prototype.getInSpawnRoom = function() {
        if (this.room.name == this.getSpawnRoom()) {
            return true;
        }
        else {
            return false;
        }
    };

    Creep.prototype.getInTargetRoom = function() {
        if (this.room.name == this.getTargetRoom()) {
            return true;
        }
        else {
            return false;
        }
    };

    /**
     * Calculates the distance between the target creep and another position.
     * @param  {...any} args    Either a target object, target RoomPosition, or xy positional values. 
     * @returns {Number}        Distance to position provided.
     */
    Creep.prototype.getDistance = function(...args) {
        let x1 = this.pos.x;
        let y1 = this.pos.y;
        if (args.length == 2) {
            let x2 = args[0];
            let y2 = args[1];
            return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5;
        }
        else if (args.length == 1) {
            if (args[0].hasOwnProperty("pos")) {
                let x2 = args[0].pos.x;
                let y2 = args[0].pos.y;
                return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5;
            }
            else if (args[0].hasOwnProperty("x") && args[0].hasOwnProperty("y")) {
                let x2 = args[0].x;
                let y2 = args[0].y;
                return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5;
            }
            else {
                let x2 = args[0][0];
                let y2 = args[0][1];
                return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5;
            }
        }
        else {
            return ERR_INVALID_ARGS;
        }
    };

    /**
     * Renews a creeps ticksToLive in the creeps spawn room. 
     */
    Creep.prototype.renewTicks = function() {
        var spawnRoom = Game.rooms[this.getSpawnRoom()]
        if (!spawnRoom) {
            this.localRenewTicks();
            return;
        }
        var targetOptions = spawnRoom.find(FIND_MY_SPAWNS);
        var closestOption = this.pos.findClosestByPath(targetOptions);
        var result = closestOption.renewCreep(this);
        if (result == ERR_NOT_IN_RANGE) {
            this.moveTo(closestOption);
        }
    };

    /**
     * Renews a creeps ticksToLive in the current room.
     */
    Creep.prototype.localRenewTicks = function() {
        var targetOptions = this.room.find(FIND_MY_SPAWNS);
        var closestOption = this.pos.findClosestByPath(targetOptions);
        var result = closestOption.renewCreep(this);
        if (result == ERR_NOT_IN_RANGE) {
            this.moveTo(closestOption);
        }
    };

    Creep.prototype.assignSource = function(resourceType) {
        if (resourceType == RESOURCE_ENERGY) {
            var sourceOptions = this.room.memory["sources"];
            var minLength = Number.POSITIVE_INFINITY;
            var minValues = [];
            for (var [key, val] in Object.entries(sourceOptions)) {
                let length = val["creeps"].length;
                if (length < minLength) {
                    minLength = length;
                    minValues = [key];
                }
                else if (length == minLength) {
                    minValues.push(key);
                }
            }
            var validSources = minValues.map(id => Game.getObjectById(id));
            var targetSource = this.pos.findClosestByRange(validSources);
            this.setSource(targetSource);
        }
        else {
            var sourceOptions = this.room.find(FIND_MINERALS);
            var targetSource = this.pos.findClosestByRange(sourceOptions[0]);
            this.setSource(targetSource);
        }
    };

    Creep.prototype.getSource = function() {
        if (this.memory["source"]) {
            return Game.getObjectById(this.memory["source"]);
        }
        var sourceOptions = this.room.memory["sources"];
        var minLength = Number.POSITIVE_INFINITY;
        var minValues = [];
        for (var [key, val] in Object.entries(sourceOptions)) {
            let length = val["creeps"].length;
            if (length < minLength) {
                minLength = length;
                minValues = [key];
            }
            else if (length == minLength) {
                minValues.push(val);
            }
        }
        var validSources = minValues.map(id => Game.getObjectById(id));
        var targetSource = this.pos.findClosestByRange(validSources);
        this.setSource(targetSource);
        return targetSource;
    };

    Creep.prototype.harvestEnergy = function() {
        if (!this.getInTargetRoom) {
            this.moveToTargetRoom();
            return;
        }
        var target = this.getSource();
        var result = this.harvest(targetSource);
        if (result == ERR_NOT_IN_RANGE) {
            this.moveTo(target);
        }
    };

    Creep.prototype.depositEnergy = function() {

    };

    Creep.prototype.withdrawEnergy = function() {

    };

    Creep.prototype.harvestResource = function(resourceType) {
        let target = this.getSource();
        if (target instanceof Resource && resourceType == RESOURCE_ENERGY) {
            this.assignSource(resourceType);
            target = this.getSource();
        }
        else if (target instanceof Source && resourceType != RESOURCE_ENERGY) {
            this.assignSource(resourceType);
            target = this.getSource();
        }
        let result = this.harvest(target);
        if (result == ERR_NOT_IN_RANGE) {
            this.moveTo(result);
        }
    };

    Creep.prototype.withdrawResource = function(resourceType) {

    };

    Creep.prototype.depositResource = function(resourceType) {
        var storageOptions = this.room.findStorages();
        if (!storageOptions.length) {
            this.say("NoStorages");
            return;
        }
        if (resourceType == RESOURCE_ENERGY) {
            storageOptions = storageOptions.filter(obj => obj.store.getFreeCapacity(RESOURCE_ENERGY) != 0);
        }
        else {
            storageOptions = storageOptions.filter(obj => obj.store.getFreeCapacity(RESOURCES_ALL) != 0);
        }
        var target = this.pos.findClosestByPath(storageOptions);
        var result = this.transfer(target, resourceType);
        if (result == ERR_NOT_IN_RANGE) {
            this.moveTo(target);
        }
    };

    Creep.prototype.upgradeRoom = function() {
        var target = this.room.controller;
        var result = this.upgradeController(target);
        if (result == ERR_NOT_IN_RANGE) {
            this.moveTo(result);
        }
    };
    
    Creep.prototype.roleDefault = function() {
        if (this.getWorking()) {
            this.harvestResource();
        }
        else {
            this.upgradeRoom();
        }
    };

    Creep.prototype.moveToTargetRoom = function() {

    };
}