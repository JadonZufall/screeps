CONFIG = require("config");

module.exports = function() {
    Room.prototype.update = function() {
        this.validateMemory();
        this.validateSourceMemory();
        this.updateStructures();
        this.updateCreeps();
    };

    Room.prototype.validateMemory = function() {
        if (!this.memory["popCount"]) {
            this.memory["popCount"] = {};
        }
        if (!this.memory["sources"]) {
            this.memory["sources"] = {};
        }
        if (!this.memory["links"]) {
            this.memory["links"] = {};
        }
        if (!this.memory["labs"]) {
            this.memory["labs"] = {};
        }
        if (!this.memory["factorys"]) {
            this.memory["factorys"] = {};
        }
    };

    Room.prototype.resetPopulation = function() {
        var roomMemory = this.room.memory["popCount"];
        for (var [key, val] in Object.entries(CONFIG.CREEP_ROLES)) {
            roomMemory[val] = 0;
        }
        this.room.memory["popCount"] = roomMemory;
    };

    Room.prototype.countPopulation = function() {
        for (var [key, val] in Object.entries(this.room.memory["popCount"])) {
            this.room.memory["popCount"][key] = 0;
        }
        for (var [key, val] in Object.entries(this.room.find(FIND_MY_CREEPS))) {
            this.memory["popCount"][val.getRole()] = val + 1;
        }
    };

    Room.prototype.getPopulation = function(role) {
        return this.room.memory["popCount"][role];
    };

    Room.prototype.validateSourceMemory = function() {
        let sourceOptions = this.find(FIND_SOURCES);
        for (let [key, val] in Object.entries(sourceOptions)) {
            val.validateMemory();
        }
    };

    Room.prototype.updateStructures = function() {
        let structureOptions = this.find(FIND_MY_STRUCTURES);
        for (let [key, val] in Object.entries(structureOptions)) {
            try {
                val.update();
            }
            catch(error) {
                console.log(error);
            }
        }
    };

    Room.prototype.updateCreeps = function() {
        let creepOptions = this.find(FIND_MY_CREEPS);
        for (let [key, val] in Object.entries(structureOptions)) {
            try {
                val.update();
            }
            catch(error) {
                console.log(error);
            }
        }
    };

    Room.prototype.findStorages = function() {
        var result = this.find(FIND_STRUCTURES);
        result = result.filter(obj => obj.hasOwnProperty("store"));
        return result;
    };
}