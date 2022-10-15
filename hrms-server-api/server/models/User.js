import mongoose from 'mongoose';
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
    },
    contactNumber: {
        type: Number,
    },
    skills: {
        type: String
    },
    address: {
        type: String
    },
    designation: {
        type: String,
        required: true,
        enum: ["admin", "employee", "project_manager", "account_manager"]
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    joiningDate: {
        type: Date,
        required: true
    },
    bankAccount: {
        type: Number
    },
    aadharCard: {
        type: String
    },
    panCard: {
        type: String
    },
    userPhoto: {
        type: String
    },
    ifsc: {
        type: String
    },
    bankName: {
        type: String
    },
    lastEmployment: {
        type: String
    },
    salary: {
        type: Number
    }
})
const User = mongoose.model("user", UserSchema)
export default User;