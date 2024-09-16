import { BalanzaModel } from "../models/balanzaModel.js";

const balanza = async(req, res)=>{
    try {
        console.log(req.body)
        const {balanza_id, nombre_balanza, ubicacion, capacidad_maxima, id_unico} = req.body

        if(!balanza_id || !nombre_balanza || !ubicacion || !capacidad_maxima || !id_unico){
            return res.status(400).json({ok: false, msg: "falta algun parametro"})
        }

        const newBalanza = await BalanzaModel.create({balanza_id, nombre_balanza, ubicacion, capacidad_maxima, id_unico})

        return res.status(201).send(newBalanza)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'error server'
        })
    }
}

const getAllBalanzas = async(req, res)=>{
    try {
        const balanzas = await BalanzaModel.getAllbalanzas()

        return res.status(200).send(balanzas)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'error server'
        })
    }
}

export const balanzaController = {
    balanza,
    getAllBalanzas
}