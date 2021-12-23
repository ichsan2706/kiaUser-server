const router = require('express').Router()
const controllerUser = require('../controllers/controller-user')


router.get('/', controllerUser.getParents)
router.post('/login', controllerUser.login)

















module.exports = router