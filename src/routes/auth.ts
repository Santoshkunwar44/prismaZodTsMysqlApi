import { errorHandler } from "../error-handler";
import { Me, Register, login } from "../controllers/auth";
import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth";

const authRoutes:Router  = Router()

authRoutes.post("/login",errorHandler(login))
authRoutes.post("/register",errorHandler(Register))
authRoutes.get("/me",AuthMiddleware,errorHandler(Me))

export default authRoutes

