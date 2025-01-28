const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('Translate given argument')
		.addStringOption(option =>
			option.setName('argument')
				.setDescription('The actual text you need to translate')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('language')
				.setDescription('Language destination')
				.setRequired(false)),

	async execute(interaction) {
		await translateInput(interaction);
	},
};

async function translateInput(interaction) {
	const input = interaction.options.getString('argument');
	let languageDestination = interaction.options.getString('language');
	if (languageDestination === null) {
		languageDestination = 'EN';
	}
	const res = await fetch('https://translate.google.com/translate_a/single?client=gtx&sl=auto&tl=' + languageDestination + '&dt=t&q=' + input);
	const responseText = await res.text();
	const responseJson = await JSON.parse(responseText);
	console.log(languageDestination);
	// console.log(responseJson[0]);
	// console.log('Translated: ' + responseJson[0][0][0] + '\n\n' + responseJson[0][8] + '->' + responseJson[0][8]);
	interaction.reply(responseJson[0][0][0] + '\n\n' + responseJson[2].toUpperCase() + ' to ' + languageDestination);
}