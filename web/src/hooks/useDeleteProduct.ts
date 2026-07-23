import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import api from "../services/api";

export function useDeleteProduct() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: async (id: string) => {

      const { data } = await api.delete(`/products/${id}`);

      return data;

    },

    onSuccess: () => {

      Swal.fire({

        icon: "success",

        title: "Producto eliminado correctamente",

        timer: 1500,

        showConfirmButton: false

      });

      queryClient.invalidateQueries({
        queryKey: ["products"]
      });

    },

    onError: () => {

      Swal.fire({

        icon: "error",

        title: "Error",

        text: "No fue posible eliminar el producto"

      });

    }

  });

}