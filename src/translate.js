module.exports = async function translate(textToTranslate, targetLanguage) {
	const res = await fetch(`https://translate.google.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${textToTranslate}`);
	const responseText = await res.text();
	const responseJson = await JSON.parse(responseText);
	const translation = [];
	for (const element of responseJson[0]) {
		translation.push(element[0]);
	}
	return {
		'translation': translation.join(''),
		'sourceLanguage': responseJson[responseJson.length - 7].toUpperCase(),
	};
};
