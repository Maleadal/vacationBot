const Discord = require('discord.js');
const bot = new Discord.Client();
bot.on('ready', ()=>{
    console.log('ONLINE');
})

bot.on('message', message => {
    if(message.content === 'ping'){
        message.channel.send("PONG");
    }
});

bot.login(process.env.BOT_TOKEN);
