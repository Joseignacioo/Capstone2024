import { ProductoModel } from "../models/productoModel.js";

const producto = async(req, res)=>{
    try {
        console.log(req.body)
        const {producto_id, nombre_producto, codigo_barras, descripcion, peso_unitario, categoria} = req.body

        if(!producto_id || !nombre_producto || !codigo_barras || !descripcion || !peso_unitario || !categoria){
            return res.status(400).json({ok: false, msg: "falta algun parametro"})
        }

        const newProducto = await ProductoModel.create({producto_id, nombre_producto, codigo_barras, descripcion, peso_unitario, categoria})

        return res.status(201).send(newProducto)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'error server'
        })
    }
}

const getAllProductos = async(req, res)=>{
    try {
        const productos = await ProductoModel.getAllProductos()

        return res.status(201).send(productos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'error server'
        })
    }
}

export const productoController = {
    producto,
    getAllProductos
}