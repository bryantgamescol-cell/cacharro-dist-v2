import { Request, Response } from "express";
import service from "./products.service";
import {
  createProductSchema,
  updateProductSchema
} from "./products.validation";

class ProductsController {

  async getAll(req: Request, res: Response) {

    const data = await service.findAll({

      search: req.query.search as string,

      category: req.query.category as string,

      brand: req.query.brand as string,

      supplier: req.query.supplier as string,

      page: Number(req.query.page) || 1,

      limit: Number(req.query.limit) || 10

    });

    res.json(data);

  }

  async getOne(
    req: Request<{ id: string }>,
    res: Response
  ) {

    const data = await service.findOne(req.params.id);

    res.json(data);

  }

  async create(req: Request, res: Response) {

    const body = createProductSchema.parse(req.body);

    const data = await service.create(body);

    res.status(201).json(data);

  }

  async update(
    req: Request<{ id: string }>,
    res: Response
  ) {

    const body = updateProductSchema.parse(req.body);

    const data = await service.update(
      req.params.id,
      body
    );

    res.json(data);

  }

  async delete(
    req: Request<{ id: string }>,
    res: Response
  ) {

    await service.delete(req.params.id);

    res.json({
      success: true,
      message: "Producto desactivado correctamente"
    });

  }

}

export default new ProductsController();