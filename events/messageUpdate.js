const Discord = require('discord.js');
const moment = require('moment');
const Client = new Discord.Client()


module.exports = class {
  constructor(client) {
    this.client = client;
  }
  async execute (member, message) {
  const guild = member.guild;
  const oldMessage = message.edits[1];
  const newMessage = message.edits[0];
  const embedcolor = Math.floor(Math.random() * 0x999099);
  const settings = this.client.settings.get(guild.id);
  const channel  = member.guild.channels.find('name', settings.modLogChannel);

	const embed = new Discord.RichEmbed();
	embed.setTitle("Message Edited")
	.setColor(embedcolor)
	.addField("Old Message", `${oldMessage}`, false)
	.addField("New Message", `${newMessage}`, false)
	.addField("Message Author: ", message.author, true)
	.addField("Message Channel", message.channel, true)
	.setFooter("Message edited at: " + new Date());

	return channel.send({embed})
  }
};