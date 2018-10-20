const Photo = require('@models/photo')
const cloudinary = require('cloudinary')

module.exports = (req, res, next) => {
	Photo.findById(req.params.id).exec()
		.then(photo => {
			let cloudinaryId = photo.url.substr(photo.url.lastIndexOf('/') + 1).slice(0, -4) // Get the last part of the public URL, without the file extension: http://res.cloudinary.com/phortuin/image/upload/v1540029529/AGJKE1685.JPG.jpg
			return cloudinaryDestroy(cloudinaryId)
		})
		.then(result => {
			console.log(result)
			return Photo.findByIdAndRemove(req.params.id).exec() // messy, should just be photo.remove()
		})
		.then(() => res.redirect('/photos'))
		.catch(next)
}

function cloudinaryDestroy(id) {
	return new Promise((resolve, reject) => {
	    cloudinary.v2.uploader.destroy(id, function(error, result) {
	        if (error) {
	            reject(error)
	        } else {
	            resolve(result)
	        }
	    })
	})
}
