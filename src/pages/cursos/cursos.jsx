import "./cursos.css";
import { Footer, Navbar } from "../../components";
import { CursoListView, FiltroCursos, IndicarCurso, ResumoCursos } from "./components";


export function Cursos() {

  return (
    <div className="pagina-cursos">
      <Navbar />

      <main className="cursos-conteudo">
        <ResumoCursos />
        <FiltroCursos />

        <div className="cursos-layout">
          <CursoListView />
          <IndicarCurso />
        </div>
      </main>

      <Footer />
    </div>
  );
}
