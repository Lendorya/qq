const { EmbedBuilder } = require("discord.js")
const { create_command } = require("../../funcs/create_command")

module.exports = create_command({
    name: "spin",
    description: "...",
    profile: true,
    cooldown: 60,
    async execute(bot, interaction, data) {
        let pr = [
            {name: "qc", emoji: "✨", amount: [
                {a: 1, b: 50, am: 50},
                {a: 50, b: 70, am: 100},
                {a: 70, b: 80, am: 500},
                {a: 80, b: 90, am: 1000},
                {a: 90, b: 95, am: 2000},
                {a: 95, b: 100, am: 2500}
            ]},
            {name: "qm", emoji: "💰", amount: [
                {a: 1, b: 50, am: 1000},
                {a: 50, b: 70, am: 5000},
                {a: 70, b: 80, am: 10000},
                {a: 80, b: 90, am: 15000},
                {a: 90, b: 95, am: 20000},
                {a: 95, b: 100, am: 25000}
            ]},
            {name: "qdc", emoji: "🎁", amount: [
                {a: 1, b: 50, am: 1},
                {a: 50, b: 70, am: 5},
                {a: 70, b: 80, am: 10},
                {a: 80, b: 90, am: 15},
                {a: 90, b: 95, am: 20},
                {a: 95, b: 100, am: 25}
        ]},
            {name: "bomb", emoji: "🧨"}
        ]
        let pr2 = []
        for(let i = 0; i <= 6;i++) {
            let rnd = Math.floor(Math.random() * 4)
            pr2.push(pr[rnd])
        }
        let rand = Math.floor(Math.random() * 100) + 1
        let amount = 0
        if(pr2[3].name != "bomb") {
            if(pr2[3].amount[0].a <= rand && rand < pr2[3].amount[0].b ) amount = pr2[3].amount[0].am
            else if(pr2[3].amount[1].a <= rand && rand < pr2[3].amount[1].b ) amount = pr2[3].amount[1].am
            else if(pr2[3].amount[2].a <= rand && rand < pr2[3].amount[2].b ) amount = pr2[3].amount[2].am
            else if(pr2[3].amount[3].a <= rand && rand < pr2[3].amount[3].b ) amount = pr2[3].amount[3].am
            else if(pr2[3].amount[4].a <= rand && rand < pr2[3].amount[4].b ) amount = pr2[3].amount[4].am
            else if(pr2[3].amount[5].a <= rand && rand <= pr2[3].amount[5].b ) amount = pr2[3].amount[5].am
            else amount = 0
        } else amount = 0
        let pr3 = []
        let i = 1
        pr2.forEach(p => {
            if(i == 4) pr3.push(`\`[ ${p.emoji} ]\``)
            else pr3.push(`\`${p.emoji}\``)
            i++
        })
        let emb = new EmbedBuilder()
            .setAuthor({name: `${interaction.user.tag} | Колесо с наградами`, iconURL: interaction.user.avatarURL()})
            .setFields({name: "Колесо наград", value: pr3.join(" | ")}, {name: "Объяснение", value: `- Вы получили ${pr2[3].name != "bomb" ? `**${amount} ${(pr2[3].name).toUpperCase()}**` : `**ничего**`}`})
            .setColor(0x2b2d31)
        let user = await data.get(`users.${interaction.user.id}`)
        user[pr2[3].name] += amount
        await data.set(`users.${interaction.user.id}`, user)
        interaction.reply({embeds:[emb]})
    }
})