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
module.exports.run = (client, message, args) => {
    message.delete();
    let msg = args.join(" ").replace("@everyone", '').replace('@here', '');
    message.channel.send(msg);
  };
  
  
  
  module.exports.help = MESSAGES.COMMANDS.OTHER.SAY;