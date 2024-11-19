import { pool } from '../db.js';


export const createPrestamo =  async (req, res) => {
    try{
        const {id_libro, id_usuario, fecha_prestamo, fecha_devolucion}= req.body;
        const [result] = await pool.query('UPDATE Libros SET disponibles = disponibles - 1 WHERE id_libro = ?', [ id_libro]);
        if(result.affectedRows === 0) return res.status(404).json({
            message: "No actualizo libros"
        });
        const [rows] =  await pool.query('INSERT INTO Prestamos (id_libro, id_usuario, fecha_prestamo, fecha_devolucion) VALUES (?,?,?)',
             [id_libro, id_usuario, fecha_prestamo, fecha_devolucion]);
        res.send({
            id_libro,
            id: rows.insertId
        });
        res.json(rows[0]);
    }catch(error){
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
};

export const getPrestamosIdLibro =  async (req, res) => {
    try{
        const idLibro = req.params.id;
        const [rows] = await pool.query('SELECT * FROM Prestamos where id_libro = ?', [idLibro]);

        if(rows.length <= 0) return res.status(404).json({
            message: "No se encontro los prestamos"
        });

        res.json(rows[0]);

    }catch(error){
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
};