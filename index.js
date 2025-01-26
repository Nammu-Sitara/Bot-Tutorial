//Bot tutorial
console.log('Tut tut muthaclucka');

import { Client, GatewayIntentBits } from 'discord.js'; 
import config from './config.json' with { type:'json' };
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.login(config.BOT_TOKEN);

client.on('ready', onReadyCallback);

// Answer on Bot readyness
function onReadyCallback() {
    console.log('<3');
}

// Give answer from select msg in select channel
client.on('message', onGotMessage);

function onGotMessage(msg) {
    console.log(msg);
    if (msg.channel.id == '1333001853096689767' && msg.content === 'Bloop') {
        msg.reply('No');
    }
}
