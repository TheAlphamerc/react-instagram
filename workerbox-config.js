module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,ico,jpg,png,html,css,js,txt}'
	],
	swDest: 'build/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};