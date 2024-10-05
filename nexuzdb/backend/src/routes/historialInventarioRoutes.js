import { Router } from "express";
import { InventarioController } from "../controllers/historialInventarioController.js"

const router = Router()

router.get('/historiales', InventarioController.getAllHistorialInventarios)

export default router