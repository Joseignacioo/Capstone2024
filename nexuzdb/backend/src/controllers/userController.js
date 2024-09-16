import { UserModel } from "..                                                                   /models/userModel.js";
import bcryptjs from 'bcryptjs'


const register = async(req, res)=>{
    try {
        console.log(req.body)
        const {usuario_id, nombre_usuario, email, contrasena, rol} = req.body

        if(!usuario_id || !nombre_usuario || !email || !contrasena || !rol){
            return res.status(400).json({ok: false, msg: "falta algun parametro"})
        }

        const user = await UserModel.findOneEmail(email)
        if (user) {
            return res.status(409).json({ ok: false, msg: "Email ya existe"})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(contrasena, salt)

        const newUser = await UserModel.create({ usuario_id, nombre_usuario, email, contrasena: hashedPassword, rol })

        return res.status(201).json({ok: true, msg: newUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'error server'
        })
    }
}

const login = async(req, res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'error server'
        })
    }
}

export const userController = {
    register,
    login
}