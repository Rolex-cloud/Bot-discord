const {
  MessageEmbed,
  Client,
  Message
} = require("discord.js");
const {
  MESSAGES
} = require("../../util/constants");

/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */
module.exports.run = async (client, message, args) => {
  let reason = (args.splice(1).join(' ') || 'Unspecified');
  const user = args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (message.guild.members.cache.find(m => m.tag == args[0])) : args[0]);

  if (user) {
    const member = message.guild.member(user);
    if (!member) return message.reply("That user isn't in this guild!");
    else {
      if (member.hasPermission('BAN_MEMBERS', true)) return message.channel.send("I can't kick an admin!");
      if (message.guild.me.roles.highest.position <= member.roles.highest.position) return message.channel.send("I can't kick an user who have a role highest than mine!");

      if (member) {
        member.kick(reason)
          .then(() => {
            user.createDM().then(() => {
              user.send(`You have been kicked from ${message.guild.name} by ${message.author.tag} for reason : ${reason} \nYou can re-join server if you want.`)
            }).catch(() => '')

            const embed = new MessageEmbed()
              .setAuthor(`${user.username}`, user.avatarURL)
              .setColor("#ef0f0f")
              .setDescription(`[Add I2Z7](https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join)\n${user} has been kicked \nReason : ${reason} \nModerator : ${message.author}`)
              .setTimestamp()
              .setFooter('I2Z7 Bot');

            message.channel.send(embed)
          })
          .catch(err => {
            message.reply("Cannot kick!");
            console.log(err);
          });
      }
    }
  } else return message.reply('User not found')
};


module.exports.help = MESSAGES.COMMANDS.MODERATION.KICK;