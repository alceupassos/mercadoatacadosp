import { Hero } from "@/components/home/hero";
import { CategorySection } from "@/components/home/category-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Truck, Shield, CreditCard, Store } from "lucide-react";

const FEATURES = [
  {
    icon: Store,
    title: "500+ Lojistas",
    desc: "As melhores lojas do Bras reunidas em um so lugar.",
  },
  {
    icon: Truck,
    title: "Entrega Rapida",
    desc: "Envio para todo o Brasil com prazos de atacado.",
  },
  {
    icon: Shield,
    title: "Compra Segura",
    desc: "Suporte dedicado e garantia de satisfacao.",
  },
  {
    icon: CreditCard,
    title: "Pagamento Facilitado",
    desc: "Boleto a prazo, PIX e cartoes em ate 12x.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />

      {/* Features bar */}
      <section className="border-y border-[var(--muted)] bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <f.icon className="w-6 h-6 text-[var(--primary)] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">{f.title}</h4>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts />

      {/* Promo banner */}
      <section className="py-16 bg-[var(--foreground)] text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Pronto para abastecer sua loja?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
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
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">Fique por dentro</h3>
          <p className="text-[var(--muted-foreground)] text-sm mb-6">
            Receba novidades e ofertas exclusivas do atacado do Bras.
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 h-12 px-4 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            />
            <Button type="submit">Inscrever</Button>
          </form>
        </div>
      </section>
    </>
  );
}
