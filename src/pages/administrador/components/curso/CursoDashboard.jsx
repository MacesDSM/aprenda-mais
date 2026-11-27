import { CursoSpecifications } from "../../../../service/specifications";
import { useCursoContext } from "../../../../context";
import { statusCurso } from "../../../../service";
import { CursoTable } from "./CursoTable";

export function CursoDashboard() {
    const { cursos } = useCursoContext();

  const cursosPendentes = new CursoSpecifications(cursos)
    .specStatusCurso(statusCurso.pendente)
    .build();
      
  const cursosAprovados = new CursoSpecifications(cursos)
    .specStatusCurso(statusCurso.aprovado)
    .build();


    return (
      <main className="main-content">
        <div className="top-bar">
          <div className="top-left">
            <h1 className="page-title">Gestão de cursos</h1>
            <p className="page-subtitle">Gerencie, aprove e acompanhe os cursos da plataforma.</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Cursos cadastrados</div>
            <div className="stat-value">{cursos.length}</div>
            <div className="stat-change">Total de cursos na plataforma</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Pendentes</div>
            <div className="stat-value">{cursosPendentes.length}</div>
            <div className="stat-change">Aguardando avaliação</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Aprovados</div>
            <div className="stat-value">{cursosAprovados.length}</div>
            <div className="stat-change">Prestes a publicar</div>
          </div>

        </div>

        <CursoTable />

      </main>
    )
}