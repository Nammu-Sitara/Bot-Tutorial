const { SlashCommandBuilder } = require('discord.js');
const translateLink = ('https://translate.google.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=');

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
                .setRequired(true)),

    async execute(interaction){
        await translateInput(interaction);
    }
};

async function translateInput(interaction) {
    const input = interaction.options.getString('argument');
    const languageDestination = interaction.options.getString('language');
    const res = await fetch('https://translate.google.com/translate_a/single?client=gtx&sl=auto&tl=' + languageDestination + '&dt=t&q=' + input);
    const responseText = await res.text();
    const responseJson = await JSON.parse(responseText);
    console.log('Translated: ' + responseJson[0][0][0] + '\n\n' + responseJson[0][8] + '->' + responseJson[0][8]);
    interaction.reply(responseJson[0][0][0] + '\n\n' + responseJson[0][8] + ' to ' + responseJson[0][8]);
}