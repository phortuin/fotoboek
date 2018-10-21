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

// Markdown filters

marked.setOptions({
	gfm: true,
	breaks: true,
	smartypants: true
})
renderer.addFilter('markdown', string => string ? marked(string, {}) : '')
renderer.addFilter('markdowninline', string => string ? marked.inlineLexer(string, {}) : '')

// Date filters

moment.locale(process.env.LOCALE)
renderer.addFilter('dateDMY', string => moment(string).format('D MMMM Y'))
renderer.addFilter('dateMY', string => moment(string).format('MMMM Y'))

module.exports = renderer;
