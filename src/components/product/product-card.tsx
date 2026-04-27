"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

type ProductCardProps = {
  id: string;
  handle: string;
  title: string;
  thumbnail?: string;
  price?: number;
  compareAtPrice?: number;
  currency?: string;
  variant?: string;
  className?: string;
};

export function ProductCard({
  handle,
  title,
  thumbnail,
  price,
  compareAtPrice,
  currency = "BRL",
  className,
}: ProductCardProps) {
  const hasDiscount = compareAtPrice && price && compareAtPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((compareAtPrice! - price!) / compareAtPrice!) * 100)
    : 0;

  return (
    <Link
      href={`/produtos/${handle}`}
      className={cn("group block", className)}
    >
      <div className="relative aspect-[3/4] rounded-xl bg-[var(--muted)] overflow-hidden mb-3">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--muted-foreground)]">
            <ShoppingCart className="w-12 h-12 opacity-30" />
          </div>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-[var(--destructive)] text-white text-xs font-bold px-2 py-1 rounded-md">
            -{discountPercent}%
          </span>
        )}

        {/* Wishlist */}
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.preventDefault();
            // wishlist logic
          }}
          aria-label="Favoritar"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Quick add */}
        <button
          className="absolute bottom-2 right-2 p-3 rounded-full bg-[var(--accent)] text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#e5a832]"
          onClick={(e) => {
            e.preventDefault();
            // quick add to cart logic
          }}
          aria-label="Adicionar ao carrinho"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>

      <h3 className="text-sm font-medium text-[var(--foreground)] line-clamp-2 mb-1">
        {title}
      </h3>

      <div className="flex items-center gap-2">
        {price !== undefined && price > 0 ? (
          <>
            <span className="text-sm font-bold text-[var(--foreground)]">
              {formatPrice(price, currency)}
            </span>
            {hasDiscount && compareAtPrice && (
              <span className="text-xs text-[var(--muted-foreground)] line-through">
                {formatPrice(compareAtPrice, currency)}
              </span>
            )}
          </>
        ) : (
          <span className="text-xs text-[var(--muted-foreground)]">
            Preco sob consulta
          </span>
        )}
      </div>

      {/* Color swatches */}
      <div className="flex gap-1 mt-2">
        {["#1a1a2e", "#e3979a", "#77bccd", "#f3b94d"].map((color) => (
          <span
            key={color}
            className="w-3 h-3 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </Link>
  );
}
