import { db } from "../database/connection.js";

const create = async ({ inventario_id, balanza_id, producto_id, cantidad, peso_total}) => {

    const existingBalanza = await db.query('SELECT balanza_id FROM inventarios WHERE balanza_id = $1', [balanza_id]);

    if (existingBalanza.rows.length > 0) {
        throw new Error(`La balanza con ID ${balanza_id} ya está en uso.`);
    }

    const formattedDate = new Date().toISOString().replace('T', ' ').replace('Z', ''); // Usar la fecha actual
    
    const query = {
        text: `
        INSERT INTO inventarios (inventario_id, balanza_id, producto_id, cantidad, peso_total, fecha_registro)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING inventario_id, balanza_id, producto_id, cantidad, peso_total, fecha_registro
        `,
        values: [inventario_id, balanza_id, producto_id, cantidad, peso_total, formattedDate]
    };
    
    const { rows } = await db.query(query);
    return rows[0];
};
const getAllInventarios = async () => {
    const query = `
        SELECT * 
        FROM inventarios
    `;
    const { rows } = await db.query(query);
    return rows;
};

export const InventarioModel = {
    create,
    getAllInventarios
}