import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../services/products.service";

type Filters = {
  category?: string;
  search?: string;
};

export function useProducts(filters?: Filters) {

  return useQuery({

    queryKey: ["products", filters],

    queryFn: () => getProducts(filters)

  });

}