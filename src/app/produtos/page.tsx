"use client";

import { useState, Suspense } from "react";
import { ProductCard } from "@/components/product/product-card";
import { useProducts } from "@/hooks/use-products";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SIZES = ["PP", "P", "M", "G", "GG", "XG", "3XL"];
const COLORS = [
  { label: "Preto", hex: "#1a1a2e" },
  { label: "Branco", hex: "#f5f3ee" },
  { label: "Azul", hex: "#488ba7" },
  { label: "Rosa", hex: "#e3979a" },
  { label: "Verde", hex: "#a5c5a7" },
  { label: "Bege", hex: "#cfb496" },
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

  const pageTitle = colecao
    ? `Moda ${colecao.charAt(0).toUpperCase() + colecao.slice(1)}`
    : "Todos os Produtos";

  return (
    <div className="min-h-screen bg-[#f5f3ee]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-[#8b7b6b] mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#6b5b8a] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#2d2a24] font-medium">{pageTitle}</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#2d2a24] tracking-tight">
              {pageTitle}
            </h1>
            <p className="text-sm text-[#8b7b6b] mt-1">
              {demoProducts.length} produtos no atacado
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 px-4 rounded-xl border border-[#d5cdbd] bg-white text-sm text-[#2d2a24] focus:outline-none focus:ring-2 focus:ring-[#af9cc5]/50 cursor-pointer"
            >
              <option value="created_at">Mais recentes</option>
              <option value="price_asc">Menor preco</option>
              <option value="price_desc">Maior preco</option>
              <option value="title">Nome A-Z</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              className="lg:hidden border-[#d5cdbd] text-[#4a3d2c]"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              Filtros
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters sidebar */}
          <aside
            className={`w-60 shrink-0 space-y-8 ${
              filtersOpen ? "block" : "hidden"
            } lg:block`}
          >
            {/* Category quick links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8b7b6b] mb-3">
                Colecao
              </h4>
              <div className="space-y-1">
                {[
                  { label: "Todos", href: "/produtos" },
                  { label: "Feminino", href: "/produtos?colecao=feminino" },
                  { label: "Masculino", href: "/produtos?colecao=masculino" },
                  { label: "Infantil", href: "/produtos?colecao=infantil" },
                  { label: "Calcados", href: "/produtos?colecao=calcados" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      (link.label === "Todos" && !colecao) ||
                      colecao === link.label.toLowerCase()
                        ? "bg-[#af9cc5]/15 text-[#6b5b8a] font-semibold"
                        : "text-[#4a3d2c] hover:bg-[#f5f3ee]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8b7b6b] mb-3">
                Tamanho
              </h4>
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
                    className={`w-10 h-10 rounded-lg border text-xs font-medium transition-all duration-200 ${
                      selectedSizes.includes(size)
                        ? "bg-[#2d2a24] text-white border-[#2d2a24]"
                        : "bg-white border-[#d5cdbd] text-[#4a3d2c] hover:border-[#2d2a24]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8b7b6b] mb-3">
                Cor
              </h4>
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
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all duration-200 ${
                      selectedColors.includes(color.label)
                        ? "border-[#2d2a24] bg-[#f5f3ee] font-medium"
                        : "border-[#d5cdbd] bg-white hover:border-[#2d2a24]"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8b7b6b] mb-3">
                Faixa de Preco
              </h4>
              <div className="flex items-center gap-2 text-sm">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="w-full h-10 px-3 rounded-lg border border-[#d5cdbd] text-sm focus:outline-none focus:ring-2 focus:ring-[#af9cc5]/50 bg-white"
                  placeholder="Min"
                />
                <span className="text-[#8b7b6b] text-xs">ate</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full h-10 px-3 rounded-lg border border-[#d5cdbd] text-sm focus:outline-none focus:ring-2 focus:ring-[#af9cc5]/50 bg-white"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Clear */}
            <button
              onClick={() => {
                setSelectedSizes([]);
                setSelectedColors([]);
                setPriceRange([0, 2000]);
              }}
              className="text-xs font-medium text-[#6b5b8a] hover:text-[#4a3d5c] transition-colors underline underline-offset-2"
            >
              Limpar todos os filtros
            </button>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
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
                {/* Demo fallback */}
                {demoProducts.length === 0 &&
                  Array.from({ length: 8 }).map((_, i) => (
                    <ProductCard
                      key={`demo-${i}`}
                      id={`demo-${i}`}
                      handle="#"
                      title={
                        [
                          "Vestido Floral Atacado",
                          "Blusa Tricot Manga Longa",
                          "Conjunto Moletom Premium",
                          "Saia Midi Plissada",
                          "Camiseta Oversized Algodao",
                          "Calca Jeans Destroyed",
                          "Blazer Alfaiataria",
                          "Macacao Linho Verano",
                        ][i]
                      }
                      price={
                        [8990, 4990, 12990, 6990, 3990, 10990, 15990, 7990][i]
                      }
                      compareAtPrice={
                        [12990, 7990, 16990, 9990, 5990, 14990, 20990, 11990][
                          i
                        ]
                      }
                    />
                  ))}
              </div>
            )}
          </div>
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
