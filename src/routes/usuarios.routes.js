import {Router} from 'express';
import { getUsuario, createUsuario, updateUsuario, getUsuarioId, deleteUsuario } from '../controllers/usuarios.controller.js';

const router = Router();

router.get('/usuario', getUsuario);
router.get('/usuario/:id', getUsuarioId);
router.post('/usuario', createUsuario);
router.patch('/usuario/:id', updateUsuario);
router.delete('/usuario/:id', deleteUsuario);

export default router;