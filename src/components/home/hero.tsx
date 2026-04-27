import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[var(--foreground)] via-[#2d2f4a] to-[var(--foreground)] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[var(--primary)] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--accent)] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Atacado direto do Bras
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              A maior plataforma de moda{" "}
              <span className="text-[var(--accent)]">atacadista</span> de
              Sao Paulo
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              Mais de 500 lojas do Bras em um so lugar. Compre no atacado com precos
              exclusivos e estoque garantido para sua loja.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/produtos">
                <Button variant="accent" size="xl" className="font-bold">
                  Ver Produtos <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/produtos?colecao=feminino">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Moda Feminina
                </Button>
              </Link>
            </div>
            <div className="flex gap-8 pt-4">
              {[
                { number: "500+", label: "Lojistas" },
                { number: "50k+", label: "Produtos" },
                { number: "24h", label: "Entrega" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-[var(--accent)]">{stat.number}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image placeholder */}
          <div className="hidden lg:block">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[var(--primary)]/30 to-[var(--accent)]/20 border border-white/10 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="w-48 h-64 bg-white/5 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-6xl">👗</span>
                </div>
                <p className="text-sm">Colecao Outono/Inverno</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
