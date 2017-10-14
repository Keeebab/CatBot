module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async execute(guild) {
        const channel  = message.guild.channels.exists('name', settings.modLogChannel);        
        if (!channel) return;
        message.channel.send(`${client} has left the discord server!`);
    }
}