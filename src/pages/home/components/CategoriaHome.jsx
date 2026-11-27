import { ChevronRight } from "lucide-react";
import { CategoriaCursoService } from "../../../service"
import { DynamicIcon } from "lucide-react/dynamic";
import { useNavigate } from "react-router";

const categoriaService = new CategoriaCursoService();

export function CategoriaHome() {

    const categories = categoriaService.findAll();
    const navigate = useNavigate();

    return (
        <section className="category-section content-width" aria-label="Categorias de cursos">
            <ul className="category-grid">
            {categories.map(({ id, nome, descricao, nomeIcone, cor }) => (
                <li key={id}>
                <button
                    className={`category-card category-${cor}`}
                    type="button"
                    onClick={() => navigate(`/cursos?categoriaId=${id}`)}
                >
                    <figure className="icon-badge category-icon" aria-hidden="true">
                        <DynamicIcon name={nomeIcone} size={19} />
                    </figure>
                    <article className="category-copy">
                    <strong>{nome}</strong>
                    <p>{descricao}</p>
                    </article>
                    <ChevronRight className="category-arrow" size={17} aria-hidden="true" />
                </button>
                </li>
            ))}
            </ul>
        </section>
    )
}