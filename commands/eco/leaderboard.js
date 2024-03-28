const { EmbedBuilder } = require("discord.js")
const { create_command } = require("../../funcs/create_command")
const { embedfail } = require("../../funcs/logger")

module.exports = create_command({
    name: "leaderboard",
    description: "...",
    profile: true,
    options: [
        {
            name: "тип",
            description: "...",
            type: 3,
            choices: [
                {
                    name: "QM",
                    value: "qm"
                },
                {
                    name: "QC",
                    value: "qc"
                }
            ],
            required: true
        }
    ],
    async execute(bot, interaction, data) {
        let choice = interaction.options.getString("тип")
        let users = await data.get("users")
        let users2 = []
        for(let key in users) {
            users2.push({id: key, info: users[key][choice]})
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
            .setAuthor({name: `Таблица лидеров [${choice.toUpperCase()}]`, iconURL: interaction.user.avatarURL()})
            .setColor(0x2b2d31)
        if(users2.length == 0) {
            a.setDescription("Пусто.")
        } else {
            for(let f = 1; f <= users2.length; f++) {
                a.addFields({
                    name: `[${f}] ${bot.users.cache.get(users2[f-1].id).tag}`,
                    value: `- **${users2[f-1].info} ${choice.toUpperCase()}**`,
                    inline: true
                })
            }
        }
        interaction.reply({embeds: [a]})
    }
})