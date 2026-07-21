import { useQuery } from "@tanstack/react-query";

import { getProduct } from "../services/products.service";

export function useProduct(id: string) {

  return useQuery({

    queryKey: ["product", id],

    queryFn: () => getProduct(id),

    enabled: !!id

  });

}