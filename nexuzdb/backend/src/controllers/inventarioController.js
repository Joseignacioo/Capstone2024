import { InventarioModel } from "../models/inventarioModel.js";

const inventario = async(req, res)=>{
    try {
        console.log(req.body)
        const { inventario_id, balanza_id, producto_id, cantidad, peso_total} = req.body

        if(!inventario_id || !balanza_id || !producto_id || !cantidad || !peso_total){
            return res.status(400).json({ok: false, msg: "falta algun parametro"})
        }
        const newInventario = await InventarioModel.create({ inventario_id, balanza_id, producto_id, cantidad, peso_total})

        return res.status(201).send(newInventario)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'error server'
        })
    }
}

const getAllinventarios = async(req, res)=>{
    try {
        const inventarios = await InventarioModel.getAllInventarios()

        return res.status(200).send(inventarios)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'error server'
        })
    }
}

export const InventarioController = {
    inventario,
    getAllinventarios
}
