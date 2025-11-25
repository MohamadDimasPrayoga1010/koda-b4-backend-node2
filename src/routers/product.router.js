import express from "express";
import { products, productById, createProduct, editProduct, removeProduct, uploadProductPicture } from "../controllers/products.controllers.js";

const router = express.Router();

router.get("/products", products);
router.get("/products/:id",productById)
router.post("/products", createProduct)
router.patch("/products/:id", editProduct);
router.post("/products/:id/upload", uploadProductPicture);
router.delete("/products/:id", removeProduct);
export default router;
