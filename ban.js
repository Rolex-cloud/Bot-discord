const {
  MessageEmbed,
  Client,
  Message
} = require("discord.js");
const {
  MESSAGES
} = require("../../util/constants");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */
module.exports.run = async (client, message, args) => {
  let reason = args.splice(1).join(' ') || 'Unspecified';
  const user = args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (message.guild.members.cache.find(m => m.tag == args[0])) : args[0]);

  if (user) {
    const member = message.guild.member(user);
    if (!member) {
      message.guild.members.ban(user.id).then(() => {
        const embed = new MessageEmbed()
          .setAuthor(`${user.username}`, user.avatarURL)
          .setColor("#ef0f0f")
          .setDescription(`[Add I2Z7](https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join)\n${user} has been banned \nReason : ${reason}\nModerator : ${message.author}`)
          .setTimestamp()
          .setFooter('I2Z7 Bot');

        message.channel.send(embed)
      });
    } else {
      if (member.hasPermission('BAN_MEMBERS', true)) return message.channel.send("I can't ban an admin!");
      if (message.guild.me.roles.highest.position <= member.roles.highest.position) return message.channel.send("I can't ban an user who have a role highest than mine!");
      member.ban({
        days: 7,
        reason: reason
      }).then(() => {
        user.createDM().then(() => {
          user.send(`You have been banned from ${message.guild.name} by ${message.author.tag} for reason : ${reason}`)
        }).catch((err) => console.log(err));

        const embed = new MessageEmbed()
          .setAuthor(`${user.username}`, user.avatarURL)
          .setColor("#ef0f0f")
          .setDescription(`[Add I2Z7](https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join)\n${user} has been banned \nReason : ${reason} \nModerator : ${message.author}`)
          .setTimestamp()
          .setFooter('I2Z7 Bot');

        message.channel.send(embed)
      });
    }
  } else return message.channel.send('User not found!');
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.BAN;