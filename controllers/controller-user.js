const { getDb } = require('../config/mongoDB');
const modelsUser = require('../models/model-users')

class ControllerUser{
    static getParents(req, res, next) {
        modelsUser.parents()
        .then((result) => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
    }
    static checkLogin(req, res, next) {
        console.log(req.params.email);
        modelsUser.checkLogin(req.params.email)
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(error)
        });
    }
}


module.exports = ControllerUser