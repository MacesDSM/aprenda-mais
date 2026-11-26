import "./cursos.css";
import { CursoService } from "../../service/CursoService.mjs";
import { Footer, Navbar } from "../../components";
import { CursoListView, FiltroCursos, IndicarCurso, ResumoCursos } from "./components";




export function Cursos() {

/* Cards demonstrativos.*/

  function enviarIndicacao(evento) {
    evento.preventDefault();

    const dados = new FormData(evento.currentTarget);
    new CursoService().save({
      titulo: dados.get("titulo"),
      link: dados.get("link"),
      plataforma: dados.get("instituicao"),
      categoria: dados.get("categoria"),
      status: "pendente",
    });

    evento.currentTarget.reset();
    window.alert("Sugestão salva neste navegador.");
  }

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
