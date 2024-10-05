import { db } from "../database/connection.js";

const getAllHistorialInventarios = async () => {
    const query = `
        SELECT 
            h.id AS historial_id,
            p.nombre AS producto_nombre,
            b.tipo AS balanza_tipo,
            b.modelo AS balanza_modelo,
            h.cantidad,
            h.peso,
            h.fecha
        FROM 
            historial_inventario h
        JOIN 
            productos p ON h.producto_id = p.id
        JOIN 
            balanzas b ON h.balanza_id = b.id
        ORDER BY 
            h.fecha DESC;  -- Opcional: Ordenar por fecha
    `;
    const { rows } = await db.query(query);
    return rows; // Devuelve los registros obtenidos
};

export const HistorialInventarioModel = {
    getAllHistorialInventarios
};