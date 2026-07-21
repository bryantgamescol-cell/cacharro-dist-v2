import { prisma } from "../../config/prisma";

export class CategoriesService {

  async findAll() {
    return prisma.category.findMany({
      orderBy: {
        name: "asc"
      }
    });
  }

  async findOne(id: string) {
    return prisma.category.findUnique({
      where: { id }
    });
  }

  async create(data: {
    name: string;
    description?: string;
  }) {

    return prisma.category.create({
      data
    });

  }

  async update(
    id: string,
    data: {
      name: string;
      description?: string;
    }
  ) {

    return prisma.category.update({
      where: { id },
      data
    });

  }

  async delete(id: string) {

    return prisma.category.delete({
      where: { id }
    });

  }

}

export default new CategoriesService();