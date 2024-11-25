import crypto from 'crypto'
import Post from "../models/post.js";
import mongoose from "mongoose";
export const createPost = async (req, res) => {
  try {
    // Optional: Drop the problematic index if it exists
    try {
      await mongoose.connection.collection('posts').dropIndex('details_1');
    } catch (error) {
      // Ignore error if index doesn't exist
      console.log('Index might not exist:', error.message);
    }

    const existingPost = await Post.findOne({ url: req.body.url });
    console.log('the existing url is ', existingPost);

    if (!existingPost) {
      const randomString = crypto.randomBytes(16).toString('hex');

      const newPost = await Post.create({
        name: req.body.name,
        email: req.body.email,
        price: parseFloat(req.body.price),
        type: req.body.type,
        category: req.body.category,
        capacity: req.body.capacity,
        url: req.body.url,
        index: randomString,
      });

      return res.status(200).json({
        status: 'success',
        message: 'Post created successfully!',
        data: newPost,
      });
    } else {
      res
        .status(400)
        .json({ status: 'failed', message: 'The url already exists' });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      status: 'failed',
      message: err.message,
    });
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
// get post byID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params; // Extract `id` from request parameters

    // Find post by ID
    const post = await Post.findById(id);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({
        status: "failed",
        message: "Post not found",
      });
    }

    // Return the post
    return res.status(200).json({
      status: "success",
      message: "Post fetched successfully",
      data: post,
    });
  } catch (err) {
    console.error("Error fetching post by ID:", err);

    // Handle invalid ObjectId error
    if (err.kind === "ObjectId") {
      return res.status(400).json({
        status: "failed",
        message: "Invalid post ID format",
      });
    }

    return res.status(500).json({
      status: "failed",
      message: "An error occurred while fetching the post",
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