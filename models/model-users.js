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
}

module.exports = modelsUser