import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

const getSuppliers = async () => {

  const { data } = await api.get("/suppliers");

  return {
    data
  };

};

export function useSuppliers() {

  return useQuery({

    queryKey: ["suppliers"],

    queryFn: getSuppliers

  });

}