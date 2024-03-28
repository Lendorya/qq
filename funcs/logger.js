const chalk = require('chalk');
const date = new Date(Date.now())
const {EmbedBuilder, Interaction} = require( "discord.js" )
let time = () => {
    let dateObject = {hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds()}
    if(dateObject.hours < 10) dateObject.hours = `0${dateObject.hours}`
    if(dateObject.minutes < 10) dateObject.minutes = `0${dateObject.minutes}`
    if(dateObject.seconds < 10) dateObject.seconds = `0${dateObject.seconds}`
    let dateString = `[${dateObject.hours}:${dateObject.minutes}:${dateObject.seconds}]`
    return dateString
}
// беб
module.exports = {
    /**
     * @param {Error} message
     */
    error: (message) => {
        console.log(`${chalk.hex("#282828")(time())} ${chalk.red(`[ОШИБКА] ${message}`)}`)
    },
    /**
     * @param {string} message
     */
    info: (message) => {
        console.log(`${chalk.hex("#282828")(time())} ${chalk.hex("#00BFFF")(`[ИНФО] ${message}`)}`)
    },
    /**
     * @param {string} message
     */
    warn: (message) => {
        console.log(`${chalk.hex("#282828")(time())} ${chalk.hex("#FF9900")("[ВНИМАНИЕ] " + message)}`)
    },
    /**
     * @param {string} message
     */
    success: (message) => {
        console.log(`${chalk.hex("#282828")(time())} ${chalk.hex("#32CD32")("[УСПЕШНО] " + message)}`)
    },
    /**
     * @param {Interaction} interaction
     * @param {string} description
     */
    embedfail: (interaction, description) => {
        interaction.reply({
            embeds: [new EmbedBuilder({author: {iconURL: interaction.user.avatarURL(), name: "Ошибка"}, description: description, color: 0x2b2d31})]
        })
    }
}