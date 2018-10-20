const cloudinary = require('cloudinary')

/**
 * Destroy from Cloudinary
 * Will try to parse Cloudinary public id from URL
 *
 * @param  {String} url
 * @return {Promise}
 */
 function cloudinaryDestroy(url) {
 	let publicId = url.substr(url.lastIndexOf('/') + 1).slice(0, -4) // Get the last part of the public URL, without the file extension: http://res.cloudinary.com/phortuin/image/upload/v1540029529/AGJKE1685.JPG.jpg
 	return new Promise((resolve, reject) => {
 	    cloudinary.v2.uploader.destroy(publicId, function(error, result) {
 	        if (error) {
 	            reject(error)
 	        } else {
 	            resolve(result) // Typically, `result` is { result: 'ok' }
 	        }
 	    })
 	})
 }

module.exports = cloudinaryDestroy
