import Post from "../models/post.js";
import mongoose from "mongoose";
export const createPost = async (req, res) => {
  try {
    // Check for email existence before creating new post
    console.log('Request Body:', req.body);
    const existingPost = await Post.findOne({ email: req.body.email });

    if (!existingPost) {
      // Create new post with proper type validation (consider adding)

      // Example type validation (add more checks as needed)

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
    const { limit = 10, search = "", page = 1 } = req.query;

    // Convert limit and page to integers
    const limitInt = parseInt(limit, 10);
    const pageInt = parseInt(page, 10);

    // Build query for search (if applicable)
    const query = search
      ? { name: { $regex: search, $options: "i" } } // Example: search by name (case-insensitive)
      : {};

    // Fetch posts with pagination
    const posts = await Post.find(query)
      .limit(limitInt)
      .skip((pageInt - 1) * limitInt); // Skip results for previous pages

    // Total number of posts for pagination
    const totalPosts = await Post.countDocuments(query);

    return res.status(200).json({
      status: "success",
      message: "Posts fetched successfully",
      data: {
        posts,
        pagination: {
          totalPosts,
          totalPages: Math.ceil(totalPosts / limitInt),
          currentPage: pageInt,
        },
      },
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};


  // delete PcreatePost post

  export const deletePost = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate id format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
  
      const post = await Post.findByIdAndDelete(id);
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      return res.json({ message: "Post deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  export   
 default { createPost, getPosts };