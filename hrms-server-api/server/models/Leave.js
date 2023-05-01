import mongoose from 'mongoose';
const LeaveSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    appliedDate: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["PL", "EL", "AL", "CL", "SL", "ML"]
    },
    admin_response: {
        type: String,
        required: true,
        default: "pending",
        enum: ["pending", "approved", "denied"]
    }, 
    totalDays: {
        type: Number,
        default: 0
    }
})
const Leave = mongoose.model("leave", LeaveSchema)
export default Leave;