import {Router} from 'express';
import { getRoles, createRoles, updateRoles, getRolesId, deleteRoles } from '../controllers/roles.controller.js';

const router = Router();

router.get('/roles', getRoles);
router.get('/roles/:id', getRolesId);
router.post('/roles', createRoles);
router.patch('/roles/:id', updateRoles);
router.delete('/roles/:id', deleteRoles);

export default router;