import {ApplicationCommandOption, Client, Interaction} from "discord.js"
import { QuickDB } from "quick.db"
import Database from "./funcs/database"

interface cmd_options {
    name: string,
    description: string,
    cooldown?: number,
    options?: ApplicationCommandOption[],
    profile?: boolean,
    dev_only?: boolean,
    def_perms?: bigint
    async execute(bot: Client, interaction: Interaction, data: Database): void | Promise<void>
}