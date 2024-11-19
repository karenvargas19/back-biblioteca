import { pool } from '../db.js';

export const getLibros =  async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT l.id_libro, l.titulo, l.autor, l.disponibles, COUNT(p.id_prestamo) AS prestamos_activos
            FROM Libros l 
            LEFT JOIN Prestamos p ON l.id_libro = p.id_libro AND p.devuelto = false
            GROUP BY l.id_libro, l.titulo, l.autor;`);
        res.json(rows);
    }catch(error){      
        console.log(error);  
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
    
};

export const getLibrosId =  async (req, res) => {
    try{
        const idLibro = req.params.id;
        const [rows] = await pool.query('SELECT * FROM Libro where id_libro = ?', [idLibro]);

        if(rows.length <= 0) return res.status(404).json({
            message: "No se encontro el libro"
        });

        res.json(rows[0]);

    }catch(error){
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
};

export const createLibros = async (req, res) => {
    try{
        const {titulo, autor, disponibles } = req.body;
        const [rows] =  await pool.query('INSERT INTO Libros (titulo, autor, disponibles) VALUES (?,?,?)', [titulo, autor, disponibles]);
        res.send({
            titulo,
            id: rows.insertId
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
};