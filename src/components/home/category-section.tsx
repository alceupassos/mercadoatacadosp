import Link from "next/link";

const CATEGORIES = [
  { label: "Feminino", href: "/produtos?colecao=feminino", icon: "👚", color: "#e3979a" },
  { label: "Masculino", href: "/produtos?colecao=masculino", icon: "👔", color: "#488ba7" },
  { label: "Infantil", href: "/produtos?colecao=infantil", icon: "👶", color: "#f3b94d" },
  { label: "Calcados", href: "/produtos?colecao=calcados", icon: "👟", color: "#77bccd" },
  { label: "Acessorios", href: "/produtos?colecao=acessorios", icon: "👜", color: "#a5c5a7" },
  { label: "Jeans", href: "/produtos?colecao=jeans", icon: "👖", color: "#1a1a2e" },
];

export function CategorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-[var(--foreground)]">
            Categorias
          </h2>
          <p className="text-[var(--muted-foreground)] mt-2">
            Encontre tudo que sua loja precisa
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-[var(--background)] hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                style={{ backgroundColor: cat.color + "20" }}
              >
                {cat.icon}
              </div>
              <span className="text-sm font-medium text-center">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
