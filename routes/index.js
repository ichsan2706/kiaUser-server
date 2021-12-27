const router = require('express').Router()
const controllerUser = require('../controllers/controller-user')

router.get('/', controllerUser.getParents)
router.post('/login', controllerUser.login)
router.post('/register', controllerUser.register)
router.post('/googleSignin', controllerUser.googleSignin)

module.exports = router