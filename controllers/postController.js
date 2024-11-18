import Post from "../models/post.js";
export const createPost = async (req, res) => {
  try {
    // Check for email existence before creating new post
    console.log('Request Body:', req.body);
    const existingPost = await Post.findOne({ email: req.body.email });

    if (!existingPost) {
      // Create new post with proper type validation (consider adding)

      // Example type validation (add more checks as needed)
      if (typeof req.body.type !== 'string') {
        return res.status(400).json({
          status: "failed",
          message: "Invalid type provided"
        });
      }

      const newPost = await Post.create({
        name: req.body.name,
        email: req.body.email,
        price: parseFloat(req.body.price), // Validate and convert price to float
        type: req.body.type,
        category: req.body.category,
        capacity: req.body.capacity,
      });

      // Return successful response with the created post
      return res.status(200).json({
        status: "success",
        message: "Post created successfully!",
        data: newPost,
      });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(400).json({
      status: "failed",
      message: "An error occurred while creating the post",
    });
  } finally {
    // Optional: You can add cleanup logic here if needed (e.g., closing connections)
  }
};
// get all PcreatePost 
export const getPosts = async (req, res) => {
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
  export   
 default { createPost, getPosts };