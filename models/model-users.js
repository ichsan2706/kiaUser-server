const { ObjectId } = require('bson')
const {getDb} = require('../config/mongoDB')


class modelsUser {
    static register(data) {
        return new Promise ((resolve, reject) => {
            getDb().collection("parents").insertOne(data)
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                console.log(err);
                reject(err)
            })
        })
    }

    static login(phoneNumber){
        return new Promise ((resolve, reject) => {
            getDb().collection("parents").findOne({phoneNumber: phoneNumber})
            .then((data) => {
                console.log(data);
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
    
    static googleSignin(email){
        return new Promise ((resolve, reject) => {
            getDb().collection("parents").findOne({email:email})
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static googleRegister(data){
        return new Promise ((resolve, reject) => {
            getDb().collection("parents").insertOne(data)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static parents() {
        return new Promise ((resolve, reject) => {
            getDb().collection("parents").find().toArray()
            .then((parents) => {
                resolve(parents)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

}

module.exports = modelsUser