import { ArrowDownUp } from "lucide-react";
import { CategoriaCursoService, CursoService, statusCurso } from "../../../service";
import { useSearchParams } from "react-router";
import { CursoSpecifications } from "../../../service/specifications/CursoSpecifications.mjs";

const categoriaCursoService = new CategoriaCursoService();

const cursoService = new CursoService();

function atualizarFiltro(setFiltro, key, valor) {
  setFiltro(prev=>{

    const valorAtual = prev.get(key);
    const novoValor = valorAtual == valor ? "" : valor
    
    prev.set(key, novoValor);
    return prev;
    
  });
}

function CategoriaItem({ categoria }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const catSelecionada = searchParams.get("categoriaId");
  

  // Todos os cursos que tem essa categoria
  const cursosCategoria = new CursoSpecifications(cursoService.findAll())
    .specCategoriaId(categoria.id)
    .specStatusCurso(statusCurso.aprovado)
    .build();


  return (
    <button
      className={`filtro-categoria${catSelecionada&&catSelecionada == categoria.id ? " filtro-categoria-ativo" : ""}`}
      type="button"
      key={categoria.id}
      onClick={() => atualizarFiltro(setSearchParams, "categoriaId", categoria.id)}
    >
      {categoria.nome}
      <span>{cursosCategoria.length}</span>
    </button>
  );
}

export function FiltroCursos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorias = categoriaCursoService.findAll();

    return (
        <section className="Botoes-cursos" aria-label="Filtros de cursos">
          <div className="filtros-categorias">
            {categorias.map((categoria) => <CategoriaItem key={categoria.id} categoria={categoria} />)}
          </div>
          <div className="filtros-detalhados">
            <label className="filtro-ordenacao">
              <span className="visualmente-oculto">Ordenar cursos</span>
              <ArrowDownUp size={13} aria-hidden="true" />
              <select
                className="ordenacao-select"
                value={searchParams.get("ordem") || "asc"}
                defaultChecked={"asc"}
                onChange={(evento) => atualizarFiltro(setSearchParams, "ordem", evento.target.value)}
              >
                <option value="asc">Mais recentes</option>
                <option value="desc">Mais antigos</option>
              </select>
            </label>
          </div>
        </section>
    )
}