const Command = require('../base/Command.js');
const Discord = require("discord.js");

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      description: 'Latency and API response times.',
      usage: 'ping',
      extended: 'This command is a response test, it helps gauge if there is any latency (lag) in either the bots connection, or the API.',
      aliases: ['pong']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try {
      message.reply("Testing ping...").then(m => {
      let latency = Math.floor((m.createdTimestamp - message.createdTimestamp) / 6);
      const embed = new Discord.RichEmbed()
      .setColor(0xFFB200)
      .setTimestamp()
      .addField(':ping_pong:', 'I ponged back at the speed of ' +latency+ ' ms!')
      .setFooter(`Pinged by ${message.author.username}`)
      m.edit({embed});
    });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Ping;