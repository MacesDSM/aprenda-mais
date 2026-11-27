import { CursoSpecifications } from "../../../../service/specifications";
import { useCursoContext } from "../../../../context";
import { CursoTableItem } from "./CursoTableItem";
import { statusCurso } from "../../../../service"
import { useState } from "react";

export function CursoTable() {
    const { cursos } = useCursoContext();
    const [abaAtiva, setAbaAtiva] = useState('todos');
    
    
    const cursosPendentes = new CursoSpecifications(cursos)
        .specStatusCurso(statusCurso.pendente)
        .build();
    
    const cursosAprovados = new CursoSpecifications(cursos)
        .specStatusCurso(statusCurso.aprovado)
        .build();
    const cursosReprovados = new CursoSpecifications(cursos)
        .specStatusCurso(statusCurso.reprovado)
        .build();
    
    const listaFiltrada = cursos.filter((curso) => {
        if (abaAtiva === "todos") return true;
        return curso.status === abaAtiva; // ajuste conforme o nome da propriedade/valores do seu status
    });

    return (
        <div>
            <div className="tabs-bar">
                <span
                className={`tab-item ${abaAtiva === 'todos' ? 'active' : ''}`}
                onClick={() => setAbaAtiva('todos')}>
                    Todos {cursos.length}
                </span>
                
                <span
                className={`tab-item ${abaAtiva === statusCurso.pendente ? 'active' : ''}`}
                onClick={() => setAbaAtiva(statusCurso.pendente)}>
                    Pendentes {cursosPendentes.length}
                </span>
                <span
                className={`tab-item ${abaAtiva === statusCurso.aprovado ? 'active' : ''}`}
                onClick={() => setAbaAtiva(statusCurso.aprovado)}>
                    Aprovados {cursosAprovados.length}
                </span>
                <span
                className={`tab-item ${abaAtiva === statusCurso.reprovado ? 'active' : ''}`}
                onClick={() => setAbaAtiva(statusCurso.reprovado)}>
                    Reprovados {cursosReprovados.length}
                </span>
            </div>

            <div className="filter-row">
                <div className="filter-controls">
                    <button className="filter-btn">Filtrar ▼</button>
                    <button className="filter-btn">Mais recentes ▼</button>
                </div>
            </div>

            <div className="courses-table-container">
                <div className="table-header-row">
                    <span>Nome do curso</span>
                    <span>Instrutor</span>
                    <span>Status</span>
                    <span>Data de envio</span>
                    <span>Ações</span>
                </div>
            </div>
            {listaFiltrada.map(curso=><CursoTableItem key={curso.id} curso={curso} />)}
            {listaFiltrada.length === 0 && (
                <div className="table-fallback">
                    <p className="text-sm secondary-500">Nenhum curso encontrado.</p>
                </div>
            )}
        </div>
    )
}