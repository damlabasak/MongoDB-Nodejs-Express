const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')

router.get('/', blogController.blog_index)
// :'dan sonra bir değişken belirtilir
router.get('/:id', blogController.blog_content)

module.exports = router