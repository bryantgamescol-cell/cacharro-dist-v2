import { Router } from "express";
import controller from "./inventory.controller";

const router = Router();

router.get("/", controller.getAll);

router.get("/product/:id", controller.getByProduct);

router.post("/", controller.create);

export default router;