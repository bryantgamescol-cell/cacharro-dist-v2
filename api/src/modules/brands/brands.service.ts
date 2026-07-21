import repository from "./brands.repository";
import { AppError } from "../../common/errors";
import {
  CreateBrandDto,
  UpdateBrandDto
} from "./brands.types";

class BrandsService {

  async findAll(
    page = 1,
    limit = 10,
    search = ""
  ) {
    return repository.findAll(page, limit, search);
  }

  async findOne(id: string) {

    const brand = await repository.findById(id);

    if (!brand) {
      throw new AppError("Marca no encontrada", 404);
    }

    return brand;

  }

  async create(data: CreateBrandDto) {

    const brands = await repository.findByName(data.name);

    if (brands.length > 0) {
      throw new AppError("La marca ya existe", 400);
    }

    return repository.create(data);

  }

  async update(id: string, data: UpdateBrandDto) {

    await this.findOne(id);

    return repository.update(id, data);

  }

  async delete(id: string) {

    await this.findOne(id);

    return repository.delete(id);

  }

}

export default new BrandsService();