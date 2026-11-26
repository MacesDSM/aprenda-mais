import { BadgeCheck, CirclePlus, Info } from "lucide-react";
import { Link } from "react-router";

export function ResumoCursos() {
    return (
        <section className="Cursos-resumo-inicio">
          <div className="cartao-cursos-verificado">
            <BadgeCheck size={12} aria-hidden="true" />
            <span>CURADORIA VERIFICADA & SEM FINS LUCRATIVOS</span>
          </div>
          <div className="cursos-introducao">
            <div className="informacoes-curso">
              <h1>Explore Cursos Gratuitos</h1>
              <p>
                Capacitação pública de alto nível com certificações oficiais do
                Gov.br, EV.G, Sebrae, MEC e instituições de ponta.
              </p>
            </div>
            <div className="Botoes-curso-direcionar">
              <Link to="/sobre" className="curso-botao-sobre">
                <Info size={13} aria-hidden="true" />
                Sobre o Projeto & Desenvolvedores
              </Link>
            </div>
          </div>
        </section>
    )
}