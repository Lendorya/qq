const { EmbedBuilder } = require("discord.js")
const { create_command } = require("../../funcs/create_command")

module.exports = create_command({
    name: "work",
    description: "...",
    profile: true,
    cooldown: 5,
    async execute(bot, interaction, data) {
        let user = await data.get(`users.${interaction.user.id}`)
        let users = await data.get("users")
        let i = 0
        let qcm = []
        for (let key in users) {
            if (users[key].qm > 0 || users[key].qc > 0) {
                i++
                qcm.push({qc: users[key].qc, qm: users[key].qm})
            }
        }
        let c = 0
        let m = 0
        qcm.forEach((qmc) => {
            c += qmc.qc
            m += qmc.qm
        })
        let vlv = (((user.qm + user.qc)/(c+m))) || 1
        let qm = Math.floor((Math.random() * (100 * user.work_lvl)) + 1)
        let monQM = Math.floor(qm*(vlv)) + qm
        user.qm += monQM
        let emb = new EmbedBuilder()
            .setAuthor({name: `${interaction.user.tag} | Работа`, iconURL: interaction.user.avatarURL()})
            .setDescription(`- Очень постаравшись вы заработали **${monQM} QM**\n- Текущий баланс: **${user.qm} QM**`)
            .setColor(0x2b2d31)
        if(monQM >= Math.floor(((75*(1-vlv))).toFixed(2)) * user.work_lvl) {
            if(Math.floor((Math.random() * 10) + 1) >= 9) {
                let monQC = Math.floor((Math.random() * 5 * user.work_lvl) + 1)
                if(Math.floor((Math.random() * 50) + 1) >= 40) {
                    user.work_lvl += 1
                    emb.setFooter({text: `Уровень работника повышен! Тек. уровень: ${user.work_lvl}`})
                }
                emb.addFields({name: "Премия!", value: `- Вашему работодателю понравились ваши усилия! Премия: **${monQC} QC**`})
                user.qc += monQC
            }
        }
        await data.set(`users.${interaction.user.id}`, user)
        interaction.reply({embeds: [emb]})
    }
})