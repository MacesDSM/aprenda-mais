import { Clock3, ExternalLink } from "lucide-react";
import { UsuarioService } from "../../../service";

const usuarioService = new UsuarioService();

export function CursoItem({ curso }) {
    const autor = usuarioService.findById(curso.autor.id);
    const isIndicado = curso.autor.id === usuarioService.findByEmail("indicado@email.com")?.id;

    return (
        <article className={`cartao-curso`} key={curso.id}>
            <div className="curso-provedor">
                <span>
                <i aria-hidden="true" /> Plataforma Hospedeira:
                {isIndicado ? (
                    <strong>{curso.autor.nome}</strong>
                ) : (
                    autor && <strong>{autor.nome}</strong>
                )}
                </span>
            </div>
            <h2>{curso.titulo}</h2>

            <div className="curso-resumo">
                <span className="curso-resumo-titulo">
                DO QUE SE TRATA ESTE CURSO:
                </span>
                <p>{curso.descricao}</p>
            </div>
            <div className="curso-metadados">
                <span>
                {curso.duracao && (
                    <>
                        <Clock3 size={12} aria-hidden="true" />
                        <span>{curso.duracao}</span>
                    </>
                )}
                </span>
            </div>
            <a
                className="button button-primary"
                href={curso.link}
                target="_blank"
                rel="noreferrer"
            >
                <p className="text-xs">Ir para a plataforma oficial</p>
                <ExternalLink size={19} aria-hidden="true" />
            </a>
        </article>
    )
}