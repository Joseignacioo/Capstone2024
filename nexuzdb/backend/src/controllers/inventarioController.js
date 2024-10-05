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

export const InventarioController = {
    getAllInventarios,
    createInventario
};