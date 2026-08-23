import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import routes from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

app.use(cors());

/*
|--------------------------------------------------------------------------
| Helmet
|--------------------------------------------------------------------------
| Permitimos que las imágenes de /uploads puedan ser cargadas
| desde el frontend que está en otro dominio.
|--------------------------------------------------------------------------
*/

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/

app.use(morgan("dev"));

app.use(express.json());

/*
|--------------------------------------------------------------------------
| Archivos estáticos
|--------------------------------------------------------------------------
| Las imágenes estarán disponibles mediante:
|
| https://cacharro-dist-v2.onrender.com/uploads/products/archivo.png
|--------------------------------------------------------------------------
*/

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);

/*
|--------------------------------------------------------------------------
| Ruta principal
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.json({
    mensaje: "Bienvenido a Cacharro Dist API",
  });
});

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Servidor funcionando",
  });
});

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

app.use("/api", routes);

/*
|--------------------------------------------------------------------------
| Error Middleware
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);

export default app;