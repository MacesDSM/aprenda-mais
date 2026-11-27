import { useState } from "react";
import { useAutorContext } from "../../../../context";
import { AutorSpecifications } from "../../../../service/specifications";
import { statusAutor } from "../../../../service";
import { AutorTableItem } from "./AutorTableItem";


export function AutorTable() {
    const { autores } = useAutorContext();
    const [abaAtiva, setAbaAtiva] = useState('todos');
    
    const autoresPendentes = new AutorSpecifications(autores)
        .specStatusAutor(statusAutor.pendente)
        .build();

    const autoresAprovados = new AutorSpecifications(autores)
        .specStatusAutor(statusAutor.aprovado)
        .build();

    const autoresReprovados = new AutorSpecifications(autores)
        .specStatusAutor(statusAutor.reprovado)
        .build();

    const listaFiltrada = autores.filter((autor) => {
        if (abaAtiva === "todos") return true;
        return autor.status === abaAtiva; // ajuste conforme o nome da propriedade/valores do seu status
    });

    return (
                <div>
                    <div className="tabs-bar">
                        <span
                        className={`tab-item ${abaAtiva === 'todos' ? 'active' : ''}`}
                        onClick={() => setAbaAtiva('todos')}>
                            Todos {autores.length}
                        </span>
                        
                        <span
                        className={`tab-item ${abaAtiva === statusAutor.pendente ? 'active' : ''}`}
                        onClick={() => setAbaAtiva(statusAutor.pendente)}>
                            Pendentes {autoresPendentes.length}
                        </span>
                        <span
                        className={`tab-item ${abaAtiva === statusAutor.aprovado ? 'active' : ''}`}
                        onClick={() => setAbaAtiva(statusAutor.aprovado)}>
                            Aprovados {autoresAprovados.length}
                        </span>
                        <span
                        className={`tab-item ${abaAtiva === statusAutor.reprovado ? 'active' : ''}`}
                        onClick={() => setAbaAtiva(statusAutor.reprovado)}>
                            Reprovados {autoresReprovados.length}
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
                            <span>Nome do autor</span>
                            <span>Status</span>
                            <span>Data de envio</span>
                            <span>Ações</span>
                        </div>
                    </div>
                    {listaFiltrada.map(autor=><AutorTableItem key={autor.id} autor={autor} />)}
                    {listaFiltrada.length === 0 && (
                        <div className="table-fallback">
                            <p className="text-sm secondary-500">Nenhum autor encontrado.</p>
                        </div>
                    )}
                </div>
    )
}