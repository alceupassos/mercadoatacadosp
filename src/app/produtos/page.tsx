"use client";

import { useState, Suspense } from "react";
import { ProductCard } from "@/components/product/product-card";
import { useProducts } from "@/hooks/use-products";
import { useSearchParams } from "next/navigation";
import { Loader2, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SIZES = ["PP", "P", "M", "G", "GG", "XG", "3XL"];
const COLORS = [
  { label: "Preto", hex: "#1a1a2e" },
  { label: "Branco", hex: "#ffffff" },
  { label: "Azul", hex: "#488ba7" },
  { label: "Rosa", hex: "#e3979a" },
  { label: "Verde", hex: "#a5c5a7" },
  { label: "Bege", hex: "#cfb496" },
];
const SORT_OPTIONS = [
  { value: "created_at", label: "Mais recentes" },
  { value: "price_asc", label: "Menor preco" },
  { value: "price_desc", label: "Maior preco" },
  { value: "title", label: "Nome A-Z" },
];

function ProductListingContent() {
  const searchParams = useSearchParams();
  const colecao = searchParams.get("colecao");

  const [filtersOpen, setFiltersOpen] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  const { data: products, isLoading } = useProducts({ limit: 20 });
  const demoProducts = [...(products || [])];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-[var(--muted-foreground)] mb-6">
        <Link href="/" className="hover:text-[var(--primary)]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)] font-medium">
          {colecao ? `Moda ${colecao}` : "Todos os Produtos"}
        </span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">
            {colecao ? `Moda ${colecao}` : "Todos os Produtos"}
          </h1>
          <p className="text-[var(--muted-foreground)] text-sm mt-1">
            {demoProducts.length} produtos encontrados
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 px-3 rounded-lg border border-[var(--border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {/* Filter toggle mobile */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters sidebar */}
        <aside
          className={`w-64 shrink-0 space-y-8 ${
            filtersOpen ? "block" : "hidden"
          } lg:block`}
        >
          {/* Size */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Tamanho</h4>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((s) => s !== size)
                        : [...prev, size]
                    )
                  }
                  className={`w-10 h-10 rounded-lg border text-xs font-medium transition-colors ${
                    selectedSizes.includes(size)
                      ? "bg-[var(--foreground)] text-white border-[var(--foreground)]"
                      : "bg-white border-[var(--border)] hover:border-[var(--foreground)]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Cor</h4>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.label}
                  onClick={() =>
                    setSelectedColors((prev) =>
                      prev.includes(color.label)
                        ? prev.filter((c) => c !== color.label)
                        : [...prev, color.label]
                    )
                  }
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-colors ${
                    selectedColors.includes(color.label)
                      ? "border-[var(--foreground)] bg-[var(--muted)]"
                      : "border-[var(--border)] hover:border-[var(--foreground)]"
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-gray-300 shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Faixa de Preco</h4>
            <div className="flex gap-2 items-center text-sm">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-24 h-10 px-2 rounded-lg border border-[var(--border)] text-sm"
                placeholder="Min"
              />
              <span className="text-[var(--muted-foreground)]">ate</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-24 h-10 px-2 rounded-lg border border-[var(--border)] text-sm"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Clear filters */}
          <button
            onClick={() => {
              setSelectedSizes([]);
              setSelectedColors([]);
              setPriceRange([0, 2000]);
            }}
            className="text-xs text-[var(--primary)] hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Limpar filtros
          </button>
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {demoProducts.slice(0, 12).map((product) => {
                const variant = product.variants?.[0];
                const price = variant?.prices?.[0]?.amount;
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id!}
                    handle={product.handle!}
                    title={product.title!}
                    thumbnail={product.thumbnail || undefined}
                    price={price || 7990}
                    compareAtPrice={price ? price * 1.25 : undefined}
                  />
                );
              })}
              {/* Fill with demo if empty */}
              {demoProducts.length === 0 &&
                Array.from({ length: 8 }).map((_, i) => (
                  <ProductCard
                    key={`demo-${i}`}
                    id={`demo-${i}`}
                    handle="#"
                    title={["Vestido Floral Atacado", "Blusa Tricot Manga Longa", "Conjunto Moletom Premium", "Saia Midi Plissada", "Camiseta Oversized Algodao", "Calca Jeans Destroyed", "Blazer Alfaiataria", "Macacao Linho Verano"][i]}
                    price={[8990, 4990, 12990, 6990, 3990, 10990, 15990, 7990][i]}
                    compareAtPrice={[12990, 7990, 16990, 9990, 5990, 14990, 20990, 11990][i]}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductListingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-40">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
        </div>
      }
    >
      <ProductListingContent />
    </Suspense>
  );
}
