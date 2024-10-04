import { BalanzaModel } from "../models/balanzaModel.js";

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
    getAllBalanzas
}