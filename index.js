const Discord = require('discord.js');

const client = new Discord.Client();

const { loadEvents, loadCommands } = require("./util/loader");

["commands", "cooldowns"].forEach(x => client[x] = new Discord.Collection());

loadCommands(client);
loadEvents(client);

client.login("OTUyODk3Njg2NTk0NTE5MDkx.Yi8tIA.uMzh6GQsLNwS96NTzF6W6OVW5Vs");