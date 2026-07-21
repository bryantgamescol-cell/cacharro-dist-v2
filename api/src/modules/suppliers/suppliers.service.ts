import repository from "./suppliers.repository";
import { AppError } from "../../common/errors";
import {
  CreateSupplierDto,
  UpdateSupplierDto
} from "./suppliers.types";

class SuppliersService {

  async findAll(
    page = 1,
    limit = 10,
    search = ""
  ) {

    return repository.findAll(page, limit, search);

  }

  async search(name: string) {
    return repository.findByName(name);
  }

  async findOne(id: string) {

    const supplier = await repository.findById(id);

    if (!supplier) {
      throw new AppError("Proveedor no encontrado", 404);
    }

    return supplier;

  }

  async create(data: CreateSupplierDto) {

    const suppliers = await repository.findByName(data.name);

    if (suppliers.length > 0) {
      throw new AppError("El proveedor ya existe", 400);
    }

    return repository.create(data);

  }

  async update(id: string, data: UpdateSupplierDto) {

    await this.findOne(id);

    return repository.update(id, data);

  }

  async delete(id: string) {

    await this.findOne(id);

    return repository.delete(id);

  }

}

export default new SuppliersService();