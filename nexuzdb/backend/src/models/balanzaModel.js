import { db } from "../database/connection.js";

const getAllbalanzas = async () => {
    const query = `
        SELECT * 
        FROM balanzas
    `;
    const { rows } = await db.query(query);
    return rows;
};

export const BalanzaModel = {
    getAllbalanzas
}