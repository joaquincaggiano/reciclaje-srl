import useSWR, { SWRConfiguration } from "swr";
import { IProductSchema } from "@/interfaces";

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IProductSchema[]>(`/api${url}`, config);

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
