import { BadgeCheck, ChevronLeft, ChevronRight, Clock3, ExternalLink, Info } from "lucide-react";
import { useState } from "react";
import { CursoService } from "../../../service";

const cursoService = new CursoService();

export function CursoListView() {
    const [paginaAtual, setPaginaAtual] = useState(1);

    const cursos = cursoService.findAll();


    return (
        <div className="cursos-coluna-principal">
            <section className="Card-guia" aria-label="Sobre o diretório">
              <span className="guia-icone">
                <Info size={16} aria-hidden="true" />
              </span>
              <div className="guia-conteudo">
                <div className="guia-titulo">
                  <h2>Guia e Diretório Aberto e Gratuito</h2>
                  <span className="cartao-gratuito">100% Livre</span>
                </div>
                <p>
                  <strong>Nosso papel é apenas conectar você:</strong> não
                  hospedamos aulas nem cobramos nada. Você estuda e emite seu
                  certificado direto na fonte oficial!
                </p>
              </div>
            </section>

            {/* Cards demonstrativos.*/}
            <section
              className="grade-cursos"
              aria-label="Cursos gratuitos disponíveis"
              aria-live="polite"
            >
              {cursos.length ? (
                cursos.map((curso) => (
                  <article
                    className={`cartao-curso`}
                    key={curso.id}
                  >
                    <div className="curso-provedor">
                      <span>
                        <i aria-hidden="true" /> Plataforma Hospedeira:
                        {curso.autor && <strong>{curso.autor.nome}</strong>}
                      </span>
                      <span className="curso-selo">{curso.certificado}</span>
                    </div>
                    <h2>{curso.titulo}</h2>
                    <div className="curso-resumo">
                      <span className="curso-resumo-titulo">
                        DO QUE SE TRATA ESTE CURSO:
                      </span>
                      <p>{curso.resumo}</p>
                    </div>
                    <div className="curso-metadados">
                      <span>
                        <Clock3 size={12} aria-hidden="true" />
                        {curso.horasdecurso}h totais
                      </span>
                      <span>
                        <BadgeCheck size={12} aria-hidden="true" />
                        {curso.modalidade}
                      </span>
                      <span className="curso-gratuito">
                        <BadgeCheck size={12} aria-hidden="true" />
                        100% Gratuito
                      </span>
                    </div>
                    <a
                      className="diretorio-direcionar"
                      href={curso.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ir para a plataforma oficial{" "}
                      <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  </article>
                ))
              ) : (
                <p className="cursos-vazios">
                  Nenhum curso encontrado com esses filtros. Tente alterar sua
                  busca.
                </p>
              )}
            </section>
            {/* Fim cards demonstrativos.*/}


            <div className="cursos-paginacao">
              <p>
                <strong>{cursos.length}</strong> cursos disponíveis
              </p>
              <nav aria-label="Paginação dos cursos">
                <button
                  className="botao-pagina"
                  type="button"
                  aria-label="Página anterior"
                  disabled={paginaAtual === 1}
                  onClick={() => setPaginaAtual(paginaAtual - 1)}
                >
                  <ChevronLeft size={15} aria-hidden="true" />
                </button>

                  <button
                    className={`botao-pagina${" pagina-ativa"}`}
                    type="button"
                    onClick={() => setPaginaAtual(pagina)}
                  >
                    0
                  </button>
                <button
                  className="botao-pagina"
                  type="button"
                  aria-label="Próxima página"
                  disabled={false}
                  onClick={() => setPaginaAtual(paginaAtual + 1)}
                >
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              </nav>
            </div>
        </div>
    )
}