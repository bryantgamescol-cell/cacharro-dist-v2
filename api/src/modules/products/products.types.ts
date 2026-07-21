export interface CreateProductDto {

  name: string;

  description?: string;

  purchasePrice: number;

  salePrice: number;

  stock: number;

  sku?: string;

  barcode?: string;

  image?: string;

  categoryId: string;

  brandId: string;

  supplierId?: string;

  active?: boolean;

}

export interface UpdateProductDto
  extends Partial<CreateProductDto> {}