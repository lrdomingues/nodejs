const express = require('express')
const router = require('./Utils/router')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const mongoConnection = process.env.MONGO_URI

const app = express()

mongoose.set("strictQuery", true);
mongoose.connect(mongoConnection, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => console.log("Connected to database"))

app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(router)
console.log(process.env.PORT)
app.listen(process.env.PORT, () => console.log('Server running'))
