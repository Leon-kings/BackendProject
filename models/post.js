import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    head: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
   
    img: {
      data: Buffer,
      contentType: String,
      unique: true
    },
    price: {
        type: String,
        required: true
    }
})

const Post = mongoose.model("Post", postSchema);

export default Post;