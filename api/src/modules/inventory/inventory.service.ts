import repository from "./inventory.repository";
import { AppError } from "../../common/errors";
import { CreateMovementDto } from "./inventory.types";

class InventoryService {

  async create(data: CreateMovementDto) {

    const product = await repository.findProduct(data.productId);

    if (!product) {
      throw new AppError("Producto no encontrado", 404);
    }

    const previousStock = product.stock;

    let currentStock = previousStock;

    switch (data.type) {

      case "ENTRY":
        currentStock += data.quantity;
        break;

      case "EXIT":

        if (previousStock < data.quantity) {
          throw new AppError("Stock insuficiente", 400);
        }

        currentStock -= data.quantity;
        break;

      case "ADJUSTMENT":
        currentStock = data.quantity;
        break;

    }

    await repository.updateStock(
      product.id,
      currentStock
    );

    return repository.createMovement({

      productId: product.id,

      type: data.type,

      quantity: data.quantity,

      previousStock,

      currentStock,

      reason: data.reason

    });

  }

  async findAll() {

    return repository.getAll();

  }

  async findByProduct(productId: string) {

    return repository.getByProduct(productId);

  }

}

export default new InventoryService();