const Moderation = require('../base/Moderation.js');

class Warn extends Moderation {
  constructor(client) {
    super(client, {
      name: 'warn',
      description: 'Warns a mentioned user, or a user\'s ID',
      usage: 'warn <@mention> <reason>',
      extended: 'This warns the mentioned user, with a reason.',
      aliases: ['caution'],
      botPerms: ['SEND_MESSAGES', 'EMBED_LINKS']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    const settings = this.client.settings.get(message.guild.id);
    const channel  = message.guild.channels.exists('name', settings.modLogChannel);
    if (!channel)    throw `${message.author}, I cannot find the \`${settings.modLogChannel}\` channel.`;
    const target   = await this.verifyMember(message.guild, args[0]);
    if (!target)     throw `${message.author} |\`ERROR\`| Invalid usage of command. Please make sure you mention someone first, or use their Client ID`;
    const modLevel = this.modCheck(message, args[0], level);
    if (typeof modLevel === 'string') return message.reply(modLevel);
    const reason   = args.splice(1, args.length).join(' ');
    if (!reason)     throw `${message.author} |\`ERROR\`| Invalid usage of command. Please specify a reason for the warn. You cannot warn someone for no reason, can you?`;
    try {
      await this.buildModLog(this.client, message.guild, 'w', target, message.author, reason);
      await message.channel.send(`\`${target.user.tag}\` was successfully warned.`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Warn;
