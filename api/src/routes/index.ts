import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import categoriesRoutes from "../modules/categories/categories.routes";
import brandsRoutes from "../modules/brands/brands.routes";
import supplierRoutes from "../modules/suppliers/suppliers.routes";
import productsRoutes from "../modules/products/products.routes";
import uploadsRoutes from "../modules/uploads/uploads.routes";
import dashboardRoutes from "../modules/dashboard/dashboard.routes";
import inventoryRoutes from "../modules/inventory/inventory.routes";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    sistema: "Cacharro Dist API",
    version: "2.0.0"
  });
});

router.use("/auth", authRoutes);

router.use("/categories", categoriesRoutes);

router.use("/brands", brandsRoutes);

router.use("/suppliers", supplierRoutes);

router.use("/products", productsRoutes);

router.use("/uploads", uploadsRoutes);

router.use("/dashboard", dashboardRoutes);

router.use("/inventory", inventoryRoutes);

export default router;