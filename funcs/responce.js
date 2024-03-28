const { Client } = require("discord.js")
const logger = require("../funcs/logger")
const Database = require("./database.js")

module.exports = class Responce {
    /**
     * 
     * @param {import("discord.js").Interaction} interaction 
     * @param {import("../typings.d.ts").cmd_options} command
     * @param {Client} bot 
     * @param {Database} data
     */
    constructor(interaction, command, bot, data) {
        this.interaction = interaction
        this.command = command
        this.bot = bot
        this.data = data
    }

    async cooldown() {
        logger.embedfail(
            this.interaction, 
            `- Не так быстро! Команда будет доступна **<t:${Math.floor((await this.data.get(`users.${this.interaction.user.id}.cooldowns.${this.command.name}`) + (this.command.cooldown*60*1000))/1000)}:f>**`
        )
    }

    async forDev() {
        logger.embedfail(
            this.interaction, 
            "- Команда доступна **только разработчику**, к сожалению"
        )
    }

    async unexpectedErr(error) {
        logger.embedfail(
            this.interaction,
            `- Случилась неожиданная ошибка\n- Команда будет заблокирована до исправления ошибки`
        )
        this.command.dev_only = true
        this.bot.cmds.set(this.command.name, this.command)
        this.bot.users.cache.find(user => user.id == "586969283150741524").send(`Случилась ошибка в команде ${this.command.name}\n- Код ошибки: \n\`\`\`js\n${error}\`\`\``)
    }
}