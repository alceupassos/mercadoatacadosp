import Link from "next/link";
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const ORDERS = [
  { id: "BRAS-A1B2C3", date: "15 Abr 2026", status: "Entregue", total: "R$ 1.299,90", items: 12, color: "bg-green-100 text-green-700" },
  { id: "BRAS-D4E5F6", date: "10 Abr 2026", status: "Em Transito", total: "R$ 899,50", items: 8, color: "bg-blue-100 text-blue-700" },
  { id: "BRAS-G7H8I9", date: "05 Abr 2026", status: "Processando", total: "R$ 2.450,00", items: 24, color: "bg-amber-100 text-amber-700" },
  { id: "BRAS-J0K1L2", date: "28 Mar 2026", status: "Cancelado", total: "R$ 450,00", items: 4, color: "bg-red-100 text-red-700" },
];

export default function AccountDashboardPage() {
  return (
    <div>
      {/* Dark profile header */}
      <section className="bg-[var(--foreground)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)] flex items-center justify-center text-2xl font-bold">
              MS
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Maria Silva</h1>
              <p className="text-gray-400 text-sm">maria@email.com</p>
            </div>
            <Link
              href="/conta/configuracoes"
              className="text-sm text-[var(--accent)] hover:underline flex items-center gap-1"
            >
              <Settings className="w-4 h-4" /> Editar Perfil
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar nav */}
          <aside className="w-64 shrink-0 hidden lg:block">
            <nav className="space-y-1">
              {[
                { href: "/conta", label: "Dashboard", icon: User, active: true },
                { href: "/conta/pedidos/1", label: "Meus Pedidos", icon: Package },
                { href: "/conta/configuracoes", label: "Enderecos", icon: MapPin },
                { href: "#", label: "Favoritos", icon: Heart },
                { href: "/conta/configuracoes", label: "Configuracoes", icon: Settings },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                    item.active
                      ? "bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                      : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Pedidos", value: "12", icon: Package, color: "[var(--primary)]" },
                { label: "Favoritos", value: "28", icon: Heart, color: "[var(--destructive)]" },
                { label: "Enderecos", value: "3", icon: MapPin, color: "[var(--accent)]" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl border border-[var(--muted)] p-4">
                  <stat.icon className={`w-5 h-5 text-${stat.color} mb-2`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent orders */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Pedidos Recentes</h2>
                <Link href="/conta/pedidos/1" className="text-sm text-[var(--primary)] hover:underline flex items-center gap-1">
                  Ver todos <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-3">
                {ORDERS.map((order) => (
                  <Link
                    key={order.id}
                    href={`/conta/pedidos/${order.id}`}
                    className="flex items-center justify-between p-4 rounded-xl bg-white border border-[var(--muted)] hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[var(--muted)] flex items-center justify-center">
                        <Package className="w-5 h-5 text-[var(--muted-foreground)]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Pedido {order.id}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {order.date} &middot; {order.items} pecas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${order.color}`}>
                        {order.status}
                      </span>
                      <span className="text-sm font-bold hidden sm:inline">{order.total}</span>
                      <ChevronRight className="w-4 h-4 text-[var(--muted-foreground)]" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Saved addresses */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Enderecos Salvos</h2>
                <Link href="/conta/configuracoes" className="text-sm text-[var(--primary)] hover:underline">
                  Gerenciar
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "Loja Principal", addr: "Rua do Bras, 1234 - Bras, SP, 01101-000" },
                  { label: "Deposito", addr: "Av. Celestino Bourroul, 500 - Limao, SP, 02710-000" },
                ].map((addr) => (
                  <div key={addr.label} className="bg-white rounded-xl border border-[var(--muted)] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-[var(--primary)]" />
                      <span className="text-sm font-semibold">{addr.label}</span>
                    </div>
                    <p className="text-xs text-[var(--muted-foreground)]">{addr.addr}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
