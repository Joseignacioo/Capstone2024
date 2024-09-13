import { Router } from "express";
import { productoController } from "../controllers/productoController.js";

const router = Router()

router.post('/create', productoController.producto)
router.get('/productos', productoController.getAllProductos)

export default router