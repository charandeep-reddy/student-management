import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import Student from '../models/student.js'
import mongoose from 'mongoose'


app.use(express.json())
 
await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
console.log("MongoDB connected")

app.get("/students",async (req,res)=>{
    const students =await Student.find()
    res.send(students)
})

app.post("/students",async (req,res)=>{
    const {name, age, department} = req.body
    if(!name){
        return res.status(400).json({
            message: "Please Enter a name. Name is required"
        })
    }
    if(age < 18){
        return res.status(400).json({
            message: "Age must be above 18"
        })
    }
    const student = await Student.create({
        name,
        age,
        department
    })
    res.send(student)
})

app.get("/students/:id",async (req,res)=>{
    const id = req.params.id
    const student = await Student.findById(id)
    res.send(student)
})

app.put("/students/:id",async (req,res)=>{
    const id = req.params.id
    const {name, age, department} = req.body
    const student = await Student.findByIdAndUpdate(id, {
        name,
        age,
        department
    },{new:true})
    res.send(student)
})

app.delete("/students/:id",async (req,res)=>{
    const id = req.params.id
    await Student.findByIdAndDelete(id)
    res.send("Student deleted")
})

export default app