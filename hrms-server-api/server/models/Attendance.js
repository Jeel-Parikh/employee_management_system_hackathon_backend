import mongoose from 'mongoose';
const AttendanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: Boolean,
        default: false,
        required: true
    }
})
const Attendance = mongoose.model("attendance", AttendanceSchema)
export default Attendance;