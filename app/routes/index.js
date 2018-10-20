const renderer = require('@lib/renderer')

module.exports = (req, res, next) => {
	res.send(renderer.render('views/index.html'))
}
