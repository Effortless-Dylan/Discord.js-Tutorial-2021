const Discord = require('discord.js')
const { stripIndents } = require('common-tags')
const { promptMessage } = require("../functions")

module.exports.run = async (client, message, args) => {
    //if user is mention
    if(!args[0])return message.channel.send('Please provide a user to kick!');

    //reason
    if(!args[1])return message.channel.send('There Wasnt a reason specified!')

    //author permissions
    if(!message.member.hasPermission("KICK_MEMBERS"))return message.channel.send('You do not have the correct permissions!')

    //Bot Permissions
    if(!message.guild.me.hasPermission("KICK_MEMBERS"))return message.channel.send('I do not have the correct permissions!')

    const userKick = message.mentions.members.first() || message.guild.members.get(args[0])

    //Find member
    if(!userKick)return message.channel.send('Connot find the specified user in this guild!')

    //Kicking self protection
    if(userKick.id === message.author.id) return message.channel.send('You cannot kick yourself, that would be pretty stupid!')

    //Is user kickable
    if(!userKick.kickable)return message.channel.send('This user cannot be kicked!')


    const embed = new Discord.MessageEmbed()
    .setColor('#00FFFF')
    .setThumbnail(userKick.user.displayAvatarURL())
    .setFooter(message.author.username)
    .setTimestamp()
    .setDescription(`Kicked Member: ${userKick.user.username}\n
    Kicked by: ${message.member} \n
    Reason: ${args.slice(1).join(" ")}`);

    const promptEmbed = new Discord.MessageEmbed()
    .setColor('#00FFFF')
    .setAuthor('This verification becomes invalid after 30seconds!')
    .setDescription(`Do you want to kick ${userKick.user.name}`)

    await message.channel.send(promptEmbed).then(async msg => {
        //awaiting reactions
        const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"])

        //the verification!

        if(emoji === "✅"){
            msg.delete();

            userKick.kick(args.slice(1).join(" "))
                .catch(err =>{
                    if(err) return message.channel.send('There was an err:\n' + err)
                })
            message.channel.send(embed)
        }else if(emoji === "❌"){
            message.channel.send('Kick was successfuly cancelled!')
        }
    })
}

module.exports.help = {
    name: "kick"
}