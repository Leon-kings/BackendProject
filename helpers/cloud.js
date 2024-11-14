// import { v2 as cloudinary } from "cloudinary"
// import dotenv from 'dotenv'
// dotenv.config()
// cloudinary.config({
//   cloud_name: process.env.CLOUDNAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// export const uploadFile = async (file) => {
//   try {
//     // Assuming you’re using a service like Cloudinary for file uploads
//     const result = await cloudinary.uploader.upload(file.path);
//     return result; // Make sure this object has `secure_url` or similar properties
//   } catch (error) {
//     throw new Error("File upload failed");
//   }
// };

// export default uploadFile;
// config/cloudinary.js
// const cloudinary = require('cloudinary').v2;
import { v2 as cloudinary } from "cloudinary"
import dotenv from 'dotenv'
import express from 'express'
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const app = express();

app.post('/upload', async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, { folder: 'your_folder_name' });
    console.log(result.secure_url); // Image URL
    // Use the URL as needed
  } catch (error) {
    // Handle errors
  }
});

// module.exports = cloudinary;
export default  cloudinary;