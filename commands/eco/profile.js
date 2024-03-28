const { EmbedBuilder } = require("discord.js")
const { create_command }= require("../../funcs/create_command")


module.exports = create_command({
    name: "profile",
    description: "...",
    reqProfile: true,
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
        let vlv = (((user.qm + user.qc)/(c+m))*100).toFixed(2)
        let emb = new EmbedBuilder()
            .setAuthor({name: `${interaction.user.tag} | Профиль`, iconURL: interaction.user.avatarURL()})
            .addFields({name: "Основная информация", value: `- Баланс: **${user.qm} QM, ${user.qc} QC, ${user.qdc} QDC**\n- Уровень работника: **${user.work_lvl}**\n- Влияние: **${(vlv < 0.01 ? "< 0.01" : vlv > 99.99 ? "> 99.99" : vlv) || "0.00"}%**`})
            .setColor(0x2b2d31)
        interaction.reply({embeds: [emb]})
    }
})