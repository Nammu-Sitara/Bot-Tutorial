// Bot tutorial
console.log('Tut tut muthaclucka');

// Imports
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const config = require('./config.json');

// Creating client object
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Load commands from commands folder
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		//  Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.login(config.BOT_TOKEN);

client.on(Events.ClientReady, onReadyCallback);

// Answer on Bot readyness
function onReadyCallback() {
	console.log('<3');
}

// Receiving command interactions
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
		else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

// Give a traduction from a received message in #automaton-commands
client.on(Events.MessageCreate, onGotMessage);

async function onGotMessage(msg) {
	// console.log(msg);
	if (msg.channel.id == '1333001853096689767' && msg.content.toLowerCase() === '!translate') {
		msg.reply('Translating...');
		const res = await fetch('https://translate.google.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q="ma voiture est tombée en panne"');

		const responseText = await res.text();
		const responseJson = await JSON.parse(responseText);
		// console.log(responseJson[0][0][0]);
		msg.reply(responseJson[0][0][0]);
	}
}
