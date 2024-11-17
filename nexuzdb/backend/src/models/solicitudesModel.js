import { db } from "../database/connection.js";

const create = async({ nombre, apellido, correo, celular }) => {
    const query = {
        text: `
        INSERT INTO solicitudes (nombre, apellido, correo, celular)
        VALUES ($1, $2, $3, $4)
        RETURNING id, nombre, apellido, correo, celular
        `,
        values: [nombre, apellido, correo, celular]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const getAllSolicitudes = async () => {
    const query = `SELECT * FROM solicitudes`;
    const { rows } = await db.query(query);
    return rows;
};

const remove = async (id) => {
    const query = {
        text: `DELETE FROM solicitudes WHERE id = $1 RETURNING *;`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows[0]; // Devuelve la solicitud eliminada
};

export const SolicitudesModel = {
    create,
    getAllSolicitudes,
    remove
};
