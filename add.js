const { MESSAGES } = require("../../util/constants")

module.exports.run = async(client, message, args) => {
    const embed = new MessageEmbed()
        .setDescription(`[Add I2Z7](https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join) | [Support server](https://discord.gg/92ffufA) | [Vote in top.gg](https://top.gg/bot/735824367698837555/vote) | [DiscoBots](http://discobots-botlist.glitch.me/bots/735824367698837555/vote)`)
        .setTitle('I2Z7 Bot Links🔗')
    message.channel.send(embed);
}

module.exports.help = MESSAGES.COMMANDS.OTHER.ADD;