"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  ChevronLeft,
  Camera,
} from "lucide-react";

const profileSchema = z.object({
  nome: z.string().min(3, "Nome obrigatorio"),
  email: z.string().email("Email invalido"),
  telefone: z.string().min(10, "Telefone invalido"),
  cpfCnpj: z.string().min(11, "CPF/CNPJ obrigatorio"),
  nomeLoja: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/conta"
        className="text-sm text-[var(--primary)] hover:underline flex items-center gap-1 mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Voltar para Dashboard
      </Link>

      <h1 className="text-2xl lg:text-3xl font-bold mb-8">Configuracoes</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { label: "Perfil", active: true },
            { label: "Enderecos" },
            { label: "Seguranca" },
            { label: "Notificacoes" },
            { label: "Plano" },
          ].map((tab) => (
            <button
              key={tab.label}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                tab.active
                  ? "bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile form */}
          <div className="bg-white rounded-xl border border-[var(--muted)] p-6">
            <h2 className="text-lg font-bold mb-6">Informacoes da Conta</h2>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[var(--primary)] flex items-center justify-center text-2xl font-bold text-white">
                  MS
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[var(--accent)] text-white">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium">{form.watch("nomeLoja") || "Sua loja"}</p>
                <p className="text-xs text-[var(--muted-foreground)]">Foto de perfil da loja</p>
              </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Nome completo", name: "nome", icon: User },
                  { label: "E-mail", name: "email", icon: Mail },
                  { label: "Telefone", name: "telefone", icon: Phone },
                  { label: "CPF/CNPJ", name: "cpfCnpj", icon: User },
                  { label: "Nome da Loja", name: "nomeLoja", icon: User, span: 2 },
                ].map((field) => (
                  <div key={field.name} className={field.span === 2 ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        {...form.register(field.name as keyof ProfileForm)}
                        className="w-full h-10 pl-10 pr-3 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                      />
                      <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                    </div>
                  </div>
                ))}
              </div>

              <Button type="submit" variant="default" size="lg" className="font-bold">
                <Save className="w-4 h-4" />
                {saved ? "Salvo!" : "Salvar Alteracoes"}
              </Button>
            </form>
          </div>

          {/* Address */}
          <div className="bg-white rounded-xl border border-[var(--muted)] p-6">
            <h2 className="text-lg font-bold mb-4">Enderecos</h2>
            <div className="space-y-4">
              {[
                { label: "Loja Principal", addr: "Rua do Bras, 1234 - Bras, SP, 01101-000", padrao: true },
                { label: "Deposito", addr: "Av. Celestino Bourroul, 500 - Limao, SP, 02710-000" },
              ].map((addr) => (
                <div
                  key={addr.label}
                  className="flex items-start justify-between p-4 rounded-xl border border-[var(--muted)] hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[var(--primary)] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium flex items-center gap-2">
                        {addr.label}
                        {addr.padrao && (
                          <span className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)] px-1.5 py-0.5 rounded">
                            Padrao
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">{addr.addr}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm">
                + Adicionar Novo Endereco
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
