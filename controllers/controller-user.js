const modelsUser = require('../models/model-users')
const {compareHash} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

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
    static login(req, res, next) {
        let {phoneNumber, password} = req.body
        modelsUser.login(phoneNumber)
            .then((user) => {
                if(user) {
                    if(compareHash(password, user.password)) {
                        let payload = {
                            id: user._id
                        }
                        const access_token = jwt.sign(payload, process.env.JWT_SECRET)
                        res.status(200).json({message: "login success", access_token})
                    } else {
                        res.status(401).json({error:"Phone number/password is wrong"})
                    }
                } else {
                    res.status(401).json({error:"Phone number not registered"})
                }
            })
            .catch((error) => {
                res.status(500).json({error: error})
            })
    }
}


module.exports = ControllerUser