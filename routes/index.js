const router = require('express').Router()
const controllerUser = require('../controllers/controller-user')


router.get('/', controllerUser.getParents)
router.get('/checkLogin/:email', controllerUser.checkLogin)

module.exports = router

















module.exports = router