import Link from "next/link";
import { Button } from "@/components/ui/button";

const orderDetails = {
  id: "BRAS-A1B2C3",
  date: "15 de Abril de 2026",
  status: "Entregue",
  statusStyle: "gold",
  paymentMethod: "Cartao de Credito (12x de R$ 124,16)",
  shippingAddress: "Rua do Bras, 1234 — Bras, Sao Paulo, SP 01101-000",
  tracking: "BR123456789SP",
  timeline: [
    { status: "Pedido Realizado", date: "01 Abr, 14:30", done: true },
    { status: "Pagamento Aprovado", date: "01 Abr, 14:32", done: true },
    { status: "Separacao no Estoque", date: "02 Abr, 09:15", done: true },
    { status: "Enviado", date: "03 Abr, 16:45", done: true },
    { status: "Entregue", date: "08 Abr, 11:20", done: true },
  ],
  items: [
    {
      name: "Camiseta Oversized Algodao",
      size: "M",
      color: "Preto",
      qty: 12,
      price: 3990,
    },
    {
      name: "Blusa Tricot Premium",
      size: "G",
      color: "Bege",
      qty: 8,
      price: 5990,
    },
    {
      name: "Calca Jeans Destroyed",
      size: "42",
      color: "Azul",
      qty: 4,
      price: 8990,
    },
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
  const shipping = subtotal > 50000 ? 0 : 2990;
  const total = subtotal + shipping;

  const formatPrice = (amount: number) =>
    (amount / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <div className="min-h-screen bg-[#f5f3ee]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back */}
        <Link
          href="/conta"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6b5b8a] hover:text-[#4a3d5c] transition-colors mb-6"
        >
          &larr; Voltar para Meus Pedidos
        </Link>

        {/* Header card */}
        <div className="relative overflow-hidden bg-[#2d2a24] text-white rounded-2xl p-6 lg:p-8 mb-8">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#f3b94d]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-[#af9cc5]/5 rounded-full blur-3xl" />

          <div className="relative flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#af9cc5] uppercase tracking-wider mb-1">
                Pedido #{id}
              </p>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                {id}
              </h1>
              <p className="text-sm text-white/40 mt-1 font-light">
                {order.date}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#fef3d5] text-[#8b6914]">
                {order.status}
              </span>
              <p className="text-xs text-white/30">
                {order.paymentMethod}
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative mt-8 lg:mt-10">
            <div className="flex items-start justify-between">
              {order.timeline.map((step) => (
                <div
                  key={step.status}
                  className="flex-1 flex flex-col items-center relative"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm border-2 z-10 transition-all ${
                      step.done
                        ? "bg-[#f3b94d] border-[#f3b94d] text-[#2d2a24]"
                        : "bg-transparent border-white/20 text-white/40"
                    }`}
                  >
                    {step.done ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-current" />
                    )}
                  </div>
                  <p className="text-[10px] mt-2 text-center text-white/50 hidden sm:block leading-tight max-w-[80px]">
                    {step.status}
                  </p>
                  <p className="text-[9px] text-white/30 mt-0.5 font-light">
                    {step.date}
                  </p>
                </div>
              ))}
            </div>
            {/* Progress line */}
            <div className="absolute top-5 left-4 right-4 h-0.5 bg-white/10 -z-0">
              <div
                className="h-full bg-[#f3b94d] rounded-full transition-all duration-1000"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-[#e8e2d8] p-6">
              <h2 className="text-lg font-bold text-[#2d2a24] mb-1">
                Itens do Pedido
              </h2>
              <p className="text-xs text-[#8b7b6b] mb-5">
                {order.items.reduce((s, i) => s + i.qty, 0)} pecas no total
              </p>

              <div className="space-y-4">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 pb-4 border-b border-[#e8e2d8] last:border-0 last:pb-0"
                  >
                    {/* Thumb */}
                    <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-[#f5f3ee] to-[#e8e2d8] shrink-0 flex items-center justify-center">
                      <span className="text-2xl select-none">
                        {["🧥", "👚", "👖"][i]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#2d2a24]">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#8b7b6b] mt-0.5">
                        Tam: {item.size} &middot; Cor: {item.color} &middot; Qtd:{" "}
                        {item.qty}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm font-bold text-[#2d2a24]">
                          {formatPrice(item.price)} cada
                        </p>
                        <span className="text-[10px] text-[#8b7b6b]">
                          &middot; Total {formatPrice(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping info */}
            <div className="bg-white rounded-2xl border border-[#e8e2d8] p-6">
              <h2 className="text-lg font-bold text-[#2d2a24] mb-4">
                Informacoes de Envio
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-semibold uppercase text-[#8b7b6b] w-16 shrink-0">
                    Rastreio
                  </span>
                  <span className="font-mono font-medium text-[#2d2a24] text-sm">
                    {order.tracking}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[10px] font-semibold uppercase text-[#8b7b6b] w-16 shrink-0 mt-0.5">
                    Endereco
                  </span>
                  <span className="text-[#4a3d2c] text-sm">
                    {order.shippingAddress}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary sidebar */}
          <div>
            <div className="bg-white rounded-2xl border border-[#e8e2d8] p-6 space-y-3 lg:sticky lg:top-28">
              <h3 className="font-bold text-[#2d2a24]">Resumo do Pedido</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#8b7b6b]">Subtotal</span>
                  <span className="font-medium text-[#2d2a24]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8b7b6b]">Frete</span>
                  <span className="font-medium text-[#2d2a24]">
                    {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-[#8b7b6b] text-right">
                    Frete gratis acima de R$ 500
                  </p>
                )}
              </div>

              <div className="border-t border-[#e8e2d8] pt-3 flex justify-between font-bold text-lg text-[#2d2a24]">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <p className="text-xs text-[#8b7b6b]">{order.paymentMethod}</p>

              <div className="space-y-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-[#d5cdbd] text-[#4a3d2c] hover:bg-[#f5f3ee]"
                >
                  Solicitar Nota Fiscal
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-[#d5cdbd] text-[#4a3d2c] hover:bg-[#f5f3ee]"
                >
                  Reportar Problema
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
