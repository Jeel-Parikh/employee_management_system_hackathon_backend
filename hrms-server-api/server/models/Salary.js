import mongoose from 'mongoose';
const SalarySchema = new mongoose.Schema({
    base_salary: {
        type: Number,
        default: 0

    },
    bonus: {
        type: Number,
        default: 0
    },
    allowance: {
        type: Number,
        default: 0

    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }

})
const Salary=mongoose.model("salary",SalarySchema)
export default Salary;