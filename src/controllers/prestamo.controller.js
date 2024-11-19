import { pool } from '../db.js';


export const createPrestamo =  async (req, res) => {
    try{
        const {id_libro, id_usuario, fecha_prestamo, fecha_devolucion}= req.body;
        const [result] = await pool.query('UPDATE Libros SET disponibles = disponibles - 1 WHERE id_libro = ?', [ id_libro]);
        if(result.affectedRows === 0) return res.status(404).json({
            message: "No actualizo libros"
        });
        const [rows] =  await pool.query('INSERT INTO Prestamos (id_libro, id_usuario, fecha_prestamo, fecha_devolucion) VALUES (?,?,?,?)',
             [id_libro, id_usuario, fecha_prestamo, fecha_devolucion]);
        res.send({
            id_libro,
            id: rows.insertId
        });
        res.json(rows[0]);
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
};

export const getPrestamosIdLibro =  async (req, res) => {
    try{
        const idLibro = req.params.id;
        const [rows] = await pool.query(
            `SELECT p.*, u.nombre FROM Prestamos p
            JOIN Usuarios u ON p.id_usuario = u.id_usuario
            WHERE p.id_libro = ? AND p.devuelto = false`
            , [idLibro]);

        if(rows.length <= 0) return res.status(404).json({
            message: "No se encontro los prestamos"
        });

        res.json(rows);

    }catch(error){
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
};

export const createDevolucion =  async (req, res) => {
    try{
        const {id_prestamo, fecha_real, observaciones, id_libro}= req.body;
        const [resulta] = await pool.query('UPDATE Prestamos SET devuelto = true WHERE id_prestamo = ?', [ id_prestamo]);
        if(resulta.affectedRows === 0) return res.status(404).json({
            message: "No actualizo prestamos"
        });

        const [result] = await pool.query('UPDATE Libros SET disponibles = disponibles +1 WHERE id_libro = ?', [ id_libro]);
        if(result.affectedRows === 0) return res.status(404).json({
            message: "No actualizo libros"
        });

        const [rows] =  await pool.query('INSERT INTO Devoluciones (id_prestamo, fecha_real, observaciones) VALUES (?,?,?)',
             [id_prestamo, fecha_real, observaciones]);
        res.send({
            id_prestamo,
            id: rows.insertId
        });
        res.json(rows[0]);
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
};