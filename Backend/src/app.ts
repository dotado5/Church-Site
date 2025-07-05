import express from "express";
import dotenv from "dotenv";
import articleRoutes from "./routes/articleRoutes";
import { run } from "./database";
import authorRoutes from "./routes/authorRoutes";
import { swaggerSpec } from "./swaggerConfig";
import activityRoutes from "./routes/activityRoutes";
import memoryRoutes from "./routes/memoryRoutes";
import coordinatorRoutes from "./routes/coordinatorRoutes";
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const app = express();

// Register routes

app.use("/articles", articleRoutes);
app.use("/authors", authorRoutes);
app.use("/activities", activityRoutes);
app.use("/memories", memoryRoutes);
app.use("/coordinator", coordinatorRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler
const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

app.use(errorHandler);

run();

app.listen(8000);

export default app;
