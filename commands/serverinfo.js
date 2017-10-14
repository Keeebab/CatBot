const Command = require('../base/Command.js');
const { RichEmbed } = require('discord.js');
const Discord = require('discord.js');

const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];

class ServerInfo extends Command {
  constructor(client) {
    super(client, {
      name: 'serverinfo',
      description: 'Displays server information & statistics.',
      usage: 'serverinfo',
      extended: 'This command will return an organised embed with server information and statistics.',
      guildOnly: true,
      aliases: ['serverstats','guildinfo','guildstats'],
      botPerms: ['EMBED_LINKS']
    });
  }


  async run(message, args, level) { // eslint-disable-line no-unused-vars
    var serverroles = message.guild.roles.map(r=>r).join('\t').slice(10);
    var embedcolor = Math.floor(Math.random() * 0x999099);
    
    const dateFormat = require('dateformat');
    
    const now = new Date();
    dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
    
    const millis = new Date().getTime() - message.guild.createdAt.getTime();
    const days = millis / 1000 / 60 / 60 / 24;

    const embed = new RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setColor(embedcolor)
      .setDescription(`Owner: ${message.guild.owner.user.tag} (Client ID: ${message.guild.owner.id})`)
      .addField('Member Count', `${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size} (${message.guild.members.filter(m=>m.user.bot).size} bots)`, true)
      .addField('Location', message.guild.region, true)
      .addField('Created', `${dateFormat(message.guild.createdAt)}`, true)
      .addField(`Verification Level`, `${verificationLevels[message.guild.verificationLevel]}`, true)
      .addField(`Roles [${message.guild.roles.size}]`,
        serverroles, true)
      .addField('Channels', `${message.guild.channels.filter(chan => chan.type === 'voice').size} voice / ${message.guild.channels.filter(chan => chan.type === 'text').size} text`)
      .addField(`Emojis [${message.guild.emojis.size}]`, `${message.guild.emojis.size > 0 ? message.guild.emojis.map(d => d.toString()).join(" ") : "None"}`)     
      .addBlankField(true)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL);
    message.channel.send({embed}).catch(e => console.error(e));
  }
}

module.exports = ServerInfo;
