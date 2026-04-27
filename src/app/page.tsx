import { Hero } from "@/components/home/hero";
import { CategorySection } from "@/components/home/category-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />

      {/* Features bar */}
      <section className="border-y border-[#e8e2d8] bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                emoji: "🏪",
                title: "500+ Lojistas",
                desc: "As melhores lojas do Bras reunidas em um so lugar.",
              },
              {
                emoji: "🚚",
                title: "Entrega Rapida",
                desc: "Envio para todo o Brasil com prazos de atacado.",
              },
              {
                emoji: "🔒",
                title: "Compra Segura",
                desc: "Suporte dedicado e garantia de satisfacao.",
              },
              {
                emoji: "💳",
                title: "Pagamento Facilitado",
                desc: "Boleto a prazo, PIX e cartoes em ate 12x.",
              },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{f.emoji}</span>
                <div>
                  <h4 className="text-sm font-semibold text-[#2d2a24]">
                    {f.title}
                  </h4>
                  <p className="text-xs text-[#8b7b6b] mt-1 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts />

      {/* Promo banner */}
      <section className="relative py-20 bg-[#1e1b2e] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a2540] via-[#1e1b2e] to-[#1a1625]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#af9cc5]/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#f3b94d]/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">
            Pronto para abastecer sua loja?
          </h2>
          <p className="text-white/40 max-w-xl mx-auto mb-8 leading-relaxed">
            Cadastre-se e tenha acesso aos melhores precos de atacado do Bras.
            Compra minima a partir de R$ 500.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/produtos">
              <Button variant="accent" size="xl" className="font-bold">
                Comecar Agora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-[#2d2a24] mb-2">
            Fique por dentro
          </h3>
          <p className="text-[#8b7b6b] text-sm mb-6">
            Receba novidades e ofertas exclusivas do atacado do Bras.
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 h-12 px-4 rounded-xl border border-[#d5cdbd] bg-[#fafaf8] text-sm focus:outline-none focus:ring-2 focus:ring-[#af9cc5]/50 transition-all placeholder:text-[#b8b0a0]"
            />
            <Button type="submit" className="font-semibold">
              Inscrever
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
