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
    // Verificar si la balanza ya está asociada a un inventario
    const checkBalanzaQuery = `
        SELECT * FROM inventario WHERE balanza_id = $1;
    `;
    
    const checkResult = await db.query(checkBalanzaQuery, [balanza_id]);

    if (checkResult.rows.length > 0) {
        throw new Error("La balanza ya está asociada a otro inventario.");
    }

    // Si no está asociada, proceder a crear el nuevo inventario
    const formattedDate = new Date().toISOString().replace('T', ' ').replace('Z', ''); // Usar la fecha actual

    const insertQuery = `
        INSERT INTO inventario (producto_id, balanza_id, cantidad, peso, fecha)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [producto_id, balanza_id, 0, 0, formattedDate];

    try {
        const { rows } = await db.query(insertQuery, values);
        return rows[0]; // Devuelve el inventario creado
    } catch (error) {
        console.error("Error al crear el inventario:", error);
        throw new Error("Error al crear el inventario.");
    }
};

const updateInventarioProducto = async (inventario_id, nuevo_producto_id) => {
    // Validación mínima
    if (!inventario_id || !nuevo_producto_id) {
        throw new Error("Los campos inventario_id y nuevo_producto_id son requeridos.");
    }

    const query = `
        UPDATE inventario
        SET producto_id = $1, fecha = $2
        WHERE id = $3
        RETURNING *;
    `;
    
    const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato YYYY-MM-DD HH:MM:SS
    const values = [nuevo_producto_id, fechaActual, inventario_id];

    try {
        const { rows } = await db.query(query, values);
        if (rows.length === 0) {
            throw new Error("Inventario no encontrado.");
        }
        return rows[0]; // Devuelve el inventario actualizado
    } catch (error) {
        console.error("Error al actualizar el producto del inventario:", error);
        throw new Error("Error al actualizar el producto del inventario.");
    }
};

export const InventarioModel = {
    getAllInventarios,
    createInventario, // Agregamos la nueva función aquí
    updateInventarioProducto
};