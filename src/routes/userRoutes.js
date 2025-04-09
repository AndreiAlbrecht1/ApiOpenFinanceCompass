import { Router } from 'express';

import UserController from '../app/controllers/UserController.js';

const router = new Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export { router as userRoutes };
