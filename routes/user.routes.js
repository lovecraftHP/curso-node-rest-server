const {Router} = require('express')
const { userGet, userPost,userGetDetails,userGetDetailsQuery } = require('../controller/user.controller')

const router = Router()
router.get('/',userGetDetailsQuery)
router.get('/:id',userGetDetails),
router.post('/',userPost)

module.exports = router
