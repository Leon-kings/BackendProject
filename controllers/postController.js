import Post from '../models/post.js';
import uploadFile from "../helpers/cloud.js"
export const createPost = async (req, res) => {
  const response = await uploadFile(req.file, res);
  try{
      const newPost = await Post.create({
          image: response.secure_url,
          body: req.body.body,
          author: req.body.name
      });
      return res.status(200).json({ 
        status: 'success', 
        message: 'your post was created successfully',
        newPost
      })
  }catch(err){
   return res.status(400).json({message: err.message})
  }
}



export const getPost = async (req, res) => {
    try{
        const posts = await Post.find();
        return res.status(200).json(posts)
    } catch(err){
      return res.status(400).json({message: err.message})
    }
}


export const getPostById = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) throw Error("Post not found");
      return res.json(post);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  };
  
  // update post
  
  export const updatePost = async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!post) throw Error("Post not found");
      return res.json({
        status: "success: Post updated successfully",
        post,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  
  // delete post
  
  export const deletePost = async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) throw Error("Post not found");
      return res.json({ message: "Post deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };


