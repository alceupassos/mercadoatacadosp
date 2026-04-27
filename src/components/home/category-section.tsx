import Link from "next/link";

const CATEGORIES = [
  { label: "Feminino", href: "/produtos?colecao=feminino", emoji: "👚", color: "#e3979a" },
  { label: "Masculino", href: "/produtos?colecao=masculino", emoji: "👔", color: "#488ba7" },
  { label: "Infantil", href: "/produtos?colecao=infantil", emoji: "👶", color: "#f3b94d" },
  { label: "Calcados", href: "/produtos?colecao=calcados", emoji: "👟", color: "#77bccd" },
  { label: "Acessorios", href: "/produtos?colecao=acessorios", emoji: "👜", color: "#a5c5a7" },
  { label: "Jeans", href: "/produtos?colecao=jeans", emoji: "👖", color: "#6b5b8a" },
];

export function CategorySection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#2d2a24] tracking-tight">
            Categorias
          </h2>
          <p className="text-[#8b7b6b] mt-2 text-sm">
            Encontre tudo que sua loja precisa no atacado
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-[#fafaf8] border border-[#e8e2d8] hover:shadow-lg hover:border-[#d5cdbd] hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: cat.color + "18" }}
              >
                {cat.emoji}
              </div>
              <span className="text-sm font-medium text-[#2d2a24] text-center">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
