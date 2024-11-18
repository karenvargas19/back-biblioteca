import { pool } from '../db.js';

export const getRoles =  async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM roles');
        res.json(rows);
    }catch(error){
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
    
};

export const getRolesId =  async (req, res) => {
    try{
        const idRol = req.params.id;
        const [rows] = await pool.query('SELECT * FROM roles where id_rol = ?', [idRol]);

        if(rows.length <= 0) return res.status(404).json({
            message: "No se encontro el rol"
        });

        res.json(rows[0]);

    }catch(error){
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
};

export const createRoles = async (req, res) => {
    try{
        const {nombre_rol } = req.body;
        const [rows] =  await pool.query('INSERT INTO roles (nombre_rol) VALUES (?)', [nombre_rol]);
        res.send({
            nombre_rol,
            id: rows.insertId
        });
    }catch(error){
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