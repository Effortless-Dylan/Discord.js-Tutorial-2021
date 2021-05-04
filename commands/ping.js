const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

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

module.exports.help = { 
    name: "ping"
 } 