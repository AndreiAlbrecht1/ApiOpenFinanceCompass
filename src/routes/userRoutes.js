import { Router } from 'express';

import UserController from '../app/controllers/UserController.js';

const router = new Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

router.get('/:id/accounts', UserController.getAccounts);
router.post('/:id/accounts', UserController.createAccount);
router.delete('/:id/accounts/:accountId', UserController.deleteAccount);

router.post('/:id/transactions', UserController.createTransaction);

export { router as userRoutes };
