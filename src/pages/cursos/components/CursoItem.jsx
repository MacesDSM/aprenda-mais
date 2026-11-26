import { BadgeCheck, Clock3, ExternalLink } from "lucide-react";

export function CursoItem({ curso }) {
    return (
        <article
            className={`cartao-curso`}
            key={curso.id}
            >
            <div className="curso-provedor">
                <span>
                <i aria-hidden="true" /> Plataforma Hospedeira:
                {curso.autor && <strong>{curso.autor.nome}</strong>}
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