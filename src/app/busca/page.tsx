"use client";

import { Suspense } from "react";
import { ProductCard } from "@/components/product/product-card";
import { useSearchParams } from "next/navigation";
import { Loader2, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const demoResults = [
    { title: "Camiseta Oversized Atacado", price: 3990, compareAt: 5990 },
    { title: "Blusa Manga Longa Tricot", price: 4990, compareAt: 7990 },
    { title: "Calca Jeans Destroyed", price: 8990, compareAt: 11990 },
    { title: "Vestido Floral Premium", price: 6990, compareAt: 9990 },
    { title: "Conjunto Moletom Casual", price: 12990, compareAt: 17990 },
    { title: "Saia Midi Plissada Atacado", price: 5990, compareAt: 7990 },
  ].filter((p) => !q || p.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search header */}
      <div className="mb-8">
        <form action="/busca" className="flex gap-3 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Buscar moda atacado..."
              className="w-full h-14 pl-12 pr-4 rounded-xl border border-[var(--border)] bg-white text-base focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            />
          </div>
          <Button type="submit" size="lg">
            <Search className="w-4 h-4" /> Buscar
          </Button>
        </form>
      </div>

      {q && (
        <div className="mb-8">
          <h1 className="text-xl font-semibold">
            Resultados para &ldquo;{q}&rdquo;
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            {demoResults.length} produtos encontrados
          </p>
        </div>
      )}

      {/* Filters bar */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="w-4 h-4" /> Filtros
        </Button>
        <span className="text-xs text-[var(--muted-foreground)]">
          {demoResults.length} resultados
        </span>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {demoResults.map((p, i) => (
          <ProductCard
            key={i}
            id={`search-${i}`}
            handle={`produtos/${p.title.toLowerCase().replace(/\s+/g, "-")}`}
            title={p.title}
            price={p.price}
            compareAtPrice={p.compareAt}
          />
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-40">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
