import mongoose from "mongoose";

const testimonySchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: false,
        unique: true
    },
   testimony: {
        type: String,
        required: true  
    }
})

const Testimony = mongoose.model("Testimony", testimonySchema);

export default Testimony;