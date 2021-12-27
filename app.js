if(process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4001
const cors = require('cors')
const routes = require('./routes/index')
const {connectToServer} = require('./config/mongoDB')
const methodOverride = require("method-override")

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride());

app.use(routes)

connectToServer()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server user kia is listening to ${PORT}`);
    })
})


