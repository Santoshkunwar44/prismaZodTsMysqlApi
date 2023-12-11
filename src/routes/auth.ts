import { Register, login } from "../controllers/auth";
import { Router } from "express";

const authRoutes:Router  = Router()

authRoutes.post("/login",login)
authRoutes.post("/register",Register)

export default authRoutes

