const { EmbedBuilder, InteractionResponse } = require("discord.js")
const { create_command } = require("../../funcs/create_command")

module.exports = create_command({
    name: "stat",
    description: "...",
    async execute(bot, interaction, data) {
        let users = await data.get("users")
        let users2 = []
        for(let key in users) {
            users2.push({id: key, info: users[key].qm})
        }
        users2 = users2.sort(function (a, b) {
            if (a.info > b.info) {
                return -1;
            }
            if (a.info < b.info) {
                return 1;
            }
            return 0;
        })
        let a = new EmbedBuilder()
            .setTitle("а")
        if(users2.length == 0) {
            a.setDescription("Пусто.")
        } else {
            for(let f = 1; f <= users2.length; f++) {
                a.addFields({
                    name: `[${f}] ${bot.users.cache.get(users2[f-1].id).tag}`,
                    value: `- **${users2[f-1].info} QM**`,
                    inline: true
                })
            }
        }
        interaction.reply({embeds: [a]})
        console.log(await data.db.get("data"))
    }
})