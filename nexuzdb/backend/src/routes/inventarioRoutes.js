import { Router } from "express";
import { InventarioController } from "../controllers/inventarioController.js";

const router = Router()

router.post('/create', InventarioController.inventario)
router.get('/inventarios', InventarioController.getAllinventarios)

export default router