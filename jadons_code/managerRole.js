const roleBuilder = require("roleBuilder");
const roleCleaner = require("roleCleaner");
const roleDefault = require("roleDefault");
const roleDriller = require("roleDriller");
const rolePusher = require("rolePusher");

module.exports = {
    "builder": roleBuilder,
    "cleaner": roleCleaner,
    "default": roleDefault,
    "driller": roleDriller,
    "pusher": rolePusher,

    getPopulationTemplate: function() {
        return {
            "builder": 0,
            "cleaner": 0,
            "default": 0,
            "driller": 0,
            "pusher": 0,
        };
    }
}