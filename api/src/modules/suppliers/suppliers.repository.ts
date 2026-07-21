import { prisma } from "../../config/prisma";
import { CreateSupplierDto, UpdateSupplierDto } from "./suppliers.types";

class SuppliersRepository {

  async findAll(
    page = 1,
    limit = 10,
    search = ""
  ) {

    const where = {
      active: true,
      name: {
        contains: search,
        mode: "insensitive" as const
      }
    };

    const total = await prisma.supplier.count({
      where
    });

    const data = await prisma.supplier.findMany({
      where,
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
    return prisma.supplier.findUnique({
      where: { id }
    });
  }

  findByName(name: string) {
    return prisma.supplier.findMany({
      where: {
        active: true,
        name: {
          contains: name,
          mode: "insensitive"
        }
      }
    });
  }

  create(data: CreateSupplierDto) {
    return prisma.supplier.create({
      data
    });
  }

  update(id: string, data: UpdateSupplierDto) {
    return prisma.supplier.update({
      where: { id },
      data
    });
  }

  delete(id: string) {
    return prisma.supplier.update({
      where: { id },
      data: {
        active: false
      }
    });
  }

}

export default new SuppliersRepository();