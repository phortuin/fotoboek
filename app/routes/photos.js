const express = require('express')
const router = express.Router()

router.route('/')
	.get(require('@routes/photos/list'))
	.post(require('@routes/photos/post'))

module.exports = router
