import express from 'express';
import upload from "../helpers/multer"
import {createPost , getPost , getPostById , updatePost , deletePost} from "../controllers/postController.js"
const router = express.Router();

router.get('/', getPost);
router.post('/',upload.single("image"), createPost);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);


export default router;