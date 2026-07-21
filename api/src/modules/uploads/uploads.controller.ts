import { Request, Response } from "express";

class UploadController {

  async uploadProductImage(req: Request, res: Response) {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No se envió ninguna imagen"
      });
    }

    return res.status(201).json({
      success: true,
      message: "Imagen subida correctamente",
      filename: req.file.filename,
      path: `/uploads/products/${req.file.filename}`
    });

  }

}

export default new UploadController();