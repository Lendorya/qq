const user = require("../data/user");
const { run } = require("../funcs/create_command");

module.exports = {
    name: "interactionCreate",
    once: false,
    execute: async(interaction, data, bot) => {
        if (!interaction.isCommand()) return;
        const command = bot.cmds.get(interaction.commandName);
        if (!command) return;
        await data.update(user, "data.users." + interaction.user.id)
        await run(command, bot, interaction, data)
    }
}