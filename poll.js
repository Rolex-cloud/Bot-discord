const { MessageEmbed, Client, Message } = require("discord.js");
const { MESSAGES } = require("../../util/constants");

/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */
module.exports.run = (client, message, args) => {
    message.delete();
    const embed = new MessageEmbed()
        .setTitle('New Poll')
        .setColor("#000000")
        .setDescription(`[Rol3x bot](https://discord.com/api/oauth2/authorize?client_id=952897686594519091&permissions=8&scope=bot) \n${args.join(" ")}`)
        .setFooter('Rol3x Bot');

    message.channel.send(embed).then(async msg => {
        await msg.react('✅');
        await msg.react('〰️');
        await msg.react('❌');
    }).catch(err => '');
};




module.exports.help = MESSAGES.COMMANDS.OTHER.POLL;