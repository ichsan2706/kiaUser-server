const modelsUser = require('../models/model-users')

class ControllerUser{
    static getParents(req, res, next) {
        modelsUser.parents()
        .then((parents) => {
            console.log(parents);
            res.status(200).json(parents)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
    }
}


module.exports = ControllerUser