const renderer = require('@lib/renderer')

module.exports = (err, req, res, next) => {
	if (process.env.NODE_ENV === 'development') {
		console.error(err)
	}
	// Let’s hope Nunjucks is not part of the error
	// Make a try catch?
	res.status(err.status || 500).send(renderer.render('views/error.html', { error: err.message || 'Internal Server Error'}))
}
