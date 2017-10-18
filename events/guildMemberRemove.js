const Discord = require('discord.js');

module.exports = class {
  constructor(client) {
    this.client = client;
  }
  async execute(member) {
    const guild = member.guild;
    this.client.points.delete(`${guild.id}-${member.id}`);
    
  const embedcolor = Math.floor(Math.random() * 0x999099);
  const settings = this.client.settings.get(guild.id);
  const channel  = member.guild.channels.find('name', settings.memberLogChannel);
  const embed = new Discord.RichEmbed()
    .setColor(embedcolor)
    .setTimestamp()
    .setThumbnail(member.user.displayAvatarURL)
    .setTitle('Member Left')
	  .addField(`Name: ${member.user.tag}`, (member.user.id))

  return channel.send({embed});
  }
};