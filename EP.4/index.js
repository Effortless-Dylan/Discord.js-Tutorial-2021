const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');
client.commands = new Discord.Collection();
const fs = require('fs')

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        client.commands.set(props.help.name, props);
    });

});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    let content = message.content.split(" ");
    let command = content[0];
    let args = content.slice(1);
    let prefix = '/';


    //checks if message contains a command and runs it
    let commandfile = client.commands.get(command.slice(prefix.length));
    if (commandfile) commandfile.run(client, message, args);

});

client.login(token);