import { Request, Response } from "express";
import service from "./suppliers.service";

class SuppliersController {

  async getAll(req: Request, res: Response) {

    try {

      const page = Number(req.query.page ?? 1);

      const limit = Number(req.query.limit ?? 10);

      const search = String(req.query.search ?? "");

      const result = await service.findAll(
        page,
        limit,
        search
      );

      return res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: "Error al obtener los proveedores"
      });

    }

  }

  async search(req: Request, res: Response) {

    try {

      const name = String(req.query.name ?? "");

      const data = await service.search(name);

      return res.status(200).json({
        success: true,
        data
      });

    } catch (error: any) {

      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message
      });

    }

  }

  async getOne(
    req: Request<{ id: string }>,
    res: Response
  ) {

    try {

      const data = await service.findOne(req.params.id);

      return res.status(200).json({
        success: true,
        data
      });

    } catch (error: any) {

      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message
      });

    }

  }

  async create(req: Request, res: Response) {

    try {

      const data = await service.create(req.body);

      return res.status(201).json({
        success: true,
        data,
        message: "Proveedor creado correctamente"
      });

    } catch (error: any) {

      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message
      });

    }

  }

  async update(
    req: Request<{ id: string }>,
    res: Response
  ) {

    try {

      const data = await service.update(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        data,
        message: "Proveedor actualizado correctamente"
      });

    } catch (error: any) {

      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message
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
        message: "Proveedor desactivado correctamente"
      });

    } catch (error: any) {

      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message
      });

    }

  }

}

export default new SuppliersController();