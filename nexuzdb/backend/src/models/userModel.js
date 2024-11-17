import { db } from "../database/connection.js";

const create = async({usuario_id, nombre_usuario, email, contrasena, rol}) => {
    const query = {
        text: `
        INSERT INTO usuarios (usuario_id, nombre_usuario, email, contrasena, rol)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING usuario_id, nombre_usuario, email, rol
        `,
        values: [usuario_id, nombre_usuario, email, contrasena, rol]
    }
    const {rows} = await db.query(query)
    return rows[0]
}

const findOneEmail = async(email) => {
    const query = {
        text: `
        SELECT * FROM usuarios
        WHERE EMAIL = $1
        `,
        values: [email]
    }
    const {rows} = await db.query(query)
    return rows[0]
}

const getAllUsers = async () => {
    const query = `
        SELECT * 
        FROM usuarios
    `;
    const { rows } = await db.query(query);
    return rows;
};

export const UserModel = {
    create,
    findOneEmail,
    getAllUsers
}