const express = require('express')
const router = express.Router()

router.route('/')
	.get(require('@routes/photos/list'))
	.post(require('@routes/photos/post'))

router.route('/:id')
	.delete(require('@routes/photos/delete'))

module.exports = router
