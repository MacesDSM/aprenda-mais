import { ChevronRight } from "lucide-react";
import { CategoriaCursoService } from "../../../service"
import "../home.css";
import { DynamicIcon } from "lucide-react/dynamic";
const categoriaService = new CategoriaCursoService();


export function CategoriaHome() {

    const categories = categoriaService.findAll();

    return (
        <section className="category-section content-width" aria-label="Categorias de cursos">
            <ul className="category-grid">
            {categories.map(({ nome, descricao, nomeIcone, cor, filter }) => (
                <li key={nome}>
                <button
                    className={`category-card category-${cor}`}
                    type="button"
                    onClick={() => {
                    setActiveFilter(filter)
                    setSearchTerm("")
                    setQuery("")
                    document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" })
                    }}
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