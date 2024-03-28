const { EmbedBuilder } = require("discord.js");
const npp = require("../../data/npp");
const { create_command } = require("../../funcs/create_command")
const { embedfail } = require("../../funcs/logger");

module.exports = create_command({
    name: "npp",
    description: "...",
    dev_only: true,
    options: [
        {
            type: 1,
            name: "buy",
            description: "..."
        },
        {
            type: 1,
            name: "info",
            description: "..."
        },
        {
            type: 1,
            name: "collect",
            description: "..."
        },
        {
            type: 1,
            name: "upgrade",
            description: "...",
            options: [
                {
                    name: "модуль",
                    type: 3,
                    choices: [
                        {
                            name: "Кол-во энергоблоков",
                            value: "e_blocks"
                        },
                        {
                            name: "Размер АЭС",
                            value: "size"
                        },
                        {
                            name: "Мощность АЭС",
                            value: "power"
                        }
                    ],
                    description: "Модуль АЭС, который вы хотите улучшить",
                    required: true
                }
            ]
        }
    ],
    execute: async(bot, interaction, data) => {
        let user = await data.get(`users.${interaction.user.id}`)
        switch(interaction.options.getSubcommand()) {
            case "buy":
                if(user.businesses.npp || user.has_work) {
                    await embedfail(interaction, `${user.businesses.npp ? "- У вас уже есть АЭС!" : "- Вы уже работаете на другой работе!"}`)
                } else if(user.qc < 15000) {
                    await embedfail(interaction, `- Недостаточно QC! У вас **${user.qc} QC**, а нужно **15000 QC**`)
                } else if(user.work_lvl < 20) {
                    await embedfail(interaction, `- Вы не можете владеть АЭС\n- Необходим **20** уровень работника`)
                } else {
                    await data.update(npp, `data.npps.${interaction.user.id}`)
                    let nNpp = await data.get(`npps.${interaction.user.id}`)
                    nNpp.last_collect = Date.now()
                    nNpp.owner = interaction.user.id
                    await data.set(`npps.${interaction.user.id}`, nNpp)
                    const embed = new EmbedBuilder()
                        .setAuthor({name: `${interaction.user.tag} | Покупка АЭС`, iconURL: interaction.user.avatarURL()})
                        .setDescription(`Вы успешно приобрели АЭС!\n- Чтобы собрать прибыль введите \`/npp collect\``)
                        .setColor(0x2b2d31)
                    user.businesses.npp = true
                    user.qc -= 15000
                    await data.set(`users.${interaction.user.id}`, user)

                    interaction.reply({embeds: [embed]})
                }
                break
            case "info":
                if(!user.businesses.npp) {
                    await embedfail(interaction, "- У вас нет АЭС!")
                } else {
                    let nNpp = await data.get(`npps.${interaction.user.id}`)
                    let wrk = await data.get(`users.${nNpp.owner}.work_lvl`)/10
                    let embed = new EmbedBuilder()
                        .setAuthor({name: `${interaction.user.tag} | АЭС`, iconURL: interaction.user.avatarURL()})
                        .addFields([
                            {name: "Владелец", value: `- **${bot.users.cache.get(nNpp.owner).tag}**`, inline: true},
                            {name: "Общ. уровень", value: `- **${nNpp.power + nNpp.size + (nNpp.e_blocks*2)} ур.**`, inline: true},
                            {name: "Запущена", value: `- **<t:${Math.floor(nNpp.last_collect / 1000)}:f>**`, inline: true},
                            {name: "Доход", value: `- **${nNpp.salary * nNpp.workers * (nNpp.power + nNpp.size + (nNpp.e_blocks*2)) * wrk} QC/день**`, inline: true},
                            {name: "Работников", value: `- **${nNpp.workers} / ${nNpp.max_workers} чел.**`, inline: true},
                            {name: "Заработано", value: `- **${Math.floor(nNpp.salary * nNpp.workers * (nNpp.power + nNpp.size + (nNpp.e_blocks*2)) * wrk * ((Date.now() - nNpp.last_collect)/(1000*60*60*24)))} QC**`, inline: true}
                        ])
                        .setColor(0x2b2d31)
                    interaction.reply({embeds: [embed]})
                }
                break;
            case "upgrade":
                break;
            case "collect":
                if(!user.businesses.npp) {
                    await embedfail(interaction, `- Вы не владеете АЭС!`)
                } else {
                    let nNpp = await data.get(`npps.${interaction.user.id}`)
                    if(((Date.now() - nNpp.last_collect)/(1000*60*60*24)) < 0.5) {
                        console.log(((Date.now() - nNpp.last_collect)/(1000*60*60*24)))
                        embedfail(interaction, "АЭС должно работать **12 часов**")
                    } else {
                        let wrk = await data.get(`users.${nNpp.owner}.work_lvl`)/10
                        let sal = Math.floor(nNpp.salary * nNpp.workers * (nNpp.power + nNpp.size + (nNpp.e_blocks*2)) * wrk * ((Date.now() - nNpp.last_collect)/(1000*60*60*24)))
                        user.qc += Math.floor(sal/nNpp.workers)
                        await data.set(`users.${interaction.user.id}`, user)
                        let embed = new EmbedBuilder()
                            .setAuthor({name: `${interaction.user.tag} | АЭС`, iconURL: interaction.user.avatarURL()})
                            .setDescription(`- Вы успешно собрали **${sal} QC** с АЭС\n- В следующий раз вы сможете собрать прибыль только в **<t:${Math.floor((Date.now() + (1000*60*60*24))/1000)}:f>**`)
                            .setColor(0x2b2d31)
                        nNpp.last_collect = Date.now()
                        await data.set(`npps.${interaction.user.id}`, nNpp)
                        interaction.reply({embeds: [embed]})
                    }
                }
                break;
        }
    }
})