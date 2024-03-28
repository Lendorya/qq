const { Client, Collection, ActivityType } = require("discord.js");
const { readdirSync } = require("fs")
const configs = require("./config");
const logger = require("./funcs/logger");
const Database = require("./funcs/database.js");
const data = require("./data/data");
const npp = require("./data/npp.js");

const quanta = new Client({
    intents: 131071
});

quanta.cmds = new Collection();
let database = new Database()

readdirSync("./commands")
    .forEach(dir => {
        readdirSync(`./commands/${dir}`)
            .forEach(file => {
                const command = require(`./commands/${dir}/${file}`);
                if (!command.name || !command.description || !command.execute) {
                    logger.warn(`Команда [${dir}/${file}.js] не загружена`);
                    logger.info(`${!command.name} ${!command.description} ${!command.execute}`)
                } else {
                    let command_info = {
                        name: command.name,
                        description: command.description,
                        options: command.options || [],
                        defaultMemberPermissions: command.def_perms || 0n,
                        nsfw: command.nsfw || false,
                        execute: command.execute,
                        profile: command.profile,
                        dev_only: command.dev_only || false,
                        cooldown: command.cooldown
                    }
                    quanta.cmds.set(command_info.name, command_info);
                }
            });
    });

(async() => {
    await database.update(data, "data")
    let npps = await database.get("npps")
    for(let key in npps) {
        await database.update(npp, `data.npps.${key}`)
    }
    try {
        logger.info("Перезагружаю команды [" + quanta.cmds.size + "]");
        setTimeout(async() => {
            await quanta.application.commands.set(quanta.cmds)
            quanta.user.setActivity(quanta.users.cache.find(user => user.id == "586969283150741524").tag, { type: ActivityType.Watching });
        }, 2500)
        logger.success("Команды были добавлены")
    } catch (error) {
        logger.error(error)
    }
})();

readdirSync("./events")
    .forEach(eve => {
        let event = require(`./events/${eve}`)
        if(!event.name && !event.once && !event.execute)
            logger.error(`Событие [event/${eve}] не загружено`)
        else {
            if(event.once)
                quanta.once(event.name, (...args) => event.execute(...args, database, quanta))
            else
                quanta.on(event.name, (...args) => event.execute(...args, database, quanta))
        }
    })

quanta
    .login(configs.token)
    .then()
    .catch(err => {
        logger.error(err)
    })

    // я устал это писать пизд
    