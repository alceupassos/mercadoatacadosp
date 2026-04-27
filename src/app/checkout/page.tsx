"use client";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

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
  const [orderId] = useState(() =>
    `BRAS-${Date.now().toString(36).toUpperCase()}`
  );

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
      <div className="min-h-screen bg-[#f5f3ee] flex items-center justify-center">
        <div className="text-center px-4 py-20">
          <h2 className="text-xl font-bold text-[#2d2a24] mb-2">
            Carrinho vazio
          </h2>
          <p className="text-sm text-[#8b7b6b] mb-6">
            Adicione produtos para continuar com a compra
          </p>
          <Link href="/produtos">
            <Button variant="accent" size="lg" className="font-bold">
              Ir para Produtos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f3ee]">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Progress steps */}
        <div className="flex items-center justify-center mb-12">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    i < currentStep
                      ? "bg-[#16a34a] text-white"
                      : i === currentStep
                      ? "bg-[#e3979a] text-white shadow-lg shadow-[#e3979a]/30"
                      : "bg-white text-[#8b7b6b] border-2 border-[#e8e2d8]"
                  }`}
                >
                  {i < currentStep ? (
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
                    i + 1
                  )}
                </div>
                <span
                  className={`text-xs mt-2 font-medium hidden sm:block ${
                    i <= currentStep ? "text-[#2d2a24]" : "text-[#8b7b6b]"
                  }`}
                >
                  {step}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-16 sm:w-28 h-0.5 mx-2 mb-5 transition-colors duration-300 ${
                    i < currentStep ? "bg-[#16a34a]" : "bg-[#e8e2d8]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            {/* Step 0: Address */}
            {currentStep === 0 && (
              <div className="bg-white rounded-2xl border border-[#e8e2d8] p-6 lg:p-8 space-y-4">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[#2d2a24]">
                    Endereco de Entrega
                  </h2>
                  <p className="text-sm text-[#8b7b6b] mt-1">
                    Informe o endereco para receber seus produtos
                  </p>
                </div>
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
                    <div
                      key={field.name}
                      className={field.span === 2 ? "sm:col-span-2" : ""}
                    >
                      <label className="block text-xs font-semibold text-[#4a3d2c] mb-1.5">
                        {field.label}
                      </label>
                      <input
                        {...form.register(field.name as keyof ShippingForm)}
                        type={field.type || "text"}
                        className="w-full h-11 px-4 rounded-xl border border-[#d5cdbd] bg-[#fafaf8] text-sm focus:outline-none focus:ring-2 focus:ring-[#e3979a]/50 focus:border-[#e3979a] transition-all placeholder:text-[#b8b0a0]"
                      />
                      {form.formState.errors[
                        field.name as keyof ShippingForm
                      ] && (
                        <p className="text-xs text-[#d10030] mt-1">
                          {
                            form.formState.errors[
                              field.name as keyof ShippingForm
                            ]?.message as string
                          }
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl border border-[#e8e2d8] p-6 lg:p-8 space-y-4">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[#2d2a24]">
                    Metodo de Envio
                  </h2>
                  <p className="text-sm text-[#8b7b6b] mt-1">
                    Escolha como deseja receber seu pedido
                  </p>
                </div>
                {[
                  {
                    id: "normal",
                    label: "Transportadora Padrao",
                    time: "5 a 10 dias uteis",
                    price: 2990,
                  },
                  {
                    id: "express",
                    label: "Transportadora Expressa",
                    time: "2 a 3 dias uteis",
                    price: 4990,
                  },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setShippingMethod(method.id)}
                    className={`w-full flex items-center justify-between p-5 rounded-xl border transition-all duration-200 ${
                      shippingMethod === method.id
                        ? "border-[#e3979a] bg-[#e3979a]/5 shadow-sm"
                        : "border-[#e8e2d8] hover:border-[#d5cdbd] hover:shadow-sm"
                    }`}
                  >
                    <div className="text-left">
                      <p className="text-sm font-semibold text-[#2d2a24]">
                        {method.label}
                      </p>
                      <p className="text-xs text-[#8b7b6b] mt-0.5">
                        {method.time}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-[#2d2a24]">
                      {method.price === 0 ? "Gratis" : formatPrice(method.price)}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl border border-[#e8e2d8] p-6 lg:p-8 space-y-4">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[#2d2a24]">
                    Forma de Pagamento
                  </h2>
                  <p className="text-sm text-[#8b7b6b] mt-1">
                    Escolha a melhor opcao para voce
                  </p>
                </div>
                {[
                  {
                    id: "pix",
                    label: "PIX",
                    desc: "Aprovacao instantanea e 5% de desconto",
                  },
                  {
                    id: "boleto",
                    label: "Boleto a Prazo",
                    desc: "Ate 30 dias para pagar",
                  },
                  {
                    id: "card",
                    label: "Cartao de Credito",
                    desc: "Ate 12x sem juros",
                  },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full flex items-center justify-between p-5 rounded-xl border transition-all duration-200 ${
                      paymentMethod === method.id
                        ? "border-[#e3979a] bg-[#e3979a]/5 shadow-sm"
                        : "border-[#e8e2d8] hover:border-[#d5cdbd] hover:shadow-sm"
                    }`}
                  >
                    <div className="text-left">
                      <p className="text-sm font-semibold text-[#2d2a24]">
                        {method.label}
                      </p>
                      <p className="text-xs text-[#8b7b6b] mt-0.5">
                        {method.desc}
                      </p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-[#d5cdbd] flex items-center justify-center shrink-0">
                      {paymentMethod === method.id && (
                        <div className="w-3 h-3 rounded-full bg-[#e3979a]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl border border-[#e8e2d8] p-6 lg:p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#16a34a]/10 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#16a34a]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#2d2a24] mb-2">
                  Pedido Confirmado!
                </h2>
                <p className="text-sm text-[#8b7b6b] max-w-md mx-auto mb-1">
                  Seu pedido{" "}
                  <span className="font-mono font-semibold text-[#2d2a24]">
                    #{orderId}
                  </span>{" "}
                  foi recebido e esta sendo processado.
                </p>
                <p className="text-xs text-[#8b7b6b] mb-8">
                  Voce recebera um e-mail com a confirmacao e atualizacoes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/conta/pedidos/1">
                    <Button variant="coral" size="lg" className="font-bold">
                      Acompanhar Pedido
                    </Button>
                  </Link>
                  <Link href="/produtos">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-[#d5cdbd] text-[#4a3d2c]"
                    >
                      Continuar Comprando
                    </Button>
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
                className="border-[#d5cdbd] text-[#4a3d2c] hover:bg-[#f5f3ee]"
              >
                &larr; Voltar
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
                  Continuar &rarr;
                </Button>
              )}
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 bg-white rounded-2xl border border-[#e8e2d8] p-6 space-y-4">
              <h3 className="text-lg font-bold text-[#2d2a24]">
                Resumo do Pedido
              </h3>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <div className="w-12 h-16 rounded-lg bg-gradient-to-br from-[#f5f3ee] to-[#e8e2d8] shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-[#2d2a24] truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#8b7b6b]">
                        Qtd: {item.quantity}
                      </p>
                      <p className="text-xs font-bold text-[#2d2a24]">
                        {formatPrice(item.unit_price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#e8e2d8] pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#8b7b6b]">Subtotal</span>
                  <span className="font-medium text-[#2d2a24]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8b7b6b]">Frete</span>
                  <span className="font-medium text-[#2d2a24]">
                    {formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="border-t border-[#e8e2d8] pt-4 flex justify-between font-bold text-lg text-[#2d2a24]">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <p className="text-xs text-[#8b7b6b] text-center">
                Compra segura garantida &middot; Mercado Atacado SP
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
