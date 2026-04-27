"use client";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  CreditCard,
  Barcode,
  Truck,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";

const shippingSchema = z.object({
  nome: z.string().min(3, "Nome e obrigatorio"),
  email: z.string().email("Email invalido"),
  telefone: z.string().min(10, "Telefone invalido"),
  cep: z.string().length(9, "CEP invalido").or(z.string().length(8)),
  endereco: z.string().min(5, "Endereco obrigatorio"),
  numero: z.string().min(1, "Numero obrigatorio"),
  complemento: z.string().optional(),
  bairro: z.string().min(2, "Bairro obrigatorio"),
  cidade: z.string().min(2, "Cidade obrigatoria"),
  estado: z.string().length(2, "UF obrigatoria"),
});

type ShippingForm = z.infer<typeof shippingSchema>;

const STEPS = ["Endereco", "Frete", "Pagamento", "Confirmacao"];

export default function CheckoutPage() {
  const { items } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderId] = useState(() => `BRAS-${Date.now().toString(36).toUpperCase()}`);

  const form = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      nome: "Maria Silva",
      email: "maria@email.com",
      telefone: "11999999999",
      cep: "01101-000",
      endereco: "Rua do Bras",
      numero: "1234",
      bairro: "Bras",
      cidade: "Sao Paulo",
      estado: "SP",
    },
  });

  const subtotal = items.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );
  const shipping = shippingMethod === "express" ? 4990 : 2990;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-[var(--muted-foreground)] opacity-30" />
        <h2 className="text-xl font-semibold mb-4">Carrinho vazio</h2>
        <Link href="/produtos">
          <Button variant="accent">Ir para Produtos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Progress steps */}
      <div className="flex items-center justify-center mb-12">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  i <= currentStep
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                }`}
              >
                {i < currentStep ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              <span className="text-xs mt-2 hidden sm:block">{step}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-12 sm:w-24 h-0.5 mx-2 ${
                  i < currentStep ? "bg-[var(--primary)]" : "bg-[var(--muted)]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main form */}
        <div className="lg:col-span-2">
          {currentStep === 0 && (
            <div className="bg-white rounded-xl border border-[var(--muted)] p-6 space-y-4">
              <h2 className="text-xl font-bold">Endereco de Entrega</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Nome completo", name: "nome", span: 2 },
                  { label: "E-mail", name: "email", type: "email", span: 1 },
                  { label: "Telefone", name: "telefone", span: 1 },
                  { label: "CEP", name: "cep", span: 1 },
                  { label: "Endereco", name: "endereco", span: 2 },
                  { label: "Numero", name: "numero", span: 1 },
                  { label: "Complemento", name: "complemento", span: 1 },
                  { label: "Bairro", name: "bairro", span: 1 },
                  { label: "Cidade", name: "cidade", span: 1 },
                  { label: "Estado (UF)", name: "estado", span: 1 },
                ].map((field) => (
                  <div key={field.name} className={field.span === 2 ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">
                      {field.label}
                    </label>
                    <input
                      {...form.register(field.name as keyof ShippingForm)}
                      type={field.type || "text"}
                      className="w-full h-10 px-3 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                    />
                    {form.formState.errors[field.name as keyof ShippingForm] && (
                      <p className="text-xs text-[var(--destructive)] mt-1">
                        {form.formState.errors[field.name as keyof ShippingForm]?.message as string}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="bg-white rounded-xl border border-[var(--muted)] p-6 space-y-4">
              <h2 className="text-xl font-bold">Metodo de Envio</h2>
              {[
                { id: "normal", label: "Transportadora Padrao", time: "5-10 dias uteis", price: 2990 },
                { id: "express", label: "Transportadora Expressa", time: "2-3 dias uteis", price: 4990 },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setShippingMethod(method.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors ${
                    shippingMethod === method.id
                      ? "border-[var(--primary)] bg-[var(--primary)]/5"
                      : "border-[var(--border)] hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[var(--primary)]" />
                    <div className="text-left">
                      <p className="text-sm font-medium">{method.label}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{method.time}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold">
                    {method.price === 0 ? "Gratis" : formatPrice(method.price)}
                  </span>
                </button>
              ))}
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-xl border border-[var(--muted)] p-6 space-y-4">
              <h2 className="text-xl font-bold">Forma de Pagamento</h2>
              {[
                { id: "pix", label: "PIX", desc: "Aprovacao instantanea", icon: Barcode },
                { id: "boleto", label: "Boleto a Prazo", desc: "Ate 30 dias para pagar", icon: Barcode },
                { id: "card", label: "Cartao de Credito", desc: "Ate 12x sem juros", icon: CreditCard },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors ${
                    paymentMethod === method.id
                      ? "border-[var(--primary)] bg-[var(--primary)]/5"
                      : "border-[var(--border)] hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <method.icon className="w-5 h-5 text-[var(--primary)]" />
                    <div className="text-left">
                      <p className="text-sm font-medium">{method.label}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{method.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-white rounded-xl border border-[var(--muted)] p-6 space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Check className="w-6 h-6 text-green-500" /> Pedido Confirmado
              </h2>
              <p className="text-sm text-[var(--muted-foreground)]">
                Seu pedido #{orderId} foi recebido e esta sendo processado.
                Voce recebera um e-mail com a confirmacao.
              </p>
              <div className="flex gap-3 pt-4">
                <Link href="/conta/pedidos/1">
                  <Button variant="coral" className="font-bold">
                    Acompanhar Pedido
                  </Button>
                </Link>
                <Link href="/produtos">
                  <Button variant="outline">Continuar Comprando</Button>
                </Link>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0 || currentStep === 3}
            >
              <ChevronLeft className="w-4 h-4" /> Voltar
            </Button>
            {currentStep < 3 && (
              <Button
                variant="coral"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={
                  (currentStep === 1 && !shippingMethod) ||
                  (currentStep === 2 && !paymentMethod)
                }
                className="font-bold"
              >
                Continuar <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-xl border border-[var(--muted)] p-6 space-y-4">
            <h3 className="text-lg font-bold">Resumo</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 text-sm">
                  <div className="w-12 h-16 rounded bg-[var(--muted)] shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Qtd: {item.quantity}</p>
                    <p className="text-xs font-bold">{formatPrice(item.unit_price)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--muted)] pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Frete</span>
                <span>{formatPrice(shipping)}</span>
              </div>
            </div>
            <div className="border-t border-[var(--muted)] pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
              <ShieldCheck className="w-3 h-3" /> Compra segura
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
