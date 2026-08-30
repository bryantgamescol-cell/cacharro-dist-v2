import { useMutation } from "@tanstack/react-query";
import api from "../services/api";

type UploadResponse = {
  success: boolean;
  message: string;
  filename: string;
  path: string;
  url: string;
};

export function useUploadProductImage() {

  return useMutation({

    mutationFn: async (
      file: File
    ): Promise<UploadResponse> => {

      const formData = new FormData();

      formData.append("image", file);

      const response = await api.post(
        "/uploads/product",
        formData
      );

      return response.data;

    }

  });

}