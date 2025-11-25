import express from "express";
import authRoutes from "./src/routers/auth.router.js";
import productRouter from "./src/routers/product.router.js"
import { initDocs } from "./src/libs/initDocs.js";
import path from "node:path"
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/auth", authRoutes);
app.use("/api", productRouter)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

initDocs(app)
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running well",
  });
});

app.listen(8080, () => {
  console.log("App running on http://localhost:8080");
});
