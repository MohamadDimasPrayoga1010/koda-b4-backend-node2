import express from "express";
import { products, productById, createProduct, editProduct, removeProduct, uploadProductPicture } from "../controllers/products.controllers.js";
import { createProductValidation, updateProductValidation } from "../middlewares/productsValidator.js";
import { validate } from "../middlewares/validation.js";

const router = express.Router();

router.get("/products", products);
router.get("/products/:id",productById)
router.post("/products",createProductValidation, validate ,createProduct)
router.patch("/products/:id", updateProductValidation, validate, editProduct);
router.post("/products/:id/upload", uploadProductPicture);
router.delete("/products/:id", removeProduct);
export default router;
