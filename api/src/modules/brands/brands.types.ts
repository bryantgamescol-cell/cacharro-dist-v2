export interface CreateBrandDto {

  name: string;

  logo?: string;

}

export interface UpdateBrandDto
  extends Partial<CreateBrandDto> {

  active?: boolean;

}