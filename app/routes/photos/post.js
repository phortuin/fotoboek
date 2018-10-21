const moment = require('moment')
const Photo = require('@models/photo')
const cloudinaryUpload = require('@lib/cloudinary-upload')
const cloudinaryDestroy = require('@lib/cloudinary-destroy')
const renderer = require('@lib/renderer')

module.exports = (req, res, next) => {
	let cloudinaryUrl
	cloudinaryUpload(req.files.photo[0])
		.then(({ url }) => {
			let photo = new Photo()
			photo.caption = req.body.caption
			photo.date = moment(req.body.date) // @todo Deprecation warning: value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.
			photo.url = cloudinaryUrl = url
			return photo.save() // @todo if this fails, photo should be deleted from cloudinary!!
		})
		.then(photo => res.send(renderer.render('views/thanks.html', photo.toObject()))) // @todo make redirect, to prevent uploading same photo multiple times
		.catch(err => {
			cloudinaryDestroy(cloudinaryUrl)
				.then(() => {
					next(err)
				})
				.catch(cloudinaryErr => {
					console.error('Multiple errors occurred, logging the last one first:')
					console.error(cloudinaryErr)
					next(err)
				})
		})
}
