import { Request, Response } from "express";
import cloudinary from "../../cloudinary";

class UploadController {

  async uploadProductImage(
    req: Request,
    res: Response
  ) {

    try {

      // Verificar que se recibió una imagen
      if (!req.file) {

        return res.status(400).json({
          success: false,
          message: "No se envió ninguna imagen",
        });

      }

      // Guardamos req.file en una variable.
      // Así TypeScript sabe que existe.
      const file = req.file;

      // Subir imagen a Cloudinary
      const result = await new Promise<any>(
        (resolve, reject) => {

          const stream =
            cloudinary.uploader.upload_stream(
              {
                folder: "cacharro-dist/products",
                resource_type: "image",
              },

              (error, result) => {

                if (error) {

                  reject(error);

                } else {

                  resolve(result);

                }

              }
            );

          // Ya no usamos req.file aquí
          stream.end(file.buffer);

        }
      );

      // Respuesta
      return res.status(201).json({

        success: true,

        message: "Imagen subida correctamente",

        filename: result.public_id,

        path: result.secure_url,

        url: result.secure_url,

      });

    } catch (error) {

      console.error(
        "Error subiendo imagen a Cloudinary:",
        error
      );

      return res.status(500).json({

        success: false,

        message: "Error al subir la imagen",

      });

    }

  }

}

export default new UploadController();