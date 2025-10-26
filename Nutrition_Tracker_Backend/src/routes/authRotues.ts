import express from "express";
import * as AuthController from "../controllers/authController"
import { authMiddleware }  from "../middleware/authMidleware";

const router = express.Router()
router.post('/login',AuthController.login);
router.post('/refresh',AuthController.refresh)
router.post('/logout',AuthController.logout)
router.get("/profile", authMiddleware, AuthController.getProfile);


export default router