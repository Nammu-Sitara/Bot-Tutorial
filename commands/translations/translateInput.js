const { SlashCommandBuilder } = require('discord.js');
const translateLink = ('https://translate.google.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('Translate given argument')
        .addStringOption(option =>
            option.setName('argument')
                .setDescription('The actual text you need to translate')
                .setRequired(true)),
    async execute(interaction){
        await translateInput(interaction);
    }
};

async function translateInput(interaction) {
    const input = interaction.options.getString('argument');
    const res = await fetch(translateLink + input);
    const responseText = await res.text();
    const responseJson = await JSON.parse(responseText);
    interaction.reply(responseJson[0][0][0]);
}