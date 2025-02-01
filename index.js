// Bot tutorial

// Imports
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');

require('dotenv').config();
const isReleaseEnv = process.argv.includes('--release');
const tokenEnvironment = isReleaseEnv ? 'BOT_TOKEN_RELEASE' : 'BOT_TOKEN_TEST';
const BOT_TOKEN = process.env[tokenEnvironment];

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

client.login(BOT_TOKEN);

client.on(Events.ClientReady, onReadyCallback);

// Answer on Bot readyness
function onReadyCallback() {
	console.log('Automaton ready');
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

if (isReleaseEnv) {
	// Running server
	console.log('starting http server');
	const http = require('http');
	const PORT = process.env.PORT || 3000;
	const server = http.createServer((req, res) => {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('For Super Earth');
	});

	server.listen(PORT, () => {console.log(`replying on ${PORT}`);});

	// self calling cron job
	const url = process.env.URL;
	if (url) {
		console.log('starting keep-alive cron job');
		setInterval(() => {
			const https = require('https');

			const startTime = Date.now();

			https.get(URL, (res) => {
				const endTime = Date.now();
				console.log(`Pinged self - status: ${res.statusCode}. Response time: ${endTime - startTime}ms`);
			}).on('error', (e) => {
				console.error(`Error while pinging self: ${res.statusCode} - ${e.message}`);
			});

		}, 14 * 60 * 1000);
	}
	else {
		console.log('No url was found. Skipping keep-alive!');
	}
}
