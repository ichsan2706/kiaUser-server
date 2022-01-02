const router = require('express').Router()
const controllerUser = require('../controllers/controller-user')


router.get('/', controllerUser.getParents)
router.get('/getProfile/:email', controllerUser.getProfile)
router.post('/register', controllerUser.register)
router.post('/login', controllerUser.login)

module.exports = router

















module.exports = router