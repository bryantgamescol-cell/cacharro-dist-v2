import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

const getCategories = async () => {

  const { data } = await api.get("/categories");

  return data;

};

export function useCategories() {

  return useQuery({

    queryKey: ["categories"],

    queryFn: getCategories

  });

}