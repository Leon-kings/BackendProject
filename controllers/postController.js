import Post from "../models/post.js";

// create PcreatePost post
export const createPost = async (req, res) => {
  try {
    // Check for email existence before creating new post
    const existingPost = await Post.findOne({ email: req.body.email });
    if (existingPost) {
      return res.status(400).json({
        status: "failed",
        message: "Post content with this email already exists",
      });
    }

    // Create new post with proper type validation
    const newPost = await Post.create({
      name: req.body.name,
      email: req.body.email,
      price: parseFloat(req.body.price), // Validate and convert price to float
      type: req.body.type, // No type validation explicitly shown, consider adding
      category: req.body.category,
      capacity: req.body.capacity,
    });

    // Return successful response with the created post
    return res.status(200).json({
      status: "success",
      message: "Post created successfully!",
      data: newPost,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(400).json({
      status: "failed",
      message: "An error occurred while creating the post",
    }); // Generic error message for the user, log specific details for debugging
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