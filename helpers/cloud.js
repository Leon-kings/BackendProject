// const cloudinary = require('cloudinary').v2;
import {v2 as cloudinary} from "cloudinary"
// require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export const uploadFile = async (file) => {
    try {
      // Assuming you’re using a service like Cloudinary for file uploads
      const result = await cloudinary.uploader.upload(file.path);
      return result; // Make sure this object has `secure_url` or similar properties
    } catch (error) {
      throw new Error("File upload failed");
    }
  };
  

// module.exports = uploadFile;
export default uploadFile;