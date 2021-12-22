if(process.env.NODE_ENV==='development') require('dotenv').config()
const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI;

const client = new MongoClient(connectionString);

let dbConnection;

module.exports = {
    connectToServer: async function () {
        try {
            await client.connect()
            const database = client.db('kia-users')
            dbConnection = database
            console.log(`success connect to database`);
        } catch (error) {
            console.log(error);
            await client.close()
        }
    },
  
    getDb: function () {
      return dbConnection;
    },
  };