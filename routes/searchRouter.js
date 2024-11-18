import express from 'express';
import { searchPosts } from "../controllers/searchController.js";
const router = express.Router();
// Route for searching posts
router.get("/", searchPosts);

export default router;