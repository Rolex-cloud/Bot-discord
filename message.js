const { Client, Message } = require("discord.js");
const { Collection } = require("discord.js");
const ownerID = "your_id";
const prefix = '!'

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @returns 
 */
module.exports = async (client, message) => {
  if (!message.member || !message.author) return;
  if (message.author.bot) return;

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase().split("-").join("");

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

    if (!command) return message.channel.send({ embed: { description: 'Command not found !' } });

    if (!command.help.enable && message.author.id !== ownerID) return message.channel.send({ embed: { description: 'This command is on devlopment. Please wait...' } });

    if (command.help.ownerCmd && message.author.id !== ownerID) return;

    if (command.help.onlyServerOwner && message.author.id !== message.guild.ownerID) return message.channel.send({ embed: { title: 'Missing Permissions', description: "This command require `Server Owner` Permissions!" } });

    if (command.help.permissions && !message.member.hasPermission(command.help.reqPermName)) return message.reply({ embed: { title: 'Missing Permissions', description: `You don't have enough permissions to use \`${command.help.name}\` command! \nNeeded permissions : \`${command.help.reqPermName}\`` } });

    if (command.help.botPerm && !message.guild.me.hasPermission(command.help.botPermName)) return message.channel.send({ embed: { title: 'Missing Bot Permissions', description: `I don't have enough permissions to run this command ! Give me \`${command.help.botPermName}\` permission(s)` } })

    if (command.help.args && !args.length) {
      let noArgsReply = `${message.author} Correct usage :`;

      if (command.help.usage)
        noArgsReply += `\`${prefix}${command.help.name} ${command.help.usage}\``;

      return message.channel.send({ embed: { title: 'Missing Arguments', description: noArgsReply } });
    }
      if ((command.help.args && args.length || !command.help.args) && (command.help.permissions && message.member.hasPermission(command.help.reqPermName) || !command.help.permissions) && !command.help.ownerCmd) {
      if (!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Collection());
      }

      const timeNow = Date.now();
      const tStamps = client.cooldowns.get(command.help.name);
      const cdAmount = (command.help.cooldown || 0) * 1000;

      if (tStamps.has(message.author.id)) {
        const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

        if (timeNow < cdExpirationTime) {
          timeLeft = (cdExpirationTime - timeNow) / 1000;

          return message.reply({ embed: { title: 'Command Cooldown', description: `You have to wait ${Math.round(timeLeft)} second(s) to retry \`${command.help.name}\` command!` } });
        }
      }

      tStamps.set(message.author.id, timeNow);
      setTimeout(() => tStamps.delete(message.author.id), cdAmount);
    }
    command.run(client, message, args);
  };
};