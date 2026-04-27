"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
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
    { title: "Blazer Alfaiataria Premium", price: 15990, compareAt: 21990 },
    { title: "Macacao Linho Atacado", price: 7990, compareAt: 10990 },
  ].filter((p) => !q || p.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#f5f3ee]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search header */}
        <div className="mb-10">
          <form action="/busca" className="flex gap-3 max-w-2xl">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Buscar moda atacado..."
              className="w-full h-14 px-5 rounded-2xl border border-[#d5cdbd] bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#af9cc5]/50 focus:border-[#af9cc5] transition-all"
              autoFocus
            />
            <Button type="submit" size="lg" className="font-semibold">
              Buscar
            </Button>
          </form>
        </div>

        {q ? (
          <div className="mb-8">
            <h1 className="text-xl font-bold text-[#2d2a24]">
              Resultados para &ldquo;{q}&rdquo;
            </h1>
            <p className="text-sm text-[#8b7b6b] mt-1">
              {demoResults.length} produtos encontrados no atacado do Bras
            </p>
          </div>
        ) : (
          <div className="mb-8">
            <h1 className="text-xl font-bold text-[#2d2a24]">
              Buscar Produtos
            </h1>
            <p className="text-sm text-[#8b7b6b] mt-1">
              Encontre moda atacadista por nome, categoria ou marca
            </p>
          </div>
        )}

        {/* Results info */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#e8e2d8]">
          <span className="text-xs font-medium text-[#8b7b6b]">
            {demoResults.length} resultados
          </span>
          <span className="text-xs text-[#8b7b6b]">
            &middot; Precos de atacado
          </span>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {demoResults.map((p, i) => (
            <ProductCard
              key={i}
              id={`search-${i}`}
              handle={`produtos/${p.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              title={p.title}
              price={p.price}
              compareAtPrice={p.compareAt}
            />
          ))}
        </div>

        {demoResults.length === 0 && q && (
          <div className="text-center py-20">
            <p className="text-lg font-semibold text-[#2d2a24] mb-2">
              Nenhum produto encontrado
            </p>
            <p className="text-sm text-[#8b7b6b] mb-6">
              Tente buscar com outros termos ou navegue pelas categorias
            </p>
            <Link href="/produtos">
              <Button variant="accent">Ver todos os produtos</Button>
            </Link>
          </div>
        )}
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
