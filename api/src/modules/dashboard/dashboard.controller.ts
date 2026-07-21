import { Request, Response } from "express";
import service from "./dashboard.service";

class DashboardController {

  async stats(req: Request, res: Response) {

    const data = await service.getStats();

    return res.json({
      success: true,
      data
    });

  }

}

export default new DashboardController();