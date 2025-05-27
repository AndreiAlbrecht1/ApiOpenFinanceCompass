import { Router } from 'express';
import OpenFinanceController from '../app/controllers/openFinanceController.js';

const router = new Router();

router.get('/', OpenFinanceController.getBalance);
router.post('/', OpenFinanceController.createAuthorization);
router.patch('/:action', OpenFinanceController.updateAuthorization);

export { router as openFinanceRoutes };
