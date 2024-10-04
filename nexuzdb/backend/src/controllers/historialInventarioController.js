import { HistorialInventarioModel } from "../models/historialInventarioModel.js";

const getAllHistorialInventarios = async (req, res) => {
    try {
        const historial_inventario = await HistorialInventarioModel.getAllHistorialInventarios()

        return res.status(200).send(historial_inventario)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'error server'
        })
    }
};

export const InventarioController = {
    getAllHistorialInventarios
};