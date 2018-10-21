const nunjucks = require('nunjucks')
const marked = require('marked')
const moment = require('moment')

const renderer = new nunjucks.Environment(
	new nunjucks.FileSystemLoader('src', {
		noCache: true,
		watch: false
	}),
	{ autoescape: true }
);

// Markdown filter

const markdownRenderer = new marked.Renderer()

marked.setOptions({
	gfm: true,
	breaks: true,
	smartypants: true
})

renderer.addFilter('markdown', string => {
	return string ? marked(string, { renderer: markdownRenderer }) : ''; // marked will throw error on an empty string
});

// Date filters

moment.locale(process.env.LOCALE)

renderer.addFilter('dateDMY', string => {
	return moment(string).format('D MMMM Y')
})

renderer.addFilter('dateMY', string => {
	return moment(string).format('MMMM Y')
})

module.exports = renderer;
