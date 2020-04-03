require("dotenv/config");
const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = ".";
const http = require('http');
const port = process.env.PORT || 3000;
http.createServer().listen(port);

bot.on('ready', ()=>{
    console.log('ONLINE');
})

bot.on('message', message => {
    let channelID = "695452891955200061"
    let role = message.guild.roles.cache.find(r => r.name === "Vacation");
    let member = message.member;
    let args =  message.content.substring(PREFIX.length).split(" ");
    const channel = bot.channels.cache.get(channelID);
    var length = args.length - 1;
    var argsContent = args.toString().split(",").slice(1);

    // check the user's commands
    if(args[0] === "vacation"){
        if(args.length === 1){
            message.channel.send("You did not provide a reason! No vacation for you! ");
        }else {
            if(message.member.roles.cache.find(r => r.name === "Vacation")){
                message.channel.send("You are already on a vacation Loser!");
            } else {
                member.roles.add(role)
                message.channel.send("Have a great time on your vacation!");
                message.channel.send("Note: You will not be able to take any contract during vacation, unless you are `.done`");
                channel.send(`${message.author}'s going on a vacation! \n\n Reason/s: ` + argsContent.join(" "));
            }
        }
        

    }else if(args[0] === "done"){
        if(!member.roles.cache.find(r => r.name === "Vacation")){
            message.channel.send("You're not even on a vacation!");
        } else {
            member.roles.remove(role)
            message.channel.send("Welcome Back Loser!");
        }
    }else if(args[0] === "help"){
        message.channel.send("Command Information: ");
        message.channel.send("`.vacation <reason>` - Take a vacation!");
        message.channel.send("`.done` - Come back from your vacation");

    }


    });
    bot.on('error', err => {
        console.log(err);
    });

bot.login(process.env.BOT_TOKEN);

