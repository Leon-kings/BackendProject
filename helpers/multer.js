import express from 'express';
import multer from 'multer';
import path from 'path'; // Import the 'path' module for file path manipulation

import Post from '../models/post';
import fs from 'fs';

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, '..', 'uploads'); // Construct path relative to current file
    fs.mkdirSync(uploadsDir, { recursive: true }); // Create directory recursively if needed (sync for simplicity)
    console.log(uploadsDir);
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Timestamp + random number
    const ext = path.extname(file.originalname); // Extract original extension
    console.log(rq.file);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

// const upload = multer({ storage: storage });
const upload = multer({ dest: 'uploads/' });
router.post('/', (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            console.error("Multer error:", err);
            return res.status(500).json({ error: 'File upload failed' });
        }

        try {
            const newPost = new Post({
                image: req.file.path
            });
            const savedPost = await newPost.save();
            res.status(201).json(savedPost);
        } catch (err) {
            console.error("Error saving post:", err);
            res.status(500).json({ error: 'Failed to create post' });
        }
    });
});


export default router; // Export the router for use in your Express app