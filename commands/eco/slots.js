const { EmbedBuilder } = require("discord.js")
const { create_command } = require("../../funcs/create_command")

module.exports = create_command({
    name: "slots",
    description: "...",
    profile: true,
    cooldown: 0,
    options: [{
        name: "ставка",
        description: "ставка в QM",
        type: 4,
        minValue: 1000,
        required: true
    }],
    async execute(bot, interaction, data) {
        let user = await data.get(`users.${interaction.user.id}`)
        let bet = interaction.options.getInteger("ставка")
        if(user.qm < bet) {
            let emb = new EmbedBuilder()
            .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
            .setFields({name: "Ошибочка", value: `Ваш баланс меньше ставки! Ставка **${bet} QM**, а баланс **${user.qm} QM**`})
            .setFooter({text: "QM можно заработать через /work и /spin"})
            .setColor(0x2b2d31)
            interaction.reply({embeds: [emb]})
        } else {
            let fr = ["🍇", "🍓", "🍑", "🍒", "🍎"]
            let e = []

            for(let i = 0; i <= 14;i++) {
                e.push(fr[Math.floor(Math.random() * fr.length)])
            }
            let x = 0
            let n = 1
            let l1 = [e[0], e[1], e[2], e[3], e[4]]
            let l2 = [e[5], e[6], e[7], e[8], e[9]]
            let l3 = [e[10], e[11], e[12], e[13], e[14]]
            let l4 = [e[0], e[1], e[7], e[3], e[4]]
            let l5 = [e[10], e[11], e[7], e[13], e[14]]
            let l6 = [e[0], e[6], e[12], e[8], e[4]]
            let l7 = [e[10], e[6], e[2], e[8], e[14]]
            let l8 = [e[0], e[6], e[7], e[8], e[4]]
            let l9 = [e[10], e[6], e[7], e[8], e[14]]
            let linesworked = []
            let l = [l1, l2, l3, l4, l5, l6, l7, l8, l9]
            let ln = 0
            l.forEach((line) => {
                ln++
                let gr = {fr: [], fr2: []}
                let st = {fr: [], fr2: []}
                let pe = {fr: [], fr2: []}
                let vi = {fr: [], fr2: []}
                let ap = {fr: [], fr2: []}
                line.forEach((fruit) => {
                    if(fruit == "🍇") {
                        gr.fr.push(fruit)
                        gr.fr2.push(fruit)
                        st.fr2.push("🤡")
                        pe.fr2.push("🤡")
                        vi.fr2.push("🤡")
                        ap.fr2.push("🤡")
                    }
                    if(fruit == "🍓") {
                        gr.fr2.push("🤡")
                        st.fr.push(fruit)
                        st.fr2.push(fruit)
                        pe.fr2.push("🤡")
                        vi.fr2.push("🤡")
                        ap.fr2.push("🤡")
                    }
                    if(fruit == "🍑") {
                        gr.fr2.push("🤡")
                        st.fr2.push("🤡")
                        pe.fr.push(fruit)
                        pe.fr2.push(fruit)
                        vi.fr2.push("🤡")
                        ap.fr2.push("🤡")
                    }
                    if(fruit == "🍒") {
                        gr.fr2.push("🤡")
                        st.fr2.push("🤡")
                        pe.fr2.push("🤡")
                        vi.fr.push(fruit)
                        vi.fr2.push(fruit)
                        ap.fr2.push("🤡")
                    }
                    if(fruit == "🍎") {
                        gr.fr2.push("🤡")
                        st.fr2.push("🤡")
                        pe.fr2.push("🤡")
                        vi.fr2.push("🤡")
                        ap.fr.push(fruit)
                        ap.fr2.push(fruit)
                    }
                })
                let fru = [gr, st, pe, vi, ap]
                fru.forEach((fruits) => {
                    if(fruits.fr.length == 3) {
                        if((fruits.fr2[0] == "🤡" && fruits.fr2[1] == "🤡")) {
                            n*=3
                        }
                        else if((fruits.fr2[3] == "🤡" && fruits.fr2[4] == "🤡")) {
                            n*=3
                        }
                        else n*=1
                    } else if(fruits.fr.length == 4) {
                        if((fruits.fr2[0] == "🤡") || (fruits.fr2[4] == "🤡")) {
                            n*=4
                        } else n*=1
                    } else if(fruits.fr.length == 5) { 
                        n*=5
                    } else { 
                        n*=1
                    }
                })
            })
    /*
    \`${e[0]}\` | \`${e[1]}\` | \`${e[2]}\` | \`${e[3]}\` | \`${e[4]}\`
    \`${e[5]}\` | \`${e[6]}\` | \`${e[7]}\` | \`${e[8]}\` | \`${e[9]}\`
    \`${e[10]}\` | \`${e[11]}\` | \`${e[12]}\` | \`${e[13]}\` | \`${e[14]}\`
    */

            let emb = new EmbedBuilder()
            .setAuthor({name: `${interaction.user.tag} | Слоты`, iconURL: interaction.user.avatarURL()})
            .setDescription(`
    \`${e[0]}\` | \`${e[1]}\` | \`${e[2]}\` | \`${e[3]}\` | \`${e[4]}\`
    \`${e[5]}\` | \`${e[6]}\` | \`${e[7]}\` | \`${e[8]}\` | \`${e[9]}\`
    \`${e[10]}\` | \`${e[11]}\` | \`${e[12]}\` | \`${e[13]}\` | \`${e[14]}\`
    `)
            .addFields({name: "Объяснение", value: `${n > 1 ? `Вы выиграли **${Math.floor(bet * (n-1))} QM**` : `Вы проиграли **${bet} QM**`}`})
            .setFooter({text: "Множитель: " + (n-1) + "x"})
            .setColor(0x2b2d31)
            interaction.reply({embeds: [emb]})
            let user2 = await data.get(`users.586969283150741524`)
            if(n > 1) user.qm += Math.floor(bet * (n-1))
            else { 
                user.qm -= bet 
                user2.qm += bet
                await data.set(`users.586969283150741524`, user2)
            }
            await data.set(`users.${interaction.user.id}`, user)
        }
    }
})