import { AuthMiddleware } from "middlewares/auth";
import { createProduct } from "../controllers/product";

import { Router } from "express";
import adminMiddleware from "middlewares/admin";
import { errorHandler } from "error-handler";

const productRouter :Router =  Router();

productRouter.post("/products", AuthMiddleware,adminMiddleware, errorHandler(createProduct))
productRouter.get("/products/list", AuthMiddleware, adminMiddleware, errorHandler(createProduct))








export  default productRouter