import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1e1b2e] text-white/50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 tracking-tight">
              MERCADO ATACADO<span className="text-[#af9cc5]"> SP</span>
            </h3>
            <p className="text-sm leading-relaxed text-white/40">
              O maior marketplace de moda atacadista de Sao Paulo. Conectamos
              lojistas do Bras com compradores de todo o Brasil.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/70 text-xs font-semibold mb-4 uppercase tracking-wider">
              Navegacao
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/produtos"
                  className="hover:text-white transition-colors"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos?colecao=feminino"
                  className="hover:text-white transition-colors"
                >
                  Moda Feminina
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos?colecao=masculino"
                  className="hover:text-white transition-colors"
                >
                  Moda Masculina
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos?colecao=infantil"
                  className="hover:text-white transition-colors"
                >
                  Moda Infantil
                </Link>
              </li>
              <li>
                <Link
                  href="/busca"
                  className="hover:text-white transition-colors"
                >
                  Buscar
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white/70 text-xs font-semibold mb-4 uppercase tracking-wider">
              Minha Conta
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/conta"
                  className="hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/conta/configuracoes"
                  className="hover:text-white transition-colors"
                >
                  Configuracoes
                </Link>
              </li>
              <li>
                <Link
                  href="/conta/pedidos/1"
                  className="hover:text-white transition-colors"
                >
                  Pedidos
                </Link>
              </li>
              <li>
                <Link
                  href="/carrinho"
                  className="hover:text-white transition-colors"
                >
                  Carrinho
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/70 text-xs font-semibold mb-4 uppercase tracking-wider">
              Contato
            </h4>
            <ul className="space-y-3 text-sm">
              <li>Rua do Bras, Sao Paulo — SP</li>
              <li>(11) 99999-9999</li>
              <li>contato@mercadoatacadosp.com.br</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/25">
          <p>
            &copy; {new Date().getFullYear()} Mercado Atacado SP. Todos os
            direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white/50 transition-colors">
              Termos de Uso
            </Link>
            <Link href="#" className="hover:text-white/50 transition-colors">
              Privacidade
            </Link>
            <Link href="#" className="hover:text-white/50 transition-colors">
              Trocas e Devolucoes
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
