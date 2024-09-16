import { db } from "../database/connection.js";

const create = async({ balanza_id, nombre_balanza, ubicacion, capacidad_maxima, id_unico }) => {
    const query = {
        text: `
        INSERT INTO balanzas (balanza_id, nombre_balanza, ubicacion, capacidad_maxima, id_unico)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING balanza_id, nombre_balanza, ubicacion, capacidad_maxima, id_unico
        `,
        values: [balanza_id, nombre_balanza, ubicacion, capacidad_maxima, id_unico]
    }
    const {rows} = await db.query(query)
    return rows[0]
}
const getAllbalanzas = async () => {
    const query = `
        SELECT * 
        FROM balanzas
    `;
    const { rows } = await db.query(query);
    return rows;
};

export const BalanzaModel = {
    create,
    getAllbalanzas
}