import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { CategoriaCursoService, CursoService } from "../../../service";

const cursoService = new CursoService();
const categoriaService = new CategoriaCursoService();


export function CursoListHome(){
  const cursos = cursoService.findAll();
  const categorias = categoriaService.findAll();

  return(
    <section className="courses-section content-width" id="cursos" aria-labelledby="courses-title">
      {/* Os filtros e resultados compartilham o mesmo estado de busca da página. */}
      <header className="section-heading courses-heading">
        <section>
          <p className="eyebrow">APRENDA NO SEU TEMPO</p>
          <h2 id="courses-title">Capacitações com inscrição imediata</h2>
          <p>Encontre seu próximo passo entre cursos gratuitos de instituições confiáveis.</p>
        </section>
        <Link className="text-link" to="/cursos">Ver todos os cursos <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </header>

      <nav className="filter-row" aria-label="Filtrar cursos por categoria">
        {categorias.map((cat) => (
          <button
            type="button"
            key={cat.id}
            className={`filter-chip${cat === cat ? " filter-chip-active" : ""}`}
          >
            {cat.nome}
          </button>
        ))}
        <p className="course-count" aria-live="polite">
          {cursos.length} {cursos.length === 1 ? "curso" : "cursos"} em destaque
        </p>
      </nav>

      {cursos.length > 0 ? (
        <ul className="course-grid" aria-live="polite">
          {cursos.map((c) => (
            <li key={c.id}>
              <article className="course-card">
                <header className="course-card-top">
                  
                  {c.autor && (
                    <>
                      <figure className={`icon-badge provider-icon provider-${c.cor}`} aria-hidden="true">
                        <BookOpen size={17} />
                      </figure>
                      <p className="course-provider">{c.autor.nome}</p>
                    </>
                  )}
                </header>
                <p className={`course-category category-label-${c.cor}`}>{c.category}</p>
                <h3>{c.titulo}</h3>
                {c.descricao && <p className="course-description">{c.descricao}</p>}
                <footer className="course-meta">
                  <p>{c.duracao}</p>
                </footer>
                <Link className="course-link" to="/cursos">Ver detalhes <ArrowRight size={15} aria-hidden="true" /></Link>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state" role="status">Nenhum curso encontrado. Tente outro termo ou categoria.</p>
      )}
    </section>
  )
}