// import path from 'path';
// import multer from 'multer';
// const upload = multer({
//     storage: multer.diskStorage({}),
//     fileFilter: (req, file, cb) => {
//         let ext = path.extname(file.originalname);
//         if(ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg'){
//             cb(new Error('File type not supported'), false);
//         }
//         cb(null, true);
//     }
// });

// // module.exports = upload;
// export default upload;
// const express = require('express');
import express from 'express'
// const multer = require('multer');
import multer from 'multer';
// const Post = require('../models/post'); // Assuming your Post model is in the models directory
import Post from '../models/post';
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const newPost = new Post({
            // ... other fields from your request body
            image: req.file.path // Assuming you want to store the file path
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// module.exports = router;
export default upload;