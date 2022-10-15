import mongoose from 'mongoose';
const TaskSchema = new mongoose.Schema({

    date: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    task: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ["inProgress", "completed"],
            default: "inProgress",
            required: true

        }
    }]
    // aadhar_card aadharCard userId

})
const Task = mongoose.model("task", TaskSchema)
export default Task;