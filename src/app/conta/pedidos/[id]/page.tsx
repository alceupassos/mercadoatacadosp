import Link from "next/link";
import {
  ChevronLeft,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const orderDetails = {
  id: "BRAS-A1B2C3",
  date: "15 de Abril de 2026",
  status: "Entregue",
  paymentMethod: "Cartao de Credito (12x)",
  shippingAddress: "Rua do Bras, 1234 - Bras, SP, 01101-000",
  tracking: "BR123456789SP",
  timeline: [
    { status: "Pedido Realizado", date: "01 Abr, 14:30", done: true },
    { status: "Pagamento Aprovado", date: "01 Abr, 14:32", done: true },
    { status: "Separacao no Estoque", date: "02 Abr, 09:15", done: true },
    { status: "Enviado", date: "03 Abr, 16:45", done: true },
    { status: "Entregue", date: "08 Abr, 11:20", done: true },
  ],
  items: [
    { name: "Camiseta Oversized Algodao", size: "M", color: "Preto", qty: 12, price: 3990 },
    { name: "Blusa Tricot Premium", size: "G", color: "Bege", qty: 8, price: 5990 },
    { name: "Calca Jeans Destroyed", size: "42", color: "Azul", qty: 4, price: 8990 },
  ],
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = orderDetails;

  const subtotal = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = 2990;
  const total = subtotal + shipping;

  return (
    <div className="bg-[#f5f5f0] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back */}
        <Link
          href="/conta"
          className="text-sm text-[var(--primary)] hover:underline flex items-center gap-1 mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Voltar para Meus Pedidos
        </Link>

        {/* Header */}
        <div className="bg-[#2d2a24] text-white rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <p className="text-xs text-amber-400 font-medium mb-1">
                Pedido {id}
              </p>
              <h1 className="text-2xl font-bold">{id}</h1>
              <p className="text-sm text-gray-400 mt-1">{order.date}</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
                {order.status}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-8">
            <div className="flex items-start justify-between">
              {order.timeline.map((step) => (
                <div key={step.status} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      step.done
                        ? "bg-green-500 text-white"
                        : "bg-gray-600 text-gray-400"
                    }`}
                  >
                    {step.done ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <p className="text-xs mt-2 text-center hidden sm:block">{step.status}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{step.date}</p>
                </div>
              ))}
            </div>
            {/* Line */}
            <div className="relative h-1 bg-gray-700 rounded-full -mt-12 mb-8 mx-8 -z-10">
              <div className="absolute inset-0 bg-green-500 rounded-full" style={{ width: "100%" }} />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Items */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-[var(--muted)] p-6">
              <h2 className="text-lg font-bold mb-4">Itens do Pedido</h2>
              <div className="space-y-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-4 pb-4 border-b border-[var(--muted)] last:border-0 last:pb-0">
                    <div className="w-16 h-20 rounded-lg bg-[var(--muted)] shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        Tam: {item.size} &middot; Cor: {item.color} &middot; Qtd: {item.qty}
                      </p>
                      <p className="text-sm font-bold mt-1">
                        {(item.price / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        {" "}cada
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping info */}
            <div className="bg-white rounded-xl border border-[var(--muted)] p-6">
              <h2 className="text-lg font-bold mb-4">Informacoes de Envio</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-[var(--muted-foreground)]">Rastreio:</span>
                  <span className="font-mono font-medium">{order.tracking}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[var(--primary)] mt-0.5" />
                  <span className="text-[var(--muted-foreground)]">{order.shippingAddress}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary sidebar */}
          <div>
            <div className="bg-white rounded-xl border border-[var(--muted)] p-6 space-y-3 sticky top-24">
              <h3 className="font-bold">Resumo</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">Subtotal</span>
                  <span>{(subtotal / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">Frete</span>
                  <span>{(shipping / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                </div>
              </div>
              <div className="border-t border-[var(--muted)] pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>{(total / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)]">
                {order.paymentMethod}
              </p>
              <Button variant="outline" size="sm" className="w-full mt-2">
                Solicitar Nota Fiscal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
