export interface Product {

  id: string;

  name: string;

  description?: string;

  purchasePrice: number;

  salePrice: number;

  stock: number;

  image?: string;

  brand: string;

  active: boolean;

  category: {

    id: string;

    name: string;

  };

}