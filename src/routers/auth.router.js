import express from "express";
import { register, login } from "../controllers/auth.controllers.js";
import { loginValidation, resgisterValidation } from "../middlewares/authValidator.js";
import { validate } from "../middlewares/validation.js";

const router = express.Router();

router.post("/register",resgisterValidation,validate ,register);
router.post("/login", loginValidation, validate, login);

export default router;
