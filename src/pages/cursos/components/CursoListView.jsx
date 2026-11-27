import { Info } from "lucide-react";
import { useState } from "react";
import { CursoService, statusCurso } from "../../../service";
import { CursoItem } from "./CursoItem";
import { CursoSpecifications } from "../../../service/specifications/CursoSpecifications.mjs";
import { useSearchParams } from "react-router";

const cursoService = new CursoService();

export function CursoListView() {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [searchParams, _] = useSearchParams();

    const listaCursos = cursoService.findAll();

    // Aplica os filtros usando o Builder Pattern
    const cursos = new CursoSpecifications(listaCursos)
      .specOrdemByData(searchParams.get("ordem"))
      .specCategoriaId(searchParams.get("categoriaId"))
      .specStatusCurso(statusCurso.aprovado)
      .build();

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
                  <CursoItem key={curso.id} curso={curso} />
                ))
              ) : (
                <p className="cursos-vazios">
                  Nenhum curso encontrado com esses filtros. Tente alterar sua
                  busca.
                </p>
              )}
            </section>
        </div>
    )
}