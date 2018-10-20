const cloudinary = require('cloudinary')

/**
 * Upload to cloudinary
 *
 * @param  {Multer file object} file
 * @return {Promise}
 */
function cloudinaryUpload(file) {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream({
            resource_type: 'auto',
            public_id: file.originalname
        }, function(error, result) { // Note: don’t refactor into fat arrow function, this will break somehow
            if (error) {
                reject(error)
            } else {
                resolve({ filename: file.originalname, url: result.url })
            }
        }).end(file.buffer)
    })
}

module.exports = cloudinaryUpload
