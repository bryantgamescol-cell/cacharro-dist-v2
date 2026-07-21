import { prisma } from "../../config/prisma";

class DashboardService {

  async getStats() {

    const products = await prisma.product.count();

    const categories = await prisma.category.count();

    const users = await prisma.user.count();

    const lowStock = await prisma.product.count({
      where: {
        stock: {
          lte: 5
        }
      }
    });

    const inventory = await prisma.product.aggregate({
      _sum: {
        stock: true
      }
    });

    const productsList = await prisma.product.findMany({
      select: {
        stock: true,
        purchasePrice: true
      }
    });

    const inventoryValue = productsList.reduce(
      (total, product) =>
        total + product.stock * product.purchasePrice,
      0
    );

    return {
      products,
      categories,
      users,
      lowStock,
      inventoryUnits: inventory._sum?.stock ?? 0,
      inventoryValue
    };
  }

}

export default new DashboardService();