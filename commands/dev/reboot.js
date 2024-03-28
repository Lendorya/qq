const { create_command } = require("../../funcs/create_command")
const { readdirSync } = require("fs")
const Responce = require("../../funcs/responce")

module.exports = create_command({
    name: "reboot",
    description: "...",
    dev_only: true,
    options: [{
        name: "команда",
        description: "...",
        type: 3,
        required: true
    }],
    execute: async(bot, interaction, db) => {
        let command = interaction.options.getString("команда")
        let cmd = bot.cmds.get(command)
        const commandFolders = readdirSync("./commands");

        const folderName = commandFolders.find((folder) =>
            readdirSync(`./commands/${folder}`).includes(`${command}.js`)
        );
        delete require.cache[
            require.resolve(`../${folderName}/${command}.js`)
        ];
        try {
            let new_command = require(`../../commands/${folderName}/${command}.js`)
            let command_info = {
                name: new_command.name,
                description: new_command.description,
                options: new_command.options || [],
                defaultMemberPermissions: new_command.def_perms || 0n,
                nsfw: new_command.nsfw || false,
                execute: new_command.execute,
                profile: new_command.profile,
                dev_only: command.dev_only || false,
                cooldown: new_command.cooldown
            }
            bot.cmds.set(command_info.name, command_info);
            interaction.reply(`# Перезагрузка команд\n> Команда ${new_command.name} была успешно перезагружена`)
        } catch (error) {
            new Responce(interaction, new_command, bot, db).unexpectedErr(error)
        }
    }
})