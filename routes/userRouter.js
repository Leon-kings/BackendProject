import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, authUser } from '../controllers/userController.js';
const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/auth', authUser);

export default router;