import { Router } from 'express';

import InstitutionController from '../app/controllers/InstitutionController.js';
import authMiddleware from '../app/middlewares/authMiddleware.js';

const router = new Router();

router.use(authMiddleware);

router.get('/', InstitutionController.getInstitutions);
router.get('/:id', InstitutionController.getInstitutionById);
router.post('/', InstitutionController.createInstitution);
router.patch('/:id', InstitutionController.updateInstitution);
router.delete('/:id', InstitutionController.deleteInstitution);

export { router as institutionRoutes };
