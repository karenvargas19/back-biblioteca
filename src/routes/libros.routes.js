import {Router} from 'express';
import { getLibros, createLibros} from '../controllers/libros.controller.js';

const router = Router();

router.get('/libros', getLibros);
router.post('/libros', createLibros);


export default router;