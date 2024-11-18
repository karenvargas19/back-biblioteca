import { pool } from '../db.js';

export const getLibros =  async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Libros');
        res.json(rows);
    }catch(error){        
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

export const updateRoles =  async (req, res) => {
    try{
        const {id} = req.params;
        const {nombre_rol}= req.body;

        const [result] = await pool.query('UPDATE roles SET nombre_rol = IFNULL(?, nombre_rol) WHERE id_rol = ?', [ nombre_rol, id]);
        if(result.affectedRows === 0) return res.status(404).json({
            message: "No se encontro el rol"
        });

        const [rows] = await pool.query('SELECT * FROM roles where id_rol = ?', [id]);

        res.json(rows[0]);
    }catch(error){
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
};

export const deleteRoles =  async (req, res) => {
    try{
        const [result] = await pool.query('DELETE FROM roles where id_rol = ?', [ req.params.id]);
        if(result.affectedRows <= 0) return res.status(404).json({
            message: "No se encontro el rol"
        });

        res.sendStatus(204);
    }catch(error){
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
};