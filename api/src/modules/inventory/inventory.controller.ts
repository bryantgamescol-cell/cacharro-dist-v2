import { Request, Response } from "express";
import service from "./inventory.service";
import { createMovementSchema } from "./inventory.validation";

class InventoryController {

  async create(req: Request, res: Response) {

    const body = createMovementSchema.parse(req.body);

    const data = await service.create(body);

    return res.status(201).json(data);

  }

  async getAll(req: Request, res: Response) {

    const data = await service.findAll();

    return res.json(data);

  }

  async getByProduct(
    req: Request<{ id: string }>,
    res: Response
  ) {

    const data = await service.findByProduct(
      req.params.id
    );

    return res.json(data);

  }

}

export default new InventoryController();