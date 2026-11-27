import { Link } from "react-router";
import {  ArrowUpRight } from "lucide-react";
import { CursoListItemHome } from "./CursoListItemHome";
import { useCursoContext } from "../../../context";
import { CursoSpecifications } from "../../../service/specifications/CursoSpecifications.mjs";


export function CursoListHome(){
  const { cursos } = useCursoContext();

  const cursosFiltrados = new CursoSpecifications(cursos)
  .specLimit(6)
  .build();

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

      <div className="course-grid" aria-live="polite">
        {cursosFiltrados.map(c=><CursoListItemHome key={c.id} curso={c} />)}
      </div>
      {cursos.length < 1 && <p className="empty-state" role="status">Nenhum curso encontrado. Tente outro termo ou categoria.</p>}
    </section>
  )
}