import express from 'express';
import multer from 'multer';
// import * as upload from "../helpers/multer.js"
import {createPost , getPost , getPostById , updatePost , deletePost} from "../controllers/postController.js"
const router = express.Router();

const storage = multer.memoryStorage(); // or use diskStorage if saving to disk
const upload = multer({ storage: storage });
router.get('/', getPost);
router.post('/', upload.single('image'), createPost);
// router.post('/',upload.single("image"), createPost);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);


export default router;