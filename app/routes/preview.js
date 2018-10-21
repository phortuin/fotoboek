const Photo = require('@models/photo')
const renderer = require('@lib/renderer');

module.exports = (req, res, next) => {
	Photo.find().sort({ date: -1 }).exec()
		.then(photos => res.send(renderer.render('views/preview.html', { photos })))
		.catch(next)
}
