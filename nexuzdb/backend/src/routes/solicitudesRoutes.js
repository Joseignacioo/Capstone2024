import { Router } from "express";
import { SolicitudesController } from "../controllers/solicitudesController.js";

const router = Router()

router.post('/create', SolicitudesController.register)
router.get('/solicitudes', SolicitudesController.getAllSolicitudes)
router.delete('/solicitudes/:id', SolicitudesController.removeSolicitud); // Nueva ruta para eliminar solicitudes

export default router