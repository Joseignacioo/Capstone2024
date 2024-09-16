import { Router } from "express";
import { balanzaController } from "../controllers/balanzaController.js";

const router = Router()

router.post('/create', balanzaController.balanza)
router.get('/balanzas', balanzaController.getAllBalanzas)

export default router