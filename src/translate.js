module.exports = async function translateInput(interaction, textToTranslate) {
	const languageDestination = interaction.options.getString('language');
	const res = await fetch('https://translate.google.com/translate_a/single?client=gtx&sl=auto&tl=' + languageDestination + '&dt=t&q=' + textToTranslate);
	const responseText = await res.text();
	const responseJson = await JSON.parse(responseText);
	interaction.reply(responseJson[0][0][0] + '\n\n' + responseJson[0][8] + ' to ' + responseJson[0][8]);
}