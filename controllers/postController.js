import Post from "../models/post.js";

export const createPost = async (req, res) => {
  try {
    const postImg = await img.findOne({ img: req.body.img });
    if (postImg) {
      return res
        .status(400)
        .json({
          status: "failed",
          message: "Post with this image already exists",
        });
    }

    const newPost = await Post.create({
      head: req.body.head,
      img: req.body.img,
      title: req.body.title,
     price: req.body.price,
    });
    res
      .status(200)
      .json({
        status: "success",
        message: "Post created successfully",
        data: newPost,
        
      });
   
      
  } catch (err) {
   return res.status(400).json({ status: "failed", message: err.message });
    
  }
};



export const getPost = async (req, res) => {
  try {
    const {limit = 10 ,search, page } = req.params;
    const Posts = await Post.find().limit(limit)
    res
      .status(200)
      .json({
        status: "success",
        message: "Post fetched successfully",
        data: Posts,
      });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

// get Post a specific Post

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw Error("Post not found");
    res.json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update post

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) throw Error("Post not found");
    res.json({
      status: "success: Post updated successfully",
      post,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete post

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) throw Error("Post not found");
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
