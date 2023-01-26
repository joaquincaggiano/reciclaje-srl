import useSWR, { SWRConfiguration } from "swr";
import { IServiceSchema } from "@/interfaces";

export const useServices = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IServiceSchema[]>(`/api${url}`, config);

  return {
    services: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};