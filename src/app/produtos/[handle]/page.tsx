"use client";

import { useState, use } from "react";
import { useProduct } from "@/hooks/use-products";
import { ImageGallery } from "@/components/product/image-gallery";
import { VariantSelector } from "@/components/product/variant-selector";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import {
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Loader2,
  Minus,
  Plus,
} from "lucide-react";
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
        <Link href="/produtos" className="text-[var(--primary)] hover:underline mt-4 inline-block">
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--muted-foreground)] mb-8">
        <Link href="/" className="hover:text-[var(--primary)]">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/produtos" className="hover:text-[var(--primary)]">Produtos</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)] font-medium">{product.title}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <ImageGallery images={images} title={product.title!} />

        {/* Product info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-sm text-[var(--muted-foreground)]">
              Codigo: {product.handle?.toUpperCase()}
            </p>
          </div>

          {/* Price */}
          <div className="bg-[var(--muted)] rounded-xl p-4 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[var(--foreground)]">
                {formatPrice(price || 5990)}
              </span>
              <span className="text-sm text-[var(--muted-foreground)] line-through">
                {formatPrice((price || 5990) * 1.3)}
              </span>
              <span className="text-sm font-bold text-[var(--destructive)]">-23%</span>
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Preco por peca no atacado (min. 6 unidades)
            </p>
          </div>

          {/* Variants */}
          {options.length > 0 && (
            <VariantSelector
              options={options.map((o: { title: string; values?: { value: string }[] }) => ({
          title: o.title,
          values: o.values?.map((v: { value: string }) => ({ value: v.value })) || [],
              }))}
              selected={selected}
              onSelect={(optionTitle, value) =>
                setSelected((prev) => ({ ...prev, [optionTitle]: value }))
              }
            />
          )}

          {/* Description */}
          {product.description && (
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Quantity */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Quantidade (Pecas)</h4>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border border-[var(--border)] flex items-center justify-center hover:bg-[var(--muted)]"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-14 h-10 rounded-lg border border-[var(--border)] flex items-center justify-center text-sm font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border border-[var(--border)] flex items-center justify-center hover:bg-[var(--muted)]"
              >
                <Plus className="w-4 h-4" />
              </button>
              <span className="text-xs text-[var(--muted-foreground)] ml-2">
                (Atacado: min. 6 pecas)
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="accent"
              size="xl"
              className="flex-1 font-bold"
              onClick={handleAddToCart}
            >
              {addedToCart ? (
                "Adicionado!"
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" /> Adicionar ao Carrinho
                </>
              )}
            </Button>
            <Button variant="outline" size="icon" className="w-14 h-14 shrink-0">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="w-14 h-14 shrink-0">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Shipping & info */}
          <div className="space-y-3 pt-4 border-t border-[var(--muted)]">
            {[
              { icon: Truck, text: "Frete calculado no carrinho" },
              { icon: ShieldCheck, text: "Compra segura com garantia" },
              { icon: RotateCcw, text: "Trocas em ate 7 dias" },
            ].map((i) => (
              <div key={i.text} className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                <i.icon className="w-4 h-4 text-[var(--primary)]" />
                {i.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold mb-8">Produtos Relacionados</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCard
              key={i}
              id={`related-${i}`}
              handle="#"
              title={["Blusa Tricot Premium", "Calca Pantalona", "Conjunto Casual Atacado", "Vestido Midi Floral"][i]}
              price={[5990, 8990, 11990, 7990][i]}
              compareAtPrice={[8990, 11990, 15990, 10990][i]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
