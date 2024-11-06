import express from 'express';
import * as upload from "../helpers/multer.js"
import {createPost , getPost , getPostById , updatePost , deletePost} from "../controllers/postController.js"
const router = express.Router();

router.get('/', getPost);
router.post('/', createPost);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);


export default router;