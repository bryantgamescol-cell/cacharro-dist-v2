import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

const getDashboard = async () => {
  const { data } = await api.get("/dashboard");
  return data;
};

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard
  });
}