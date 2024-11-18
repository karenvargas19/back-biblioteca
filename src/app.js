import express from 'express';
import rolRoutes from './routes/roles.routes.js';


const app = express();
app.use(express.json());

app.use('/api', rolRoutes);

app.use((req,res,next)=>{
    res.status(404).json({
        message: 'endpoint not found'
    })
    }
);

export default app;