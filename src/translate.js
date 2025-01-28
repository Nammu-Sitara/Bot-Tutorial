module.exports = async function translate(textToTranslate, targetLanguage) {
	const res = await fetch(`https://translate.google.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${textToTranslate}`);
	const responseText = await res.text();
	const responseJson = await JSON.parse(responseText);
	return {
		'translation': responseJson[0][0][0],
		'sourceLanguage': responseJson[2].toUpperCase(),
	};
};
