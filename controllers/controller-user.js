const { getDb } = require('../config/mongoDB');
const modelsUser = require('../models/model-users')
const {hashPassword, compareHash} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

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
    static getProfile(req, res, next) {
        console.log(req.params.email);
        modelsUser.getProfile(req.params.email)
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(error)
        });
    }

    static register(req, res) {
        let {nik, name, email, pob, dob, gender, phoneNumber, address, password} = req.body
    
        console.log(req.body, 'data body');
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
        let {email, password} = req.body
        modelsUser.login(email)
            .then((user) => {
                if(user) {
                    if(compareHash(password, user.password)) {
                        const access_token = jwt.sign(user, process.env.JWT_SECRET)
                        res.status(200).json({access_token, profile:user})
                    } else {
                        console.log(`masuk else 1`);
                        res.status(401).json({error:"Phone number/password is wrong"})
                    }
                } else { 
                    console.log(`masuk else 2`);
                    res.status(401).json({error:"Phone number not registered"})
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({error: error})
            })
    }
}


module.exports = ControllerUser