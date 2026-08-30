import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {

  res.json({
    mensaje: "Bienvenido a Cacharro Dist API",
  });

});

app.get("/health", (req, res) => {

  res.json({
    success: true,
    message: "Servidor funcionando",
  });

});

app.use("/api", routes);

app.use(errorMiddleware);

export default app;