//Bot tutorial
console.log('Tut tut muthaclucka');

import { Client, GatewayIntentBits } from 'discord.js'; 

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});
client.login('TOKEN');

client.on('ready', onReadyCallback);

function onReadyCallback() {
    console.log('<3');
}

client.on('message', onGotMessage);

function onGotMessage(msg) {
    console.log(msg);
    if (msg.channel.id == '1333001853096689767' && msg.content === 'Bloop') {
        msg.reply('No');
    }
}