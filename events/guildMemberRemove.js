const Discord = require('discord.js');

module.exports = class {
  constructor(client) {
    this.client = client;
  }
  async execute(member) {
    const guild = member.guild;
    this.client.points.delete(`${guild.id}-${member.id}`);
    const embed = new Discord.RichEmbed()
    .setAuthor(client.user.username,client.user.avatarURL)
    .setColor(0xE0082d)
    .setDescription(`${member.user.tag}` `has left us!`)
    .setThumbnail(member.user.displayAvatarURL)
    .setFooter(`User Leave `)
    .setTimestamp()
    guild.channels.find('name', settings.modLogChannel).sendEmbed(embed);
  }
};