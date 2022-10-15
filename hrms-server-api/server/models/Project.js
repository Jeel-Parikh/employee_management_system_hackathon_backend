import mongoose from 'mongoose';
var ProjectSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    start_date:{
        type:Date
    },
    project_members:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: "user"
    },
    status:{
        type:String
    },
    end_date:{
        type:Date
    },
    deadline:{
        type:Date
    },
    estimated_duration:{
        type:Number
    }

})
const Project = mongoose.model("project", ProjectSchema)
export default Project;