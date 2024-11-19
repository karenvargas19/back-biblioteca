import {Router} from 'express';
import { createPrestamo, getPrestamosIdLibro} from '../controllers/prestamo.controller.js';

const router = Router();

router.get('/prestamo/:idlibro', getPrestamosIdLibro);
router.post('/prestamo', createPrestamo);


export default router;