import { pool } from '../db.js';

export const getUsuario =  async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Usuarios');
        res.json(rows);
    }catch(error){        
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
    
};

export const getUsuarioId =  async (req, res) => {
    try{
        const idUsuario = req.params.id;
        const [rows] = await pool.query('SELECT * FROM Usuarios where id_usuario = ?', [idUsuario]);

        if(rows.length <= 0) return res.status(404).json({
            message: "No se encontro el usuario"
        });

        res.json(rows[0]);

    }catch(error){
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
};

export const createUsuario = async (req, res) => {
    try{
        const {nombre, email, telefono, foto, grado, id_rol } = req.body;
        const [rows] =  await pool.query(
            `INSERT INTO Usuarios (nombre, email, telefono, foto, grado, id_rol) 
            VALUES (?,?,?,?,?,?)`
            , [nombre, email, telefono, foto, grado, id_rol]);
        res.send({
            nombre,
            id: rows.insertId
        });
    }catch(error){
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
};

export const updateUsuario =  async (req, res) => {
    try{
        const {id} = req.params;
        const {nombre, email, telefono, foto, grado, id_rol}= req.body;

        const [result] = await pool.query(`UPDATE Usuarios SET nombre = IFNULL(?, nombre), email = IFNULL(?, email),
             telefono = IFNULL(?, telefono), foto = IFNULL(?, foto), grado = IFNULL(?, grado), id_rol = IFNULL(?, id_rol)
             WHERE id_usuario = ?`, [ nombre, email, telefono, foto, grado, id_rol, id]);
        if(result.affectedRows === 0) return res.status(404).json({
            message: "No se encontro el usuario"
        });

        res.json(result);
    }catch(error){
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
};

export const deleteUsuario =  async (req, res) => {
    try{
        const [result] = await pool.query('DELETE FROM Usuarios where id_usuario = ?', [ req.params.id]);
        if(result.affectedRows <= 0) return res.status(404).json({
            message: "No se encontro el usuario"
        });

        res.sendStatus(204);
    }catch(error){
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
};