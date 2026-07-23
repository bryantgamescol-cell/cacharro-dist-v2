import { Request, Response } from "express";
import service from "./categories.service";
import { createCategorySchema } from "./categories.validation";

class CategoriesController {

  async getAll(req: Request, res: Response) {
    try {

      const data = await service.findAll();

      return res.status(200).json({
        success: true,
        data
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: "Error al obtener las categorías"
      });

    }
  }

  async getOne(
    req: Request<{ id: string }>,
    res: Response
  ) {
    try {

      const data = await service.findOne(req.params.id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Categoría no encontrada"
        });
      }

      return res.status(200).json({
        success: true,
        data
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: "Error al buscar la categoría"
      });

    }
  }

  async create(req: Request, res: Response) {
    try {

      const validatedData =
        createCategorySchema.parse(req.body);

      const data =
        await service.create(validatedData);

      return res.status(201).json({
        success: true,
        data,
        message: "Categoría creada correctamente"
      });

    } catch (error: any) {

      if (error.errors) {
        return res.status(400).json({
          success: false,
          message: error.errors
        });
      }

      return res.status(500).json({
        success: false,
        message: "Error al crear la categoría"
      });

    }
  }

  async update(
    req: Request<{ id: string }>,
    res: Response
  ) {
    try {

      const validatedData =
        createCategorySchema.parse(req.body);

      const data = await service.update(
        req.params.id,
        validatedData
      );

      return res.status(200).json({
        success: true,
        data,
        message: "Categoría actualizada correctamente"
      });

    } catch (error: any) {

      if (error.errors) {
        return res.status(400).json({
          success: false,
          message: error.errors
        });
      }

      return res.status(500).json({
        success: false,
        message: "Error al actualizar la categoría"
      });

    }
  }

  async delete(
    req: Request<{ id: string }>,
    res: Response
  ) {
    try {

      await service.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Categoría eliminada correctamente"
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: "Error al eliminar la categoría"
      });

    }
  }

}

export default new CategoriesController();