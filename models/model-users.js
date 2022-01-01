const { ObjectId } = require('bson')
const {getDb} = require('../config/mongoDB')


class modelsUser {
    static parents() {
        return new Promise ((resolve, reject) => {
            getDb().collection("parents").find().toArray()
            .then((parents) => {
                console.log(parents);
                resolve(parents)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
    static getProfile(email) {
        return new Promise((resolve, reject) => {
            getDb().collection("parents").findOne({ email })
                .then((parent) => {
                    console.log(parent);
                    resolve(parent)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
    static register(data) {
        return new Promise((resolve, reject) => {
            getDb().collection("parents").insert(data)
                .then((user) => {
                    console.log(user);
                    resolve(user)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

module.exports = modelsUser