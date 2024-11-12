import Post from '../models/post.js';
import uploadFile from "../helpers/cloud.js"
// export const createPost = async (req, res) => {
//   try {
//     const response = await uploadFile(req.file);
// console.log("Upload response:", response); // Add this line to debug

//     if (!response || !response.secure_url) {
//       throw new Error("File upload failed.",Error);
//       // console.log(Error);
//     }

//     const newPost = await Post.create({
//       image: response.secure_url,
//       body: req.body.body,
//       author: req.body.name,
//     });

//     console.log("Response before sending:", {
//       status: 'success',
//       message: 'Your post was created successfully',
//       newPost,
//     });

//     return res.status(200).json({
//       status: 'success',
//       message: 'Your post was created successfully',
//       newPost,
//     });
//   } catch (err) {
//     console.error("Error in createPost:", err);
//     return res.status(500).json({
//       status: 'error',
//       message: err.message || 'Something went wrong while creating the post',
//     });
   
//   }
// };

export const createPost = async (req, res) => {
  try {
    // Check if file exists in the request
    if (!req.file) {
      throw new Error("No file uploaded.");
    }

    // Attempt to upload the file
    const response = await uploadFile(req.file);
    console.log("Upload response:", response); // Debugging log

    // Check if the upload returned the expected data
    if (!response || !response.secure_url) {
      throw new Error("File upload failed."); // Corrected error throw syntax
    }

    // Attempt to create a new post in the database
    const newPost = await Post.create({
      image: response.secure_url,
      body: req.body.body,
      author: req.body.name,
    });

    console.log("Response before sending:", {
      status: 'success',
      message: 'Your post was created successfully',
      newPost,
    });

    // Return success response
    return res.status(200).json({
      status: 'success',
      message: 'Your post was created successfully',
      newPost,
    });
  } catch (err) {
    console.error("Error in createPost:", err);
    return res.status(500).json({
      status: 'error',
      message: err.message || 'Something went wrong while creating the post',
    });
  }
};





export const getPost = async (req, res) => {
    try{
        const posts = await Post.find();
        return res.status(200).json(posts)
    } catch(err){
      return res.status(404).json({message: err.message})
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
      return res.status(404).json({ message: error.message });
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


