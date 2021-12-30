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

    static register(req, res) {
        let {nik, name, email, pob, dob, gender, phoneNumber, address, password} = req.body
    
        password = hashPassword(password)
        
        let data = {nik, name, email, pob, dob, gender, phoneNumber, address, password}
    
        modelsUser.register(data)
            .then((user) => {
                res.status(201).json({message:"success register parent"})
            })
            .catch((err) => {
                res.status(500).json({message: 'error'})
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