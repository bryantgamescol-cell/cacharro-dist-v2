import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

const getBrands = async () => {

  const { data } = await api.get("/brands");

  return data;

};

export function useBrands() {

  return useQuery({

    queryKey: ["brands"],

    queryFn: getBrands

  });

}