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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[var(--muted)]">
      {/* Utility bar */}
      <div className="hidden md:block bg-[var(--foreground)] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 h-8 flex items-center justify-between">
          <span>Moda atacadista direto do Bras — Sao Paulo</span>
          <div className="flex gap-4">
            <Link href="/conta" className="hover:text-[var(--accent)] transition-colors">
              Minha Conta
            </Link>
            <Link href="/conta/pedidos/1" className="hover:text-[var(--accent)] transition-colors">
              Meus Pedidos
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
            MERCADO ATACADO<span className="text-[var(--primary)]"> SP</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Account */}
          <Link
            href="/conta"
            className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors hidden sm:block"
            aria-label="Conta"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Cart */}
          <Link
            href="/carrinho"
            className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors relative"
            aria-label="Carrinho"
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--destructive)] text-white text-xs flex items-center justify-center font-bold">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--muted)] bg-white">
          <nav className="px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium py-2 border-b border-[var(--muted)] last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <Link href="/conta" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  <User className="w-4 h-4" /> Minha Conta
                </Button>
              </Link>
              <Link href="/carrinho" className="flex-1">
                <Button variant="accent" size="sm" className="w-full">
                  <ShoppingCart className="w-4 h-4" /> Carrinho
                  {itemCount > 0 && ` (${itemCount})`}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Search dropdown */}
      {searchOpen && (
        <div className="border-t border-[var(--muted)] bg-white px-4 py-3">
          <div className="max-w-2xl mx-auto">
            <form action="/busca" className="flex gap-2">
              <input
                type="text"
                name="q"
                placeholder="Buscar moda atacado..."
                className="flex-1 h-12 px-4 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                autoFocus
              />
              <Button type="submit" size="lg">
                <Search className="w-4 h-4" /> Buscar
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
