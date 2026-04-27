"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function CartPage() {
  const { items, itemCount, updateQuantity, removeItem, subtotal } = useCart();

  const calculatedSubtotal = items.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    subtotal || 0
  );
  const shipping = calculatedSubtotal > 50000 ? 0 : 2990;
  const discount = calculatedSubtotal > 100000 ? calculatedSubtotal * 0.1 : 0;
  const total = calculatedSubtotal + shipping - discount;

  return (
    <div className="min-h-screen bg-[#f5f3ee]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#2d2a24] mb-8 tracking-tight">
          Carrinho
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl block mb-4">🛒</span>
            <h2 className="text-xl font-bold text-[#2d2a24] mb-2">
              Seu carrinho esta vazio
            </h2>
            <p className="text-[#8b7b6b] mb-8 text-sm">
              Explore os produtos do Bras e comece a comprar no atacado.
            </p>
            <Link href="/produtos">
              <Button variant="accent" size="xl" className="font-bold">
                Ver Produtos &rarr;
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
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-[#e8e2d8] hover:shadow-sm transition-all duration-200"
                >
                  {/* Image */}
                  <div className="w-24 h-32 rounded-xl bg-gradient-to-br from-[#f5f3ee] to-[#e8e2d8] shrink-0 overflow-hidden flex items-center justify-center">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl">📦</span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-sm text-[#2d2a24]">
                          {item.title}
                        </h3>
                        {item.size && (
                          <p className="text-xs text-[#8b7b6b] mt-0.5">
                            Tam: {item.size}
                          </p>
                        )}
                        {item.color && (
                          <p className="text-xs text-[#8b7b6b]">
                            Cor: {item.color}
                          </p>
                        )}
                      </div>
                      <span className="text-sm font-bold text-[#2d2a24]">
                        {formatPrice(item.unit_price * item.quantity)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-lg border border-[#d5cdbd] flex items-center justify-center text-[#2d2a24] hover:bg-[#f5f3ee] transition-colors text-sm"
                        >
                          &minus;
                        </button>
                        <span className="w-10 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-lg border border-[#d5cdbd] flex items-center justify-center text-[#2d2a24] hover:bg-[#f5f3ee] transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#8b7b6b] hover:text-[#d10030] hover:bg-[#d10030]/5 transition-colors"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 bg-white rounded-2xl border border-[#e8e2d8] p-6 space-y-4">
                <h3 className="text-lg font-bold text-[#2d2a24]">
                  Resumo do Pedido
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#8b7b6b]">
                      Subtotal ({itemCount} itens)
                    </span>
                    <span className="font-medium text-[#2d2a24]">
                      {formatPrice(calculatedSubtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b7b6b]">Frete</span>
                    <span className="font-medium text-[#2d2a24]">
                      {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#16a34a]">
                      <span>Desconto (10%)</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-[#e8e2d8] pt-4">
                  <div className="flex justify-between font-bold text-lg text-[#2d2a24]">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <p className="text-xs text-[#8b7b6b] mt-1">
                    {total / 12 > 0
                      ? `ate 12x de ${formatPrice(total / 12)} sem juros`
                      : ""}
                  </p>
                </div>

                <Link href="/checkout">
                  <Button
                    variant="teal"
                    size="xl"
                    className="w-full font-bold"
                  >
                    Finalizar Compra &rarr;
                  </Button>
                </Link>

                <div className="space-y-2 pt-2">
                  {[
                    "Frete gratis acima de R$ 500",
                    "Compra segura garantida",
                  ].map((text) => (
                    <p
                      key={text}
                      className="text-xs text-[#8b7b6b] flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#16a34a] shrink-0" />
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
