"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";

const ORDERS = [
  {
    id: "BRAS-A1B2C3",
    date: "15 Abr 2026",
    status: "Entregue",
    statusStyle: "gold",
    total: "R$ 1.299,90",
    items: 12,
    thumb: null,
  },
  {
    id: "BRAS-D4E5F6",
    date: "10 Abr 2026",
    status: "Em Transito",
    statusStyle: "pink",
    total: "R$ 899,50",
    items: 8,
    thumb: null,
  },
  {
    id: "BRAS-G7H8I9",
    date: "05 Abr 2026",
    status: "Processando",
    statusStyle: "gold",
    total: "R$ 2.450,00",
    items: 24,
    thumb: null,
  },
  {
    id: "BRAS-J0K1L2",
    date: "28 Mar 2026",
    status: "Cancelado",
    statusStyle: "pink",
    total: "R$ 450,00",
    items: 4,
    thumb: null,
  },
];

const ADDRESSES = [
  {
    label: "Loja Principal",
    addr: "Rua do Bras, 1234 — Bras, Sao Paulo, SP 01101-000",
    tipo: "Comercial",
  },
  {
    label: "Deposito",
    addr: "Av. Celestino Bourroul, 500 — Limao, Sao Paulo, SP 02710-000",
    tipo: "Estoque",
  },
];

const WISHLIST = [
  { name: "Camiseta Oversized Algodao", brand: "Street Basic", price: 3990 },
  { name: "Blusa Tricot Premium", brand: "Tricot Flor", price: 5990 },
  { name: "Calca Jeans Destroyed", brand: "Denim Co.", price: 8990 },
  { name: "Jaqueta Corta-Vento", brand: "Urban Tech", price: 12990 },
];

function FadeInSection({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out",
        visible
          ? "motion-safe:opacity-100 motion-safe:translate-y-0"
          : "motion-safe:opacity-0 motion-safe:translate-y-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export default function AccountDashboardPage() {
  return (
    <div className="min-h-screen bg-[#f5f3ee]">
      {/* Dark profile header */}
      <section className="relative overflow-hidden bg-[#1e1b2e] text-white">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a2540] via-[#1e1b2e] to-[#1a1625]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#af9cc5]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#f3b94d]/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#af9cc5] to-[#8b7aaa] flex items-center justify-center text-3xl font-bold shadow-lg shadow-[#af9cc5]/20 ring-2 ring-white/10">
              MS
            </div>
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                Maria Silva
              </h1>
              <p className="text-sm text-white/50 mt-1 font-light">
                Loja Verificada &middot; Mercado Atacado SP
              </p>
              <p className="text-xs text-white/30 mt-0.5">maria@email.com</p>
            </div>
            <Link href="/conta/configuracoes">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                Editar Perfil
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <nav className="lg:sticky lg:top-28 space-y-1">
              {[
                { href: "/conta", label: "Dashboard", active: true },
                { href: "/conta/pedidos/1", label: "Meus Pedidos" },
                { href: "/conta/configuracoes", label: "Enderecos" },
                { href: "#", label: "Favoritos" },
                { href: "/conta/configuracoes", label: "Configuracoes" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "block px-4 py-2.5 rounded-lg text-sm transition-all duration-200",
                    item.active
                      ? "bg-[#af9cc5]/15 text-[#6b5b8a] font-semibold"
                      : "text-[#6b5b7b] hover:bg-[#af9cc5]/8 hover:text-[#4a3d5c]"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0 space-y-10">
            {/* Stats */}
            <FadeInSection delay={100}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Pedidos este mes", value: "12", sub: "+3 em andamento" },
                  { label: "Favoritos", value: "28", sub: "12 marcas" },
                  { label: "Enderecos salvos", value: "3", sub: "Comercial e estoque" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-2xl border border-[#e8e2d8] p-5 hover:shadow-md hover:border-[#d5cdbd] transition-all duration-300"
                  >
                    <p className="text-3xl font-bold text-[#2d2a24]">
                      {stat.value}
                    </p>
                    <p className="text-sm font-medium text-[#4a3d2c] mt-1">
                      {stat.label}
                    </p>
                    <p className="text-xs text-[#8b7b6b] mt-0.5">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </FadeInSection>

            {/* Recent Orders */}
            <FadeInSection delay={200}>
              <section>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-[#2d2a24]">
                      Pedidos Recentes
                    </h2>
                    <p className="text-xs text-[#8b7b6b] mt-0.5">
                      Acompanhe seus ultimos pedidos no atacado
                    </p>
                  </div>
                  <Link
                    href="/conta/pedidos/1"
                    className="text-sm font-medium text-[#6b5b8a] hover:text-[#4a3d5c] transition-colors"
                  >
                    Ver todos &rarr;
                  </Link>
                </div>

                <div className="space-y-3">
                  {ORDERS.map((order, i) => (
                    <Link
                      key={order.id}
                      href={`/conta/pedidos/${order.id}`}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#e8e2d8] hover:shadow-md hover:border-[#d5cdbd] transition-all duration-300 group"
                      style={{
                        animationDelay: `${i * 80}ms`,
                      }}
                    >
                      {/* Thumb placeholder */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f5f3ee] to-[#e8e2d8] shrink-0 flex items-center justify-center overflow-hidden">
                        <span className="text-xs font-bold text-[#8b7b6b]">
                          {order.id.slice(-4)}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-[#2d2a24]">
                            Pedido {order.id}
                          </p>
                          <span
                            className={cn(
                              "text-[11px] font-semibold px-2.5 py-0.5 rounded-full",
                              order.statusStyle === "gold" &&
                                "bg-[#fef3d5] text-[#8b6914]",
                              order.statusStyle === "pink" &&
                                "bg-[#fde0e4] text-[#8b3a4a]"
                            )}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#8b7b6b] mt-0.5">
                          {order.date} &middot; {order.items} pecas
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-[#2d2a24]">
                          {order.total}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </FadeInSection>

            {/* Addresses */}
            <FadeInSection delay={300}>
              <section>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-[#2d2a24]">
                      Enderecos Salvos
                    </h2>
                    <p className="text-xs text-[#8b7b6b] mt-0.5">
                      Gerencie seus locais de entrega e faturamento
                    </p>
                  </div>
                  <Link
                    href="/conta/configuracoes"
                    className="text-sm font-medium text-[#6b5b8a] hover:text-[#4a3d5c] transition-colors"
                  >
                    Gerenciar &rarr;
                  </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {ADDRESSES.map((addr) => (
                    <div
                      key={addr.label}
                      className="bg-white rounded-2xl border border-[#e8e2d8] p-5 hover:shadow-md hover:border-[#d5cdbd] transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-[#2d2a24]">
                            {addr.label}
                          </p>
                          <p className="text-[11px] font-medium text-[#af9cc5] bg-[#af9cc5]/10 px-2 py-0.5 rounded-full inline-block mt-1.5">
                            {addr.tipo}
                          </p>
                        </div>
                        <Link
                          href="/conta/configuracoes"
                          className="text-xs text-[#6b5b8a] hover:underline"
                        >
                          Editar
                        </Link>
                      </div>
                      <p className="text-xs text-[#8b7b6b] mt-3 leading-relaxed">
                        {addr.addr}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </FadeInSection>

            {/* Wishlist */}
            <FadeInSection delay={400}>
              <section>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-[#2d2a24]">
                      Lista de Desejos
                    </h2>
                    <p className="text-xs text-[#8b7b6b] mt-0.5">
                      Produtos salvos para compra futura no atacado
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="text-sm font-medium text-[#6b5b8a] hover:text-[#4a3d5c] transition-colors"
                  >
                    Ver todos &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {WISHLIST.map((item, i) => (
                    <div
                      key={item.name}
                      className="group bg-white rounded-2xl border border-[#e8e2d8] overflow-hidden hover:shadow-lg hover:border-[#d5cdbd] transition-all duration-300"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      {/* Product image placeholder */}
                      <div className="aspect-[3/4] bg-gradient-to-br from-[#f5f3ee] to-[#e8e2d8] flex items-center justify-center">
                        <span className="text-4xl select-none">
                          {["🧥", "👚", "👖", "🧥"][i]}
                        </span>
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-medium text-[#2d2a24] line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-[#8b7b6b] mt-0.5">
                          {item.brand}
                        </p>
                        <p className="text-sm font-bold text-[#2d2a24] mt-1.5">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </FadeInSection>
          </div>
        </div>
      </div>
    </div>
  );
}
