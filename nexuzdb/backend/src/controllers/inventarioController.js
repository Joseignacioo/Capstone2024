import { InventarioModel } from "../models/inventarioModel.js";

const getAllInventarios = async (req, res) => {
    try {
        const inventario = await InventarioModel.getAllInventarios()

        return res.status(200).send(inventario)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'error server'
        })
    }
};
const createInventario = async (req, res) => {
    try {
        console.log(req.body);
        const { producto_id, balanza_id} = req.body; // No incluyas `id`

        if (!producto_id || !balanza_id) {
            return res.status(400).json({ ok: false, msg: "Faltan algunos parámetros" });
        }

        const newInventario = await InventarioModel.createInventario(producto_id, balanza_id);

        return res.status(201).send(newInventario);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
        });
    }
};


const updateInventarioProducto = async (req, res) => {
    try {
        const { nuevo_producto_id } = req.body;
        const inventario_id = req.params.inventario_id; // Obtener el ID desde los parámetros de la URL

        if (!inventario_id || !nuevo_producto_id) {
            return res.status(400).json({ ok: false, msg: "Faltan algunos parámetros" });
        }

        const updatedInventario = await InventarioModel.updateInventarioProducto(inventario_id, nuevo_producto_id);
        return res.status(200).json({ ok: true, inventario: updatedInventario });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
        });
    }
};

export const InventarioController = {
    getAllInventarios,
    createInventario,
    updateInventarioProducto, // Agregamos la nueva función aquí
};