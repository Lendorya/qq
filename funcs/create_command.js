const { Client, Interaction } = require("discord.js")
const Responce = require("./responce.js")
const logger = require("./logger.js")
const Database = require("./database.js")
const config = require("../config.js")

module.exports = {
    /**
     * @param {import("../typings.d.ts").cmd_options} command
     */
    create_command: (command) => {
        return command
    },
    /**
     * @param {import("../typings.d.ts").cmd_options} command 
     * @param {Client} bot 
     * @param {Interaction} interaction
     * @param {Database} data
     */
    run: async(command, bot, interaction, data) => {
        if(command.dev_only && interaction.user.id != "586969283150741524") 
            await new Responce(interaction, command, bot, data).forDev()
        else if(command.cooldown && (await data.get(`users.${interaction.user.id}.cooldowns.${command.name}`) + (command.cooldown*60*1000)) > Date.now() && interaction.user.id != "586969283150741524")
            await new Responce(interaction, command, bot, data).cooldown()
        else 
            command.execute(bot, interaction, data)
                .then(() => {
                        if(command.cooldown)
                            data.set(`users.${interaction.user.id}.cooldowns.${command.name}`, Date.now())
                    }, 
                    async(error) => {
                        logger.error(error)
                        new Responce(interaction, command, bot, data).unexpectedErr(error)
                    }
                )
    }
}