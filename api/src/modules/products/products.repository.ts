import { prisma } from "../../config/prisma";
import {
  CreateProductDto,
  UpdateProductDto
} from "./products.types";

class ProductsRepository {

  async findAll(
    page = 1,
    limit = 10,
    search = "",
    category = "",
    brand = "",
    supplier = ""
  ) {

    const where: any = {
      active: true
    };

    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive"
      };
    }

    if (category) {
      where.categoryId = category;
    }

    if (brand) {
      where.brandId = brand;
    }

    if (supplier) {
      where.supplierId = supplier;
    }

    const total = await prisma.product.count({
      where
    });

    const data = await prisma.product.findMany({
      where,

      include: {
        category: true,
        brand: true,
        supplier: true
      },

      orderBy: {
        name: "asc"
      },

      skip: (page - 1) * limit,

      take: limit
    });

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };

  }

  findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        supplier: true
      }
    });
  }

  findBySku(sku: string) {
    return prisma.product.findFirst({
      where: { sku }
    });
  }

  findByBarcode(barcode: string) {
    return prisma.product.findFirst({
      where: { barcode }
    });
  }

  create(data: CreateProductDto) {
    return prisma.product.create({
      data
    });
  }

  update(
    id: string,
    data: UpdateProductDto
  ) {
    return prisma.product.update({
      where: { id },
      data
    });
  }

  delete(id: string) {
    return prisma.product.update({
      where: { id },
      data: {
        active: false
      }
    });
  }

}

export default new ProductsRepository();