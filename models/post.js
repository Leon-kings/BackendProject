import mongoose from 'mongoose';

const Post=()=>{
const postSchema = new mongoose.Schema({
    // ... your post schema fields
    email: {
        type: String,
        required: true
    },
   price: {
        type: String,
        required: true
    },
   category: {
        type: String,
        required: true
    },
    capacity: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
   type: {
        type: String,
        required: true
    }
});
mongoose.model('Post', postSchema);
}
export default Post;