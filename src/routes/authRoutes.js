import { Router } from 'express';

import AuthController from '../app/controllers/AuthController.js';

const router = new Router();

router.post('/login', AuthController.login);

export { router as authRoutes };
