import { db } from "../src/database/connection.js";

const create = async({producto_id, nombre_producto, codigo_barras, descripcion, peso_unitario, categoria}) => {
    const query = {
        text: `
        INSERT INTO productos (producto_id, nombre_producto, codigo_barras, descripcion, peso_unitario, categoria)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING producto_id, nombre_producto, codigo_barras, descripcion, peso_unitario, categoria
        `,
        values: [producto_id, nombre_producto, codigo_barras, descripcion, peso_unitario, categoria]
    }
    const {rows} = await db.query(query)
    return rows[0]
}
const getAllProductos = async () => {
    const query = `
        SELECT * 
        FROM productos
    `;
    const { rows } = await db.query(query);
    return rows;
};

export const ProductoModel = {
    create,
    getAllProductos
}