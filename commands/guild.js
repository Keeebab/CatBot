const Command = require('../base/Command.js');
const moment = require('moment');
const { inspect } = require('util');
const { RichEmbed } = require('discord.js');

class Guild extends Command {
  constructor(client) {
    super(client, {
      name: 'guild',
      description: 'Manage different guild settings',
      usage: 'guild [setting]',
      extended: 'This command will adjust guild-related settings, such as region, verification level and so forth',
      botPerms: ['MANAGE_GUILD', 'SEND_MESSAGES', 'EMBED_LINKS'],
      permLevel: 'Bot Admin'
    });
  }

  async run(message, [action, key], level) {
    
      if (action === 'icon') {

      if (!message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return message.reply('I do not have the correct permissions.').catch(console.error);
      let url = args.join(' ');
          if (!url) {
              url = null;
            }
      message.guild.setIcon(url);
      let text = url ? 'Icon changed to '  + url : ' No icon specified. Default icon used instead.';
      message.channel.send('Guild icon changed to ' + url);
    }

    if (action === 'verification') {
        let number = args.join(' ');
          if (!number){
            return message.channel.send('Verification level must be between 0 and 4');
          }

            message.guild.setVerificationLevel(number)
           message.channel.send('Verification Level set to ' + number);
    }
  }
}

module.exports = Guild;
