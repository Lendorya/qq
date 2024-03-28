const { EmbedBuilder } = require("discord.js")
const { create_command } = require("../../funcs/create_command")
const { embedfail } = require("../../funcs/logger")

module.exports = create_command({
    name: "eco",
    description: "...",
    profile: true,
    async execute(bot, interaction, data) {
        let users = await data.get("users")
        let qcm = []
        let i = 0
        for (let key in users) {
            if (users[key].qm > 0 && users[key].qc > 0) {
                i++
                qcm.push({qc: users[key].qc, qm: users[key].qm})
            }
        }
        if(i == 0) {
            embedfail(interaction, "Слишком мало информации, чтобы подвести статистику экономики")
        } else {
            let c = 0
            let m = 0
            qcm.forEach((qmc) => {
                c += qmc.qc
                m += qmc.qm
            })
            let embed = new EmbedBuilder()
                .setAuthor({name: `${interaction.user.tag} | Статистика экономики`, iconURL: interaction.user.avatarURL()})
                .addFields({name: `Основная информация`, value: `Сред. QC: **${Math.floor(c/i)}**\nСред. QM: **${Math.floor(m/i)}**\nКурс QC: **${Math.floor((Math.sqrt(c+m))/i)} QM**`})
                .setFooter({text: `Участников экономики: ${i}`})
                .setColor(0x2b2d31)
            interaction.reply({embeds: [embed]})
        }
    }
})