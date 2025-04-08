const express = require('express')
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

app.get("/",(req,res)=>{
 res.send("Hello")
})

module.exports = app
