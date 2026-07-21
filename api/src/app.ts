import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import path from "path";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.json({
    mensaje: "Bienvenido a Cacharro Dist API"
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Servidor funcionando"
  });
});

app.use("/api", routes);

app.use(errorMiddleware);

export default app;