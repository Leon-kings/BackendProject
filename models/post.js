import mongoose from 'mongoose';
// const mongoose = require('mongoose');
const Post=()=>{
const postSchema = new mongoose.Schema({
    // ... your post schema fields
    image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});
mongoose.model('Post', postSchema);
}
// Export the model as the default export
// module.exports = mongoose.models.Post ||

export default Post;