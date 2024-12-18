import express from 'express';
import cors from 'cors';
import rolRoutes from './routes/roles.routes.js';
import librosRoutes from './routes/libros.routes.js';
import prestamoRoutes from './routes/prestamo.routes.js';
import usuarioRoutes from './routes/usuarios.routes.js';


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', rolRoutes);
app.use('/api', librosRoutes);
app.use('/api', prestamoRoutes);
app.use('/api', usuarioRoutes);

app.use((req,res,next)=>{
    res.status(404).json({
        message: 'endpoint not found'
    })
    }
);

export default app;