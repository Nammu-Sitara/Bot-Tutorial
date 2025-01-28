const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const translate = require('../../src/translate.js');

const messageLimit = 20;

module.exports = {
	data: new SlashCommandBuilder ()
		.setName('wut')
		.setDescription('Translate the last message of a given user in this channel')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('The taget user')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('language')
				.setDescription('Language destination')
				.setRequired(false)),

	async execute(interaction) {
		interaction.deferReply({ flags: MessageFlags.Ephemeral });

		try {
			const targetLanguage = interaction.options.getString('language');
			const targetUser = interaction.options.getUser('target');
			const channel = interaction.channel;

			const messages = await channel.messages.fetch({ limit: messageLimit });

			const lastMessageFromUser = messages.find(msg => msg.author.id === targetUser.id);

			if (lastMessageFromUser) {
				const translationResult = await translate(lastMessageFromUser.content, targetLanguage);
				interaction.editReply(`${translationResult.translation}\n\n${translationResult.sourceLanguage} to ${targetLanguage}`);
			}
			else {
				await interaction.editReply(`No message from ${targetUser.username} in last ${messageLimit} messages of this channel.`);
			}
		}
		catch {
			await interaction.editReply('Could not translate input!');
		}
	},
};
