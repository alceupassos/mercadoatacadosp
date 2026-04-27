import { useQuery } from "@tanstack/react-query";
import { medusaClient } from "@/lib/medusa/client";
import type { MedusaProduct } from "@/lib/medusa/types";

type ProductFilters = {
  q?: string;
  collection_id?: string;
  limit?: number;
  offset?: number;
};

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const { products } = await medusaClient.products.list(
        filters as Record<string, unknown>
      );
      return products as unknown as MedusaProduct[];
    },
  });
}

export function useProduct(handle: string) {
  return useQuery({
    queryKey: ["product", handle],
    queryFn: async () => {
      const { products } = await medusaClient.products.list({ handle });
      if (!products.length) throw new Error("Produto nao encontrado");
      return products[0] as unknown as MedusaProduct;
    },
    enabled: !!handle,
  });
}

export function useCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const { collections } = await medusaClient.collections.list();
      return collections;
    },
    // Collections are empty in the current backend, so don't retry
    staleTime: 5 * 60 * 1000,
  });
}
