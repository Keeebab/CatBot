const answers = [ 'Maybe.', 'Certainly not.', 'I hope so.', 'Not in your wildest dreams.', 'There is a good chance.', 'Quite likely.', 'I think so.', 'I hope not.', 'I hope so.', 'Never!', 'Fuhgeddaboudit.', 'Ahaha! Really?!?', 'Pfft.', 'Sorry, bucko.', 'Hell, yes.', 'Hell to the no.', 'The future is bleak.', 'The future is uncertain.', 'I would rather not say.', 'Who cares?', 'Possibly.', 'Never, ever, ever.', 'There is a small chance.', 'Yes!' ];
const Social = require('../base/Social.js');

class Magic8 extends Social {
  constructor(client) {
    super(client, {
      name: 'magic8',
      description: 'Answers a question, magic 8 ball style.',
      usage: 'magic8 <question>?',
      category: 'Miscellaneous',
      extended: 'This Social will answer any question given to it in the style of a magic 8 ball.',
      cost: 5,
      aliases: ['8', '8ball']
    });
  }

  async run(message, args, level) {
    try {
      if (!message.content.endsWith('?')) return message.reply('That does not look like a question, (hint, end your question with a `?`.)');
      if (!args) return message.reply('You need to actually ask a question...');
      const cost = this.cmdDis(this.help.cost, level);
      const payMe = await this.cmdPay(message, message.author.id, cost, this.conf.botPerms);
      if (!payMe) return;
      const msg = await message.channel.send('`Thinking...`');
      setTimeout( async () => {
        await msg.edit(`${answers[Math.floor(Math.random() * answers.length)]}`);
      }, Math.random() * (1 - 5) + 1 * 2000);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Magic8;
