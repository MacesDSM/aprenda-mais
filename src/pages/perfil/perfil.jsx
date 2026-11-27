import "./perfil.css";
import { UserRoundPen, Clock, CircleArrowRight } from "lucide-react";
import { EstudanteService, UsuarioService } from "../../service";
import { Footer, Navbar } from "../../components";
import { PerfilCursoSalvo } from "./components";


const usuarioService = new UsuarioService();
const estudanteService = new EstudanteService();

export function Perfil() {
    const usuario = usuarioService.findById(usuarioService.getUsuarioLogado()?.id);
    const estudante = estudanteService.findById(usuario.id);

    return (
        <section>
        <Navbar />
            <main>
                <section className="perfil-resumo" aria-label="Resumo do perfil">
                    <div className="perfil-informacoes">
                        <div className="perfil-dados">
                            <div className="perfil-titulo-usuario">
                                <h1>Olá, {usuario?.nome ?? "usuário"}!</h1>
                                <span className="perfil-situacao">Estudante ativo(a)</span>
                            </div>
                            <p>{usuario?.email ?? "email não disponível"}</p>

                        </div>
                    </div>

                    <section className="perfil-cartoes-resumo" aria-label="Resumo dos cursos">
                        <article className="perfil-cartao-resumo">
                            <p className="text-sm font-medium">Cursos Salvos</p>
                            <p>{estudante.cursos.length}</p>
                        </article>
                    </section>
                </section>

                <section className="perfil-cursos-em-andamento" aria-label="Cursos em andamento">
                    <h2>Cursos Salvos</h2>
                    <p>Retome rapidamente de onde parou com links diretos aos portais oficiais parceiros.</p>
                    {estudante.cursos.map(curso=> <PerfilCursoSalvo key={curso.id} curso={curso} />)}
                    {estudante.cursos < 1 && <p>Nenhum curso salvo</p>}
                </section>
            </main>

        <Footer />
      </section>
    )
}