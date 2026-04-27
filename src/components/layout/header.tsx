"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/produtos", label: "Produtos" },
  { href: "/produtos?colecao=feminino", label: "Feminino" },
  { href: "/produtos?colecao=masculino", label: "Masculino" },
  { href: "/produtos?colecao=infantil", label: "Infantil" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#e8e2d8]">
      {/* Utility bar */}
      <div className="hidden md:block bg-[#1e1b2e] text-white/50 text-xs">
        <div className="max-w-7xl mx-auto px-4 h-8 flex items-center justify-between">
          <span>Moda atacadista direto do Bras — Sao Paulo</span>
          <div className="flex gap-5">
            <Link
              href="/conta"
              className="hover:text-white transition-colors"
            >
              Minha Conta
            </Link>
            <Link
              href="/conta/pedidos/1"
              className="hover:text-white transition-colors"
            >
              Meus Pedidos
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-bold tracking-tight text-[#2d2a24]">
            MERCADO ATACADO<span className="text-[#af9cc5]"> SP</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#4a3d2c] hover:text-[#6b5b8a] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-lg hover:bg-[#f5f3ee] transition-colors text-[#2d2a24]"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            href="/conta"
            className="p-2 rounded-lg hover:bg-[#f5f3ee] transition-colors hidden sm:block text-[#2d2a24]"
            aria-label="Conta"
          >
            <User className="w-5 h-5" />
          </Link>

          <Link
            href="/carrinho"
            className="p-2 rounded-lg hover:bg-[#f5f3ee] transition-colors relative text-[#2d2a24]"
            aria-label="Carrinho"
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#d10030] text-white text-xs flex items-center justify-center font-bold">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-[#f5f3ee] transition-colors lg:hidden text-[#2d2a24]"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#e8e2d8] bg-white">
          <nav className="px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium py-2 border-b border-[#e8e2d8] last:border-0 text-[#4a3d2c]"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <Link href="/conta" className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-[#d5cdbd] text-[#4a3d2c]"
                >
                  Minha Conta
                </Button>
              </Link>
              <Link href="/carrinho" className="flex-1">
                <Button variant="accent" size="sm" className="w-full">
                  Carrinho
                  {itemCount > 0 && ` (${itemCount})`}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Search dropdown */}
      {searchOpen && (
        <div className="border-t border-[#e8e2d8] bg-white px-4 py-3">
          <div className="max-w-2xl mx-auto">
            <form action="/busca" className="flex gap-2">
              <input
                type="text"
                name="q"
                placeholder="Buscar moda atacado..."
                className="flex-1 h-12 px-4 rounded-xl border border-[#d5cdbd] bg-[#fafaf8] text-sm focus:outline-none focus:ring-2 focus:ring-[#af9cc5]/50 transition-all"
                autoFocus
              />
              <Button type="submit" size="lg" className="font-semibold">
                Buscar
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
