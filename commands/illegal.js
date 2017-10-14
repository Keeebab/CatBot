const Social = require('../base/Social.js');
const { get, post } = require('snekfetch');
const inUse = new Map();

class IsNowIllegal extends Social {
  constructor(client) {
    super(client, {
      name: 'illegal',
      description: 'Get US President Trump to make something illegal.',
      usage: 'illegal <thing>',
      category:'Miscellaneous',
      extended: 'Trump will make something illegal. ',
      cost: 5,
      aliases:['trump', 'sign'],
      botPerms: ['ATTACH_FILES']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    if (inUse.get('true')) throw 'Trump is signing the Executive Order on illegalization, please wait.';
    inUse.set('true', {user: message.author.id});
    const word = args.join(' ');
    const wordMatch = /^[a-zA-Z\s]{1,10}$/.exec(word);
    if (word.length < 1 || word.length > 10) {
      inUse.delete('true');
      throw 'Cannot be longer than 10 characters or shorter than 1 character.';
    }
    if (!wordMatch) {
      inUse.delete('true');
      throw 'oops! Non-standard unicode characters are now illegal.';
    }
    try {
      const cost = this.cmdDis(this.help.cost, level);
      const payMe = await this.cmdPay(message, message.author.id, cost, this.conf.botPerms);
      if (!payMe) return;
      const msg = await message.channel.send(`Trump is now making ${word} illegal`);
      message.channel.startTyping();
      await post('https://is-now-illegal.firebaseio.com/queue/tasks.json').send({ task: 'gif', word: word.toUpperCase() });
      await this.client.wait(5000);
      const result = await get(`https://is-now-illegal.firebaseio.com/gifs/${word.toUpperCase()}.json`);
      await message.channel.send({ 'files': [result.body.url] });
      message.channel.stopTyping({force:true});
      await msg.delete();
      inUse.delete('true');
    } catch (error) {
      inUse.delete('true');
      message.channel.stopTyping({force:true});
      throw error;
    }
  }
}

module.exports = IsNowIllegal;
