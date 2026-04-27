"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingCart,
  ArrowRight,
  Truck,
  ShieldCheck,
} from "lucide-react";

export default function CartPage() {
  const { items, itemCount, updateQuantity, removeItem, subtotal } = useCart();

  // Calculate subtotal whenever items change
  const calculatedSubtotal = items.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
     subtotal || 0
  );
  const shipping = calculatedSubtotal > 50000 ? 0 : 2990;
  const discount = calculatedSubtotal > 100000 ? calculatedSubtotal * 0.1 : 0;
  const total = calculatedSubtotal + shipping - discount;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl lg:text-3xl font-bold mb-8">Carrinho</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-[var(--muted-foreground)] opacity-30" />
          <h2 className="text-xl font-semibold mb-2">Seu carrinho esta vazio</h2>
          <p className="text-[var(--muted-foreground)] mb-8">
            Explore os produtos do Bras e comece a comprar no atacado.
          </p>
          <Link href="/produtos">
            <Button variant="accent" size="xl">
              Ver Produtos <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 rounded-xl bg-white border border-[var(--muted)]"
              >
                {/* Image */}
                <div className="w-24 h-32 rounded-lg bg-[var(--muted)] shrink-0 overflow-hidden">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingCart className="w-8 h-8 opacity-20" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      {item.size && (
                        <p className="text-xs text-[var(--muted-foreground)]">Tam: {item.size}</p>
                      )}
                      {item.color && (
                        <p className="text-xs text-[var(--muted-foreground)]">Cor: {item.color}</p>
                      )}
                    </div>
                    <span className="text-sm font-bold">
                      {formatPrice(item.unit_price * item.quantity)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded border border-[var(--border)] flex items-center justify-center hover:bg-[var(--muted)]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded border border-[var(--border)] flex items-center justify-center hover:bg-[var(--muted)]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl border border-[var(--muted)] p-6 space-y-4">
              <h3 className="text-lg font-bold">Resumo do Pedido</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">Subtotal ({itemCount} itens)</span>
                  <span>{formatPrice(calculatedSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">Frete</span>
                  <span>
                    {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto (10%)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-[var(--muted)] pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  {total / 12 > 0 ? `ate 12x de ${formatPrice(total / 12)} sem juros` : ""}
                </p>
              </div>

              <Link href="/checkout">
                <Button variant="teal" size="xl" className="w-full font-bold">
                  Finalizar Compra <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                  <Truck className="w-3 h-3" /> Frete gratis acima de R$ 500
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                  <ShieldCheck className="w-3 h-3" /> Compra segura garantida
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
