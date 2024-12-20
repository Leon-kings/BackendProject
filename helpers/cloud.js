import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const uploadFile = async (file, res) => {
  try {
    const response = await cloudinary.uploader.upload(file.path);
    return response;
  } catch (err) {
    return res.status(500).send(err);
  }
};

export default uploadFile;