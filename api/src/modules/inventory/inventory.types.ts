export interface CreateMovementDto {

  productId: string;

  type: "ENTRY" | "EXIT" | "ADJUSTMENT";

  quantity: number;

  reason?: string;

}

export interface MovementQuery {

  page?: number;

  limit?: number;

}