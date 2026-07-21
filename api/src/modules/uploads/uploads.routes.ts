import { Router } from "express";
import controller from "./uploads.controller";
import { upload } from "./multer";

const router = Router();

router.post(
  "/product",
  upload.single("image"),
  controller.uploadProductImage
);

export default router;