const Photo = require('@models/photo')
const cloudinaryDestroy = require('@lib/cloudinary-destroy')

module.exports = (req, res, next) => {
	Photo.findById(req.params.id).exec()
		.then(photo => cloudinaryDestroy(photo.url))
		.then(result => Photo.findByIdAndRemove(req.params.id).exec()) // @todo messy, should just be photo.remove()
		.then(() => res.redirect('/photos'))
		.catch(next)
}
