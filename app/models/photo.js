const mongoose = require('mongoose')

const PhotoSchema = new mongoose.Schema({
	date: Date,
	caption: String,
	url: String
})

module.exports = mongoose.model('Photo', PhotoSchema)
