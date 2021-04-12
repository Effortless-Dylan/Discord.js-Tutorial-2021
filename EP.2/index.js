const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');
const prefix = '/'



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {

    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase()

    if(command === 'ping'){
        const msg = await message.channel.send('Pinging...')
        msg.delete()

        const embed = new Discord.MessageEmbed()
        .setTitle('Ping')
        .setColor('#00FFFF')
        .addField('Ping', `\`${Math.floor(msg.createdAt - message.createdAt)}ms\``)
        .addField('API latency', `\`${Math.round(client.ws.ping)}ms\``)
        .setTimestamp()
        .setFooter('Requested by ' + message.author.id, message.author.displayAvatarURL())

        message.channel.send(embed)
    }


});

client.login(token);