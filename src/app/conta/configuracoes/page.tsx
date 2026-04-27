"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

const profileSchema = z.object({
  nome: z.string().min(3, "Nome obrigatorio"),
  email: z.string().email("Email invalido"),
  telefone: z.string().min(10, "Telefone invalido"),
  cpfCnpj: z.string().min(11, "CPF/CNPJ obrigatorio"),
  nomeLoja: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

const TABS = [
  { label: "Perfil", active: true },
  { label: "Enderecos" },
  { label: "Seguranca" },
  { label: "Notificacoes" },
  { label: "Plano" },
];

export default function AccountSettingsPage() {
  const [saved, setSaved] = useState(false);

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nome: "Maria Silva",
      email: "maria@email.com",
      telefone: "11999999999",
      cpfCnpj: "123.456.789-00",
      nomeLoja: "Maria Modas",
    },
  });

  const onSubmit = (data: ProfileForm) => {
    console.log(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f3ee]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link
          href="/conta"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6b5b8a] hover:text-[#4a3d5c] transition-colors mb-6"
        >
          &larr; Voltar para Dashboard
        </Link>

        <h1 className="text-2xl lg:text-3xl font-bold text-[#2d2a24] mb-8 tracking-tight">
          Configuracoes
        </h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar tabs */}
          <aside className="lg:col-span-1">
            <nav className="lg:sticky lg:top-28 space-y-1">
              {TABS.map((tab) => (
                <button
                  key={tab.label}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    tab.active
                      ? "bg-[#77bccd]/15 text-[#4a8a9a] font-semibold"
                      : "text-[#6b5b7b] hover:bg-[#77bccd]/8 hover:text-[#4a8a9a]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile form */}
            <div className="bg-white rounded-2xl border border-[#e8e2d8] p-6 lg:p-8">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#2d2a24]">
                  Informacoes da Conta
                </h2>
                <p className="text-xs text-[#8b7b6b] mt-1">
                  Atualize seus dados cadastrais e informacoes da loja
                </p>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#e8e2d8]">
                <div className="relative group cursor-pointer">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#77bccd] to-[#488ba7] flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-[#77bccd]/20">
                    MS
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-[10px] font-medium">
                      Alterar
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2d2a24]">
                    {form.watch("nomeLoja") || "Sua Loja"}
                  </p>
                  <p className="text-xs text-[#8b7b6b]">
                    Foto de perfil da loja
                  </p>
                </div>
              </div>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Nome completo",
                      name: "nome" as const,
                      placeholder: "Seu nome completo",
                    },
                    {
                      label: "E-mail",
                      name: "email" as const,
                      placeholder: "seu@email.com",
                    },
                    {
                      label: "Telefone",
                      name: "telefone" as const,
                      placeholder: "(11) 99999-9999",
                    },
                    {
                      label: "CPF/CNPJ",
                      name: "cpfCnpj" as const,
                      placeholder: "123.456.789-00",
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs font-semibold text-[#4a3d2c] mb-1.5">
                        {field.label}
                      </label>
                      <input
                        {...form.register(field.name)}
                        placeholder={field.placeholder}
                        className="w-full h-11 px-4 rounded-xl border border-[#d5cdbd] text-sm bg-[#fafaf8] focus:outline-none focus:ring-2 focus:ring-[#77bccd]/50 focus:border-[#77bccd] transition-all placeholder:text-[#b8b0a0]"
                      />
                      {form.formState.errors[field.name] && (
                        <p className="text-xs text-[#d10030] mt-1">
                          {form.formState.errors[field.name]?.message}
                        </p>
                      )}
                    </div>
                  ))}

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#4a3d2c] mb-1.5">
                      Nome da Loja
                    </label>
                    <input
                      {...form.register("nomeLoja")}
                      placeholder="Nome da sua loja no Brás"
                      className="w-full h-11 px-4 rounded-xl border border-[#d5cdbd] text-sm bg-[#fafaf8] focus:outline-none focus:ring-2 focus:ring-[#77bccd]/50 focus:border-[#77bccd] transition-all placeholder:text-[#b8b0a0]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="font-bold"
                  >
                    {saved ? "Salvo!" : "Salvar Alteracoes"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-2xl border border-[#e8e2d8] p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-[#2d2a24]">
                    Enderecos
                  </h2>
                  <p className="text-xs text-[#8b7b6b] mt-1">
                    Gerencie seus enderecos de entrega e faturamento
                  </p>
                </div>
                <Button
                  variant="accent"
                  size="sm"
                  className="font-semibold text-xs"
                >
                  + Novo Endereco
                </Button>
              </div>

              <div className="space-y-3">
                {[
                  {
                    label: "Loja Principal",
                    addr: "Rua do Bras, 1234 — Bras, Sao Paulo, SP 01101-000",
                    tipo: "Comercial",
                    padrao: true,
                  },
                  {
                    label: "Deposito",
                    addr: "Av. Celestino Bourroul, 500 — Limao, Sao Paulo, SP 02710-000",
                    tipo: "Estoque",
                  },
                ].map((addr) => (
                  <div
                    key={addr.label}
                    className="flex items-start justify-between p-4 rounded-xl border border-[#e8e2d8] hover:border-[#d5cdbd] hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#2d2a24] flex items-center gap-2">
                          {addr.label}
                          {addr.padrao && (
                            <span className="text-[10px] bg-[#77bccd]/10 text-[#4a8a9a] px-1.5 py-0.5 rounded font-semibold">
                              Padrao
                            </span>
                          )}
                        </p>
                        <p className="text-[11px] font-medium text-[#77bccd] mt-1">
                          {addr.tipo}
                        </p>
                        <p className="text-xs text-[#8b7b6b] mt-1.5 leading-relaxed">
                          {addr.addr}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 border-[#d5cdbd] text-[#4a3d2c] hover:bg-[#f5f3ee] text-xs"
                    >
                      Editar
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl border border-[#e8e2d8] p-6 lg:p-8">
              <h2 className="text-lg font-bold text-[#2d2a24] mb-1">
                Seguranca
              </h2>
              <p className="text-xs text-[#8b7b6b] mb-5">
                Gerencie sua senha e metodos de autenticacao
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-[#e8e2d8]">
                  <div>
                    <p className="text-sm font-medium text-[#2d2a24]">
                      Alterar Senha
                    </p>
                    <p className="text-xs text-[#8b7b6b]">
                      Ultima alteracao ha 3 meses
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#d5cdbd] text-[#4a3d2c] hover:bg-[#f5f3ee] text-xs"
                  >
                    Alterar
                  </Button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-[#2d2a24]">
                      Verificacao em Duas Etapas
                    </p>
                    <p className="text-xs text-[#8b7b6b]">
                      Adicione uma camada extra de seguranca
                    </p>
                  </div>
                  <Button
                    variant="accent"
                    size="sm"
                    className="font-semibold text-xs"
                  >
                    Ativar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
