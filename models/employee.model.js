import mongoose from "mongoose";
const { Schema } = mongoose;

const employeeSchema = new Schema({
    emp_name: {
        type: String,
        required:true,
        trim:true,
    },
    emp_email: {
        type: String,
        required:true,
        trim:true
    },
    emp_gender: {
        type: String,
        required:true,
    },
    emp_department: {
        type: String,
        enum:["NodeJS","ReactJS","PHP"],
        required:true
    },
    emp_designation: {
        type: String,
        enum:["Senior Developer","Junior Developer"],
        required:true
    },
    emp_resume: {
        type: String,
        required:true
    },
    emp_address: {
        country: {
            type: String,
            required:true
        },
        state: {
            type: String,
            required:true
        },
        city: {
            type: String,
            required:true
        },
    }
}, { timestamps: true })


export const Employee = mongoose.model('employee', employeeSchema);

