"use client";

import { ProductCard } from "@/components/product/product-card";
import { useProducts } from "@/hooks/use-products";
import { Loader2 } from "lucide-react";

export function FeaturedProducts() {
  const { data: products, isLoading } = useProducts({ limit: 8 });

  return (
    <section className="py-16 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-[var(--foreground)]">
            Produtos em Destaque
          </h2>
          <p className="text-[var(--muted-foreground)] mt-2">
            Novidades direto do Bras para sua loja
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {products?.map((product) => {
              const variant = product.variants?.[0];
              const price = variant?.prices?.[0]?.amount;
              return (
                <ProductCard
                  key={product.id}
                  id={product.id!}
                  handle={product.handle!}
                  title={product.title!}
                  thumbnail={product.thumbnail || undefined}
                  price={price || 5990}
                />
              );
            })}
            {/* If no products or less than 4, fill with placeholders */}
            {(!products || products.length < 4) &&
              Array.from({ length: 4 - (products?.length || 0) }).map((_, i) => (
                <ProductCard
                  key={`placeholder-${i}`}
                  id={`placeholder-${i}`}
                  handle={`#`}
                  title="Novo produto em breve"
                  price={7990}
                  compareAtPrice={9990}
                />
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
