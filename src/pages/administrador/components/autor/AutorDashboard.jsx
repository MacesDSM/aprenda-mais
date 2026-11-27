import { AutorContextProvider } from "../../../../context";
import { AutorTable } from "./AutorTable";

export function AutorDashboard(){
    return(
        <AutorContextProvider>
            <main className="main-content">
                <div className="top-bar">
                    <div className="top-left">
                    <h1 className="page-title">Gestão de autores</h1>
                    <p className="page-subtitle">Acompanhe os autores de cursos da plataforma.</p>
                    </div>
                </div>

                <AutorTable />
            </main>
        </AutorContextProvider>
    )
}