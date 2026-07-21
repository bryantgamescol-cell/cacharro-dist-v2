import repository from "./products.repository";
import {
  CreateProductDto,
  UpdateProductDto
} from "./products.types";
import { AppError } from "../../common/errors";

class ProductsService {

  async findAll(query: {
    search?: string;
    category?: string;
    brand?: string;
    supplier?: string;
    page?: number;
    limit?: number;
  }) {

    return repository.findAll(
      query.page ?? 1,
      query.limit ?? 10,
      query.search ?? "",
      query.category ?? "",
      query.brand ?? "",
      query.supplier ?? ""
    );

  }

  async findOne(id: string) {

    const product = await repository.findById(id);

    if (!product) {
      throw new AppError("Producto no encontrado", 404);
    }

    return product;

  }

  async create(data: CreateProductDto) {

    if (data.sku) {

      const sku = await repository.findBySku(data.sku);

      if (sku) {
        throw new AppError("El SKU ya existe", 400);
      }

    }

    if (data.barcode) {

      const barcode = await repository.findByBarcode(data.barcode);

      if (barcode) {
        throw new AppError("El código de barras ya existe", 400);
      }

    }

    return repository.create(data);

  }

  async update(
    id: string,
    data: UpdateProductDto
  ) {

    await this.findOne(id);

    return repository.update(id, data);

  }

  async delete(id: string) {

    await this.findOne(id);

    return repository.delete(id);

  }

}

export default new ProductsService();