import { Router } from "express";
import controller from "./suppliers.controller";

const router = Router();

router.get("/", controller.getAll);

router.get("/search", controller.search);

router.get("/:id", controller.getOne);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

export default router;