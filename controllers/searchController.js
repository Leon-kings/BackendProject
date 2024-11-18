import Post from "../models/post";
export const searchPosts = async (req, res) => {
  try {
    // Extract search parameters from query
    const { search = "", type, category, page = 1, limit = 10 } = req.query;

    // Convert `page` and `limit` to integers
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);

    // Build the query object
    const query = {};

    // Search by name or email (case-insensitive)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } }, // Matches `name`
        { email: { $regex: search, $options: "i" } }, // Matches `email`
      ];
    }

    // Filter by `type` if provided
    if (type) {
      query.type = type;
    }

    // Filter by `category` if provided
    if (category) {
      query.category = category;
    }

    // Fetch matching posts with pagination
    const posts = await Post.find(query)
      .limit(limitInt)
      .skip((pageInt - 1) * limitInt);

    // Count total matching documents for pagination metadata
    const totalPosts = await Post.countDocuments(query);

    // Respond with the search results
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
    console.error("Error in searchPosts:", err);
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while searching for posts",
    });
  }
};
