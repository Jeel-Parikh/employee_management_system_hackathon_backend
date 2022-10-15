import mongoose from 'mongoose';
const connectMongo = () => {
    mongoose.connect('mongodb://localhost:27017/demo')
        .then(() => {
            console.log("Connected successfully")
        })
        .catch((e) => {
            console.log("Something went wrong")
            console.log(e)
        })
}
export default connectMongo;
