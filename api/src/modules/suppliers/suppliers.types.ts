export interface CreateSupplierDto {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  contact?: string;
}

export interface UpdateSupplierDto
  extends Partial<CreateSupplierDto> {
  active?: boolean;
}