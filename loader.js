const { Client } = require("discord.js");
const { readdirSync } = require("fs");

/**
 * Load all the commands in commands directory
 * @param {Client} client 
 * @param {String} dir 
 */
const loadCommands = (client, dir = "./commands/") => {
    console.log('List of commands :')
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (const file of commands) {
            const getFileName = require(`../${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            console.log(`${getFileName.help.name}`);
        };
    });
};

/**
 * Load all the events in events directory
 * @param {Client} client 
 * @param {String} dir 
 */
const loadEvents = (client, dir = "./events/") => {
    console.log('List of events :');
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (const event of events) {
            const evt = require(`../${dir}/${dirs}/${event}`);
            const evtName = event.split(".")[0];
            client.on(evtName, evt.bind(null, client));
            console.log(`${evtName}`);
        };
    });
};

module.exports = {
    loadCommands,
    loadEvents,
}