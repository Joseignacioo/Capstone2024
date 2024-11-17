import { Router } from "express";
import { userController } from "../controllers/userController.js";

const router = Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/users', userController.getAllUsers)

export default router