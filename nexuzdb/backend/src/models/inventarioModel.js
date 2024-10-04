import { db } from "../database/connection.js";

const getAllInventarios = async () => {
    const query = `
        SELECT 
            i.id AS inventario_id,
            p.nombre AS producto_nombre,
            b.tipo AS balanza_tipo,
            b.modelo AS balanza_modelo,
            i.cantidad,
            i.peso,
            i.fecha
        FROM 
            inventario i
        JOIN 
            productos p ON i.producto_id = p.id
        JOIN 
            balanzas b ON i.balanza_id = b.id
    `;

    const { rows } = await db.query(query);
    return rows; // Devuelve los registros obtenidos

};

const createInventario = async (producto_id, balanza_id) => {

    const formattedDate = new Date().toISOString().replace('T', ' ').replace('Z', ''); // Usar la fecha actual

    const query = `
        INSERT INTO inventario (producto_id, balanza_id, cantidad, peso, fecha)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [producto_id, balanza_id, 0, 0, formattedDate];

    const { rows } = await db.query(query, values);
    return rows[0]; // Devuelve el inventario creado
};

export const InventarioModel = {
    getAllInventarios,
    createInventario, // Agregamos la nueva función aquí
};