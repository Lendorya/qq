const { QuickDB } = require("quick.db")
const logger = require("./logger")

module.exports = class Database {
    constructor() {
        this.db = new QuickDB
    }

    /**
     * 
     * @param {object} data 
     * @param {string} key 
     */
    async update(data, key) {
        if(!await this.db.has(key)) await this.db.set(key, {})
        for (let variable in data)
            if(!await this.db.has(`${key}.${variable}`)) await this.db.set(`${key}.${variable}`, data[variable])
    }

    /**
     * 
     * @param {string} key 
     * @returns 
     */
    async get(key) {
        return await this.db.get(`data.${key}`)
    }
    /**
     * 
     * @param {string} key 
     * @param {any} value 
     */
    async set(key, value) {
        await this.db.set(`data.${key}`, value)
    }

    /**
     * 
     * @param {string} key 
     * @param {any} value 
     */
    async add(key, value) {
        await this.db.set(`data.${key}`, await this.db.get(`data.${key[0]}.${key[1]}.${key[2]}`) + value)
    }

    /**
     * 
     * @param {string} key 
     * @param {any} value 
     */
    async sub(key, value) {
        await this.db.set(`data.${key}`, await this.db.get(`data.${key[0]}.${key[1]}.${key[2]}`) - value)
    }
}