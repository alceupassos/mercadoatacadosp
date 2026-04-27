"use client";

import { useState, use } from "react";
import { useProduct } from "@/hooks/use-products";
import { ImageGallery } from "@/components/product/image-gallery";
import { VariantSelector } from "@/components/product/variant-selector";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = use(params);
  const { data: product, isLoading } = useProduct(handle);
  const { addItem } = useCart();

  const [selected, setSelected] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-40 text-center">
        <h2 className="text-2xl font-bold">Produto nao encontrado</h2>
        <Link
          href="/produtos"
          className="text-[var(--primary)] hover:underline mt-4 inline-block"
        >
          Voltar para produtos
        </Link>
      </div>
    );
  }

  const variant = product.variants?.[0];
  const price = variant?.prices?.[0]?.amount;
  const images = product.images?.map((img: { url: string }) => img.url) || [];
  const options = product.options || [];

  const handleAddToCart = () => {
    if (variant) {
      addItem({
        id: variant.id!,
        variant_id: variant.id!,
        title: product.title!,
        quantity,
        unit_price: price || 5990,
        thumbnail: product.thumbnail || undefined,
        size: selected["Size"] || selected["Tamanho"],
        color: selected["Color"] || selected["Cor"],
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ee]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#8b7b6b] mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#6b5b8a] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/produtos"
            className="hover:text-[#6b5b8a] transition-colors"
          >
            Produtos
          </Link>
          <span>/</span>
          <span className="text-[#2d2a24] font-medium truncate max-w-xs">
            {product.title}
          </span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <ImageGallery images={images} title={product.title!} />

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#2d2a24] tracking-tight mb-1">
                {product.title}
              </h1>
              <p className="text-xs text-[#8b7b6b] font-mono">
                Ref: {product.handle?.toUpperCase()}
              </p>
            </div>

            {/* Price card */}
            <div className="bg-white rounded-2xl border border-[#e8e2d8] p-5 space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#2d2a24]">
                  {formatPrice(price || 5990)}
                </span>
                <span className="text-sm text-[#8b7b6b] line-through">
                  {formatPrice((price || 5990) * 1.3)}
                </span>
                <span className="text-sm font-bold text-[#d10030] bg-[#d10030]/5 px-2 py-0.5 rounded-full">
                  -23%
                </span>
              </div>
              <p className="text-xs text-[#8b7b6b]">
                Preco por peca no atacado &middot; Pedido minimo: 6 unidades
              </p>
              <p className="text-xs text-[#16a34a] font-medium">
                {formatPrice((price || 5990) * 6)} em 6 pecas
              </p>
            </div>

            {/* Variants */}
            {options.length > 0 && (
              <VariantSelector
                options={options.map(
                  (o: {
                    title: string;
                    values?: { value: string }[];
                  }) => ({
                    title: o.title,
                    values:
                      o.values?.map((v: { value: string }) => ({
                        value: v.value,
                      })) || [],
                  })
                )}
                selected={selected}
                onSelect={(optionTitle, value) =>
                  setSelected((prev) => ({ ...prev, [optionTitle]: value }))
                }
              />
            )}

            {/* Description */}
            {product.description && (
              <div className="bg-white rounded-2xl border border-[#e8e2d8] p-5">
                <h3 className="text-sm font-semibold text-[#2d2a24] mb-2">
                  Descricao
                </h3>
                <p className="text-sm text-[#4a3d2c] leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h4 className="text-sm font-semibold text-[#2d2a24] mb-3">
                Quantidade (pecas)
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 rounded-xl border border-[#d5cdbd] flex items-center justify-center text-[#2d2a24] hover:bg-[#f5f3ee] transition-colors text-lg font-medium"
                >
                  &minus;
                </button>
                <span className="w-16 h-11 rounded-xl border border-[#d5cdbd] flex items-center justify-center text-sm font-semibold bg-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 rounded-xl border border-[#d5cdbd] flex items-center justify-center text-[#2d2a24] hover:bg-[#f5f3ee] transition-colors text-lg font-medium"
                >
                  +
                </button>
                <span className="text-xs text-[#8b7b6b] ml-3">
                  Min. 6 pecas para preco de atacado
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="accent"
                size="xl"
                className="flex-1 font-bold text-base"
                onClick={handleAddToCart}
              >
                {addedToCart ? "Adicionado!" : "Adicionar ao Carrinho"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 shrink-0 border-[#d5cdbd] hover:bg-[#f5f3ee]"
                aria-label="Favoritar"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </Button>
            </div>

            {/* Info badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { text: "Frete calculado no carrinho" },
                { text: "Compra segura garantida" },
                { text: "Trocas em ate 7 dias" },
              ].map((item) => (
                <span
                  key={item.text}
                  className="text-xs font-medium text-[#6b5b8a] bg-[#af9cc5]/10 px-3 py-1.5 rounded-full"
                >
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        <section className="mt-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#2d2a24]">
              Produtos Relacionados
            </h2>
            <p className="text-sm text-[#8b7b6b] mt-1">
              Mais opcoes do atacado do Bras
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCard
                key={i}
                id={`related-${i}`}
                handle="#"
                title={
                  [
                    "Blusa Tricot Premium",
                    "Calca Pantalona Atacado",
                    "Conjunto Casual Premium",
                    "Vestido Midi Floral",
                  ][i]
                }
                price={[5990, 8990, 11990, 7990][i]}
                compareAtPrice={[8990, 11990, 15990, 10990][i]}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
