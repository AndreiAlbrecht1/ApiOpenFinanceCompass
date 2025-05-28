import { Router } from 'express';
import OpenFinanceController from '../app/controllers/OpenFinanceController.js';

const router = new Router();

router.get('/', OpenFinanceController.getBalance);
router.post('/', OpenFinanceController.createAuthorization);
router.patch('/:action', OpenFinanceController.updateAuthorization);
router.post('/transaction', OpenFinanceController.createTransactionOpenFinance);

export { router as openFinanceRoutes };
