const { EmbedBuilder } = require("discord.js")
const { create_command } = require("../../funcs/create_command")

module.exports = create_command({
    name: "cooldowns",
    description: "...",
    profile: true,
    execute: async(bot, interaction, data) => {
        let user = await data.get(`users.${interaction.user.id}`)
        let cds = []
        for(let key in user.cooldowns) {
            let cmd = bot.application.commands.cache.find(cmd => cmd.name == key)
            cds.push(`- </${key}:${cmd.id}>: ${user.cooldowns[key] + (bot.cmds.get(key).cooldown*60*1000) > Date.now() ? `**<t:${Math.floor((await data.get(`users.${interaction.user.id}.cooldowns.${key}`) + (bot.cmds.get(key).cooldown*60*1000))/1000)}:f>**` : "**Уже доступна**"}`)
        }
        let embed = new EmbedBuilder()
            .setAuthor({name: `${interaction.user.tag} | Перезарядка команд`, iconURL: interaction.user.avatarURL()})
            .setDescription(`${cds.join("\n")}`)
            .setColor(0x2b2d31)
        interaction.reply({embeds: [embed]})
    }
})  