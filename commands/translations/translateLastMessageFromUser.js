const { SlashCommandBuilder } = require('discord.js');
const translate = require('../../src/translate.js')

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
		const targetUser = interaction.options.getUser('target');
		const channel = interaction.channel;

		const messages = await channel.messages.fetch({ limit: 20 });

		const lastMessageFromUser = messages.find(msg => msg.author.id === targetUser.id);

		if (lastMessageFromUser) {
			await translate(interaction, lastMessageFromUser.content);
		}
		else {
			await interaction.reply(`No message from ${targetUser.username} in last 20 messages of this channel.`);
		}
	},
};
