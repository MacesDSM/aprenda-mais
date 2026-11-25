import { ArrowRight, Info, Search } from "lucide-react";
import "./home.css";

const popularSearches = ["Tecnologia", "Finanças", "Empreendedorismo"]

export function HeroHome() {
    return (
        <section className="hero-section" aria-labelledby="hero-title">
          <article className="hero-content">
            <h1 id="hero-title">Descubra cursos que <strong>iluminam</strong> o<br className="hero-title-break" /> seu caminho.</h1>
            <p className="hero-description">
              O Conheça Mais é uma plataforma comunitária aberta que reúne, organiza e explica cursos
              gratuitos de alta qualidade das melhores instituições públicas do país.
            </p>

            <aside className="hero-notice">
              <Info size={15} aria-hidden="true" />
              <p>
                Não hospedamos nem cobramos por cursos: conectamos você com transparência e links
                diretos às plataformas oficiais (Gov.br, FGV, Sebrae, MEC, etc.).
              </p>
            </aside>

            <form className="course-search" role="search">
              <Search size={19} aria-hidden="true" />
              <input
                className="search-placeholder"
                type="search"
                placeholder="O que você gostaria de aprender? Ex.: Python, finanças..."
                aria-label="O que você gostaria de aprender?"
              />
              <button className="button button-primary search-button" type="submit">
                Buscar cursos <ArrowRight size={16} aria-hidden="true" />
              </button>
            </form>

            {/* Pesquisas sugeridas aplicam o termo e levam o foco aos resultados. */}
            <section className="popular-searches" aria-label="Pesquisas populares">
              <p>Mais buscados:</p>
              <ul>
                {popularSearches.map((term) => (
                  <li key={term}>
                    <button type="button" onClick={() => selectPopularSearch(term)}>{term}</button>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </section>
    )
}