import Post from "../models/post.js";

// create PcreatePost post
export const createPost = async (req, res) => {
  try {
    const post = await Post.findOne({ email: req.body.email });
    if (post) {
      return res
        .status(400)
        .json({
          status: "failed",
          message: "Post content with this email already exists",
        });
    }
    const newPost = await Post.create({
      name: req.body.name,
      email: req.body.email,
      price: req.body.price,
      category: req.body.category,
      capacity: req.body.capacity
   
    });
  return res
      .status(200)
      .json({
        status: "success",
        message: "Post created successfully see you in upcomming 4 days",
        data: newPost,
        
      });
   
      
  } catch (err) {
   return res.status(400).json({ status: "failed", message: err.message });
    
  }
};
// get all PcreatePost 
export const getPost = async (req, res) => {
    try {
      const {limit = 10 ,search, page } = req.params;
      const post = await Post.find().limit(limit)
    return res
        .status(200)
        .json({
          status: "success",
          message: "post fetched successfully",
          data: post,
        });
    } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
    }
  };

  // delete PcreatePost post

export const deletePost = async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) throw Error("post not found");
     return res.json({ message: "post deleted successfully" });
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }
  };