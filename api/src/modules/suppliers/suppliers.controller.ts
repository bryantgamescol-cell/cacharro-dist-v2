import { Request, Response } from "express";
import service from "./suppliers.service";

class SuppliersController {

  async getAll(req: Request, res: Response) {

  const page = Number(req.query.page ?? 1);

  const limit = Number(req.query.limit ?? 10);

  const search = String(req.query.search ?? "");

  const data = await service.findAll(
    page,
    limit,
    search
  );

  res.json(data);

}

  async search(req: Request, res: Response) {

    const name = String(req.query.name ?? "");

    const data = await service.search(name);

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

    const data = await service.create(req.body);

    res.status(201).json(data);

  }

  async update(
    req: Request<{ id: string }>,
    res: Response
  ) {

    const data = await service.update(
      req.params.id,
      req.body
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
      message: "Proveedor desactivado correctamente"
    });

  }

}

export default new SuppliersController();