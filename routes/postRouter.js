import express from 'express';
import { createPost,getPosts,getPostById,deletePost} from '../controllers/postController.js';
// Assuming multer is already using import/export
const router = express.Router();
router.post('/', createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.delete('/:id', deletePost);
export default router;