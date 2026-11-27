import { CursoSpecifications } from "../../../../service/specifications";
import { useCursoContext } from "../../../../context";
import { CursoTableItem } from "./CursoTableItem";
import { statusCurso } from "../../../../service"
import { useState } from "react";
import { useSearchParams } from "react-router";

/**
 * Ordena os cursos com base na ordem especificada.
 * Função auxiliar para atualizar os parâmetros de pesquisa e refletir a ordenação desejada, usando o hook `setSearchParams`
 * para atualizar os parâmetros de pesquisa na URL.
 * @param {"desc" | "asc"} ordem 
 * @param {Function} setOrdem 
 */
function ordenarCursos(ordem, setOrdem) {
    setOrdem(prev=>{
        prev.set("ordem", ordem);
        return prev;
    });
}

export function CursoTable() {
    const { cursos } = useCursoContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const [abaAtiva, setAbaAtiva] = useState('todos');
    
    
    const cursosPendentes = new CursoSpecifications(cursos)
        .specOrdemByData(searchParams.get("ordem") || "asc")
        .specStatusCurso(statusCurso.pendente)
        .build();
    
    const cursosAprovados = new CursoSpecifications(cursos)
        .specOrdemByData(searchParams.get("ordem") || "asc")
        .specStatusCurso(statusCurso.aprovado)
        .build();
    const cursosReprovados = new CursoSpecifications(cursos)
        .specOrdemByData(searchParams.get("ordem") || "asc")
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
                    <label className="font-normal" htmlFor="filtro">Filtrar por:</label>
                    <select value={searchParams.get("ordem") || "asc"} onChange={(e)=>ordenarCursos(e.target.value, setSearchParams)} id="filtro" className="input">
                        <option value="asc">Mais recentes</option>
                        <option value="desc">Mais antigos</option>
                    </select>
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