import { CircleArrowRight } from "lucide-react";
import { useCursoContext } from "../../../context"

export function PerfilCursoSalvo({curso}) {

    const { cursos: listaCursos } = useCursoContext();

    const cursoEncontrado = listaCursos.find(c => c.id === curso.id);

    return (
        <article className="perfil-cartao-curso perfil-cartao-curso-andamento">
            <div className="perfil-cabecalho-curso">
                {cursoEncontrado.categoria && (
                    <span className="perfil-categoria-curso">
                        {cursoEncontrado.categoria.nome}
                    </span>
                )}
                <span className="perfil-plataforma-curso">
                    {cursoEncontrado.autor.nome}
                </span>
            </div>
            <h3>{cursoEncontrado.titulo}</h3>
            <p className="perfil-resumo-curso">{cursoEncontrado.descricao}</p>
            <p className="text-lg">{cursoEncontrado.duracao}</p>
            <div className="perfil-rodape-curso">

                {/* Clicáveis porém sem destino definido. Deve redirecionar para o curso do card.*/}
                <a target="_blank" href={cursoEncontrado.link} className="button button-primary" type="button">
                    <p className="font-medium">Ir para o curso</p>
                    <CircleArrowRight size={18} aria-hidden="true" />
                </a>
            </div>
        </article>
    )
}