import { Router } from "express";
import { InventarioController } from "../controllers/inventarioController.js";

const router = Router()

router.post('/create', InventarioController.createInventario)
router.get('/inventarios', InventarioController.getAllInventarios)

export default router