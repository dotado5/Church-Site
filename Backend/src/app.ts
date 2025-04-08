import express from "express";
import dotenv from "dotenv";
import articleRoutes from "./routes/articleRoutes";
import { run } from "./database";
import authorRoutes from "./routes/authorRoutes";
import { swaggerSpec } from "./swaggerConfig";
import activityRoutes from "./routes/activityRoutes";
import memoryRoutes from "./routes/memoryRoutes";
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
run().catch(console.dir);

// Register routes

app.use("/articles", articleRoutes);
app.use("/authors", authorRoutes);
app.use("/activities", activityRoutes);
app.use("/memories", memoryRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
