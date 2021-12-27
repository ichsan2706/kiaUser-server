const modelsUser = require('../models/model-users')
const {hashPassword, compareHash} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

class ControllerUser{
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


    static googleSignin(req, res, next) {
        let obj = {}
        let statusCode = 200
        // const token = req.headers.token
        const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ5OGY0OWJjNmNhNDU4MWVhZThkZmFkZDQ5NGZjZTEwZWEyM2FhYjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzNTcwMzEwODM5NjMtNmU1amxtYmdyNHRsYjBwM2Vzb3FwMzZqNnBpOGhiZmsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzNTcwMzEwODM5NjMtNmU1amxtYmdyNHRsYjBwM2Vzb3FwMzZqNnBpOGhiZmsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDE3NjMxODE5NjIwMDY0MjE0MTQiLCJlbWFpbCI6Im51Z3JhaGFraWF0c2FwdXRyYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjZEclpLTEJMdTRDbGZ1S1doNWw0M1EiLCJuYW1lIjoibnVncmFoYSBzYXB1dHJhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSnlSVDViRXBFU3gwNnNzNUQ5b2FWczJhY3gwQXNSM20xU29fTWdkPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Im51Z3JhaGEiLCJmYW1pbHlfbmFtZSI6InNhcHV0cmEiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTY0MDM0NjI0NCwiZXhwIjoxNjQwMzQ5ODQ0fQ.gTgPTQ2w4XLr3pcJKhNEQg-cOngnm6BtPUd8zIza1xH81AhvK5snlkpl3Xq5-dZyXK7i9_ctDtCW6AaR5OC4WvBHk5xUFUR7kJAhz0t6Yl6dQhYl46sEhx2pbcQV0IeZuLPwDnejM2itBhSvaaR4dArleNFYlQwYDQsRDU8eGnuyrM8HJaqJNTtO-tiDkeBAbVbeAf4PNS6tJabWyYSWbZL3S-L8KFz5zLm8VcU9T5biy6K2wyFzJm6sq35VpZdCm1uTXowwS6MQIDEUKALeZSBNM9qpxA-oYVkGilufeotn-piLhDmgaIdkQ_EtMT-I7HLYWzmSdeHXTSsCho0TMw"
        
        const client = new OAuth2Client(process.env.CLIENT_ID);
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        .then((ticket) => {
            let payload = ticket.getPayload()
            obj.email = payload.email
            return modelsUser.googleSignin(obj.email)
        })
        .then((user) => {
            console.log(user,"YYYY");
            if (user) return user
            statusCode = 201
            let {nik, name, pob, dob, gender, phoneNumber, address} = req.body
            let password = process.env.DEFAULT_PASSWORD
            let passwordHash = hashPassword(password)
        
            let data = {nik, name, email : obj.email, pob, dob, gender, phoneNumber, address, password: passwordHash}
            return modelsUser.googleRegister(data)
        })
        .then((user) => {
            const access_token = jwt.sign({id : user._id}, process.env.JWT_SECRET)
            let payload = {
              id: user._id,
              name: user.name,
              email: user.email,
              gender: user.gender,
              access_token
            }
            res.status(200).json(payload)
        })
        .catch((error) => {
            console.log(error);
        })
    }
}


module.exports = ControllerUser