import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
    // ... your post schema fields
    email: { 
         type: String,
        //  required: true, 
       
         },
   price: {
        type: String,
        // required: true
    },
   category: {
        type: String,
        // required: true
    },
    capacity: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        // required: true
    },
   type: {
        type: String,
        // required: true
    },
    url: {
        type: String,
        required: true
        // unique:true
    }

});
export default mongoose.model('Post',   
    postSchema);