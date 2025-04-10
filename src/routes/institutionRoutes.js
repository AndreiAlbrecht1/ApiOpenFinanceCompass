import { Router } from 'express';

import InstitutionController from '../app/controllers/InstitutionController.js';

const router = new Router();

router.get('/', InstitutionController.getInstitutions);
router.get('/:id', InstitutionController.getInstitutionById);
router.post('/', InstitutionController.createInstitution);
router.patch('/:id', InstitutionController.updateInstitution);
router.delete('/:id', InstitutionController.deleteInstitution);

export { router as institutionRoutes };
