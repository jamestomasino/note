//= require ../lib/modernizr

Modernizr.load([
	{ test: window.matchMedia, nope: ['js/polyfill/media.match.js', 'js/polyfill/respond.js' ] },
	"js/libs.js",
	"js/main.js"
]);

