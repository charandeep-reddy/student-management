import mongoose from "mongoose"
const { Schema } = mongoose

const Student = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    age: {
        type: Number,
        min : [18, "Age must be above 18"]
    },
    department: String,
    admissionDate: { 
        type: Date, 
        default: Date.now 
    }
})

export default mongoose.model("Student", Student)