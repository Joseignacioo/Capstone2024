import { SolicitudesModel } from '../models/solicitudesModel.js';

const register = async(req, res) => {
    const { nombre, apellido, correo, celular } = req.body;

    // Valida que todos los campos requeridos estén presentes
    if (!nombre || !apellido || !correo || !celular) {
        return res.status(400).json({ ok: false, msg: 'falta algun parametro' });
    }

    // Lógica para crear el usuario en la base de datos
    try {
        const nuevoUsuario = await SolicitudesModel.create({ nombre, apellido, correo, celular });
        return res.status(201).json({ ok: true, data: nuevoUsuario });
    } catch (error) {
        console.error(error); // Agregado para facilitar la depuración
        return res.status(500).json({ ok: false, msg: 'Error al crear el usuario' });
    }
};

const getAllSolicitudes = async(req, res) => {
    try {
        const solicitudes = await SolicitudesModel.getAllSolicitudes();
        return res.status(200).json({ ok: true, data: solicitudes });
    } catch (error) {
        console.error(error); // Agregado para facilitar la depuración
        return res.status(500).json({ ok: false, msg: 'error server' });
    }
};

const removeSolicitud = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de los parámetros de la solicitud

        if (!id) {
            return res.status(400).json({ ok: false, msg: "El ID es requerido" });
        }

        const deletedSolicitud = await SolicitudesModel.remove(id);

        if (!deletedSolicitud) {
            return res.status(404).json({ ok: false, msg: "Solicitud no encontrada" });
        }

        return res.status(200).json({ ok: true, msg: "Solicitud eliminada", solicitud: deletedSolicitud });
    } catch (error) {
        console.error(error); // Agregado para facilitar la depuración
        return res.status(500).json({ ok: false, msg: 'Error del servidor' });
    }
};

export const SolicitudesController = {
    register,
    getAllSolicitudes,
    removeSolicitud
};
