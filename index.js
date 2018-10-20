require('dotenv-safe').config()
require('module-alias/register')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongoSanitize = require('express-mongo-sanitize')
const multer = require('multer')
const Promise = require('bluebird')
const renderer = require('@lib/renderer')

const upload = multer()
const app = express()

app.use(mongoSanitize())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(require('@lib/parse-method')) // Parses _method parameters to req.method
app.set('etag', false)
app.use((req, res, next) => { // Remove shameless plug
	res.removeHeader('X-Powered-By')
	next()
})

mongoose.Promise = require('bluebird')

app.get('/', require('@routes/index'))
app.use('/photos', upload.fields([
		{ name: 'photo' },
	]), require('@routes/photos'))
app.use(express.static('dist/'));
app.use(require('@routes/error'))
app.use(require('@routes/not-found'))

// $RUN
mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}`, { useNewUrlParser: true })
	.then(() => {
		const port = process.env.PORT || 3040
		app.listen(port, () => {
			if (app.get('env') === 'development') {
				console.log(`Development server available on http://localhost:${port}`)
			}
		})
	})
	.catch(err => {
		console.error(err)
		process.exit(1)
	})



