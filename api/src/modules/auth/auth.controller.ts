import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export class AuthController {

  async register(req: Request, res: Response) {

    try {

      const user = await authService.register(req.body);

      return res.status(201).json(user);

    } catch (error: any) {

      return res.status(400).json({
        message: error.message
      });

    }

  }

  async login(req: Request, res: Response) {

    try {

      const result = await authService.login(req.body);

      return res.json(result);

    } catch (error: any) {

      return res.status(400).json({
        message: error.message
      });

    }

  }

}

export default new AuthController();