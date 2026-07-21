import { prisma } from "../../config/prisma";
import { CreateBrandDto, UpdateBrandDto } from "./brands.types";

class BrandsRepository {

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

    const total = await prisma.brand.count({
      where
    });

    const data = await prisma.brand.findMany({
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
    return prisma.brand.findUnique({
      where: { id }
    });
  }

  findByName(name: string) {
    return prisma.brand.findMany({
      where: {
        active: true,
        name: {
          contains: name,
          mode: "insensitive"
        }
      }
    });
  }

  create(data: CreateBrandDto) {
    return prisma.brand.create({
      data
    });
  }

  update(id: string, data: UpdateBrandDto) {
    return prisma.brand.update({
      where: { id },
      data
    });
  }

  delete(id: string) {
    return prisma.brand.update({
      where: { id },
      data: {
        active: false
      }
    });
  }

}

export default new BrandsRepository();