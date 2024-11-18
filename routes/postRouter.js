import express from 'express';
import { createPost,getPosts} from '../controllers/postController.js';
// import upload from '../helpers/multer.js'; 
// Assuming multer is already using import/export
const router = express.Router();

router.post('/', createPost);
router.get('/', getPosts);

export default router;