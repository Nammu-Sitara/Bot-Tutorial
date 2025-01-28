const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const translate = require('../../src/translate.js');

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
		interaction.deferReply({ flags: MessageFlags.Ephemeral });

		try {
			const input = interaction.options.getString('argument');
			const targetLanguage = interaction.options.getString('language');

			const translationResult = await translate(input, targetLanguage);
			interaction.editReply(`${translationResult.translation}\n\n${translationResult.sourceLanguage} to ${targetLanguage}`);
		}
		catch {
			await interaction.editReply('Could not translate input!');
		}
	},
};
