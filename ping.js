const { MESSAGES } = require("../../util/constants");
const {
  Client,
  Message
} = require('discord.js')

/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */
module.exports.run = async (client, message, args) => {
  await message.channel.send(`Pong - ${client.ws.ping}ms`);
};



module.exports.help = MESSAGES.COMMANDS.OTHER.PING;