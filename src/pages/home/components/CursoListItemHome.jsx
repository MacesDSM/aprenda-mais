import { ArrowRight, Bookmark, BookmarkCheck, BookOpen } from "lucide-react";
import { useAuthContext, useCursoContext } from "../../../context";
import { Link } from "react-router";
import { validateTipoUsuario } from "../../../service/TipoUsuario.mjs";
import { EstudanteService, UsuarioService } from "../../../service";
import { useState } from "react";

const estudanteService = new EstudanteService();
const usuarioService = new UsuarioService();
export function CursoListItemHome({ curso: c }) {

    const { usuario } = useAuthContext();

    const autor = usuarioService.findById(c.autor.id);

    return (
        <article className="course-card">
            <header className="course-card-top">
                {c.autor && (
                    <div>
                        <figure className={`icon-badge provider-icon provider-${c.cor}`} aria-hidden="true">
                        <BookOpen size={17} />
                        </figure>
                        <p className="course-provider">{autor.nome}</p>
                    </div>
                )}
                {usuario && validateTipoUsuario.estudante.test(usuario.tipoUsuario) && (
                    <BotaoSalvar curso={c} key={c.id} />   
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
    )
}


function BotaoSalvar({curso: c}) {
    const { usuario } = useAuthContext();
    const estudante = estudanteService.findById(usuario.id);
    const [jaSalvo, setJaSalvo] = useState(estudante.cursos.find(us=>us.id==c.id) != undefined);
    
    function salvarCurso() {
        if(jaSalvo) {
            estudanteService.removerCursoSalvo(c.id);
        } else {
            estudanteService.salvarCurso(c.id);
        }
        setJaSalvo(prev => !prev);
    }
    return (
        <button className="button-icon button-secondary" onClick={salvarCurso}>
            {jaSalvo ?  <BookmarkCheck className="icon" size={20} />:<Bookmark className="icon" size={20} />}
        </button>
    )
}