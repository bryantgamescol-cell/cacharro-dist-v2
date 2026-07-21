import { prisma } from "../../config/prisma";
import { CreateMovementDto } from "./inventory.types";

class InventoryRepository {

  findProduct(id: string) {

    return prisma.product.findUnique({

      where: {
        id
      }

    });

  }

  updateStock(
    id: string,
    stock: number
  ) {

    return prisma.product.update({

      where: {
        id
      },

      data: {
        stock
      }

    });

  }

  createMovement(data: {

    productId: string;

    type: "ENTRY" | "EXIT" | "ADJUSTMENT";

    quantity: number;

    previousStock: number;

    currentStock: number;

    reason?: string;

  }) {

    return prisma.inventoryMovement.create({

      data

    });

  }

  getAll() {

    return prisma.inventoryMovement.findMany({

      include: {

        product: {

          include: {

            category: true,

            brand: true

          }

        }

      },

      orderBy: {

        createdAt: "desc"

      }

    });

  }

  getByProduct(productId: string) {

    return prisma.inventoryMovement.findMany({

      where: {

        productId

      },

      orderBy: {

        createdAt: "desc"

      }

    });

  }

}

export default new InventoryRepository();