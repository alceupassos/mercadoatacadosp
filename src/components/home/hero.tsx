import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative bg-[#1e1b2e] text-white overflow-hidden">
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a2540] via-[#1e1b2e] to-[#1a1625]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#af9cc5]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#f3b94d]/6 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-[#f3b94d]/15 text-[#f3b94d] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-[#f3b94d]/20">
              Atacado direto do Bras
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
              A maior plataforma de moda{" "}
              <span className="text-[#f3b94d]">atacadista</span> de
              Sao Paulo
            </h1>
            <p className="text-lg text-white/50 max-w-xl leading-relaxed font-light">
              Mais de 500 lojas do Bras em um so lugar. Compre no atacado com
              precos exclusivos e estoque garantido para sua loja.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/produtos">
                <Button variant="accent" size="xl" className="font-bold">
                  Ver Produtos &rarr;
                </Button>
              </Link>
              <Link href="/produtos?colecao=feminino">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white/15 text-white hover:bg-white/8 bg-transparent"
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
                  <p className="text-2xl font-bold text-[#f3b94d]">
                    {stat.number}
                  </p>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="hidden lg:block">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#af9cc5]/20 to-[#f3b94d]/10 border border-white/8 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center">
                <div className="w-48 h-64 rounded-xl bg-white/5 mx-auto mb-4 flex items-center justify-center ring-1 ring-white/10">
                  <span className="text-6xl">🏪</span>
                </div>
                <p className="text-sm text-white/30">
                  Moda Atacadista &middot; Colecao 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
