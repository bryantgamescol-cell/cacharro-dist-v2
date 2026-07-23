import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import api from "../services/api";

export function useCreateProduct() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: async (data: any) => {

      const response = await api.post(
        "/products",
        data
      );

      return response.data;

    },

    onSuccess: () => {

      Swal.fire({

        icon: "success",

        title: "Producto creado correctamente",

        timer: 1500,

        showConfirmButton: false

      });

      queryClient.invalidateQueries({
        queryKey: ["products"]
      });

    },

    onError: (error: any) => {

      Swal.fire({

        icon: "error",

        title: "Error",

        text:
          error.response?.data?.message ||
          "No fue posible crear el producto"

      });

    }

  });

}