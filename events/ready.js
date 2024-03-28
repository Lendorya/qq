const logger = require("../funcs/logger")

module.exports = {
    name: "ready",
    once: true,
    execute: async(bot, data) => {
        logger.success("Кванта запущена!")
    }
}