import { ArrowDownUp } from "lucide-react";
import { CategoriaCursoService, CursoService } from "../../../service";

const categoriaCursoService = new CategoriaCursoService();

const cursoService = new CursoService();

export function FiltroCursos() {

    const cursos = cursoService.findAll();
    const categorias = categoriaCursoService.findAll();

    return (
        <section className="Botoes-cursos" aria-label="Filtros de cursos">
          <div className="filtros-categorias">
            {categorias.map((categoria) => {
              const quantidade =
                categoria === "Todos"
                  ? cursos.length
                  : cursos.filter((curso) => curso.categoria === categoria)
                      .length;

              return (
                <button
                  className={`filtro-categoria${categoria === categoria ? " filtro-categoria-ativo" : ""}`}
                  type="button"
                  key={categoria.id}
                >
                  {categoria.nome}
                  <span>{quantidade}</span>
                </button>
              );
            })}
          </div>
          <div className="filtros-detalhados">
            <label>
              <span className="visualmente-oculto">Filtrar por duração</span>
              <select
                value={"todas"}
                onChange={(evento) =>
                  atualizarFiltro(setDuracaoSelecionada, evento.target.value)
                }
              >
                <option value="todas">Duração: Todas</option>
                <option value="curta">Até 20 horas</option>
                <option value="media">De 21 a 40 horas</option>
                <option value="longa">Mais de 40 horas</option>
              </select>
            </label>
            <label className="filtro-ordenacao">
              <span className="visualmente-oculto">Ordenar cursos</span>
              <ArrowDownUp size={13} aria-hidden="true" />
              <select
                className="ordenacao-select"
                value={"recentes"}
                onChange={(evento) =>
                  atualizarFiltro(setOrdemSelecionada, evento.target.value)
                }
              >
                <option value="recentes">Mais recentes</option>
                <option value="menor-duracao">Menor duração</option>
                <option value="maior-duracao">Maior duração</option>
              </select>
            </label>
          </div>
        </section>
    )
}