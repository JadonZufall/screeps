const memTools = require("memTools");
const creepLoop = require("creepLoop");
const roomLoop = require("roomLoop");
const spawnLoop = require("spawnLoop");

var creepCounts = roomLoop.run();

memTools.creepMemCleaner();

var requiredCreeps = creepLoop.run(creepCounts);

spawnLoop.run(requiredCreeps)
