const { EmbedBuilder } = require("discord.js")
const { create_command } = require("../../funcs/create_command")
let rewe = {
    "work_lvl": "Уровень работника повышен на **{a}**",
    "qm": "Вы получили **{a} QM**",
    "qc": "Вы получили **{a} QC**",
    "qdc": "Вы получили **{a} QDC**"
}


module.exports = create_command({
    name: "daily",
    description: "...",
    profile: true,
    cooldown: 24*60,
    execute: async(bot, interaction, data) => {
        let user = await data.get(`users.${interaction.user.id}`)
        let rewards = [
            {name: "work_lvl", emoji: "🔼", amount: (() => { return 1 })},
            {name: "qm", emoji: "💰", amount: (() => Math.floor((Math.random() * 2000) + 1))},
            {name: "qc", emoji: "🧧", amount: (() => Math.floor((Math.random() * 200) + 1))},
            {name: "qc", emoji: "✨", amount: (() => Math.floor((Math.random() * 50) + 1))},
            {name: "qdc", emoji: "🎁", amount: (() => Math.floor((Math.random() * 5) + 1))}
        ]
        if(user.rewards.length == 0) {
            for(let i = 0; i <= 6;i++) {
                let rnd = Math.floor(Math.random() * rewards.length)
                let rewa = rewards[rnd].amount()
                user.rewards.push({name: rewards[rnd].name, emoji: rewards[rnd].emoji, amount: rewa})
            }
        }
        let reward = user.rewards[user.daily]
        /*if(user.daily == 6) {
            user.daily = 0
            for(let i = 0; i <= 6;i++) {
                let rnd = Math.floor(Math.random() * rewards.length)
                user.rewards.push(rewards[rnd])
            }
        }*/
        let rew1 = []
        let i = 0
        user.rewards.forEach((rew) => {
            if(i == user.daily) rew1.push(`[ \`${rew.emoji}\` ]`)
            else rew1.push(`\`${rew.emoji}\``)
            i++
        })

        let embed = new EmbedBuilder()
            .setAuthor({name: `${interaction.user.tag} | Ежедневная награда`, iconURL: interaction.user.avatarURL()})
            .setFields({
                name: "Награды",
                value: `${rew1.join(` | `)}`
            },
            {
                name: "Объяснение",
                value: `${rewe[reward.name].replace("{a}", reward.amount)}`
            })
            .setColor(0x2b2d31)

        interaction.reply({embeds: [embed]})
        user[reward.name] += reward.amount
        user.daily += 1
        if(user.daily > 6) {
            user.daily = 0
            user.rewards = []
            for(let i = 0; i <= 6;i++) {
                let rnd = Math.floor(Math.random() * rewards.length)
                let rewa = rewards[rnd].amount()
                user.rewards.push({name: rewards[rnd].name, emoji: rewards[rnd].emoji, amount: rewa})
            }
        }
        await data.set(`users.${interaction.user.id}`, user)
    }
})