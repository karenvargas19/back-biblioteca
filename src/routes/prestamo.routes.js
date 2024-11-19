import {Router} from 'express';
import { createPrestamo, getPrestamosIdLibro, createDevolucion} from '../controllers/prestamo.controller.js';

const router = Router();

router.get('/prestamo/:id', getPrestamosIdLibro);
router.post('/prestamo', createPrestamo);
router.post('/devolucion', createDevolucion);


export default router;