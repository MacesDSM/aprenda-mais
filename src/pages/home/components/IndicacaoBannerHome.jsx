import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function IndicacaoBannerHome() {
    return (
        <section className="final-cta content-width" aria-labelledby="final-cta-title">
          <article>
            <p className="eyebrow">SUA PRÓXIMA CONQUISTA COMEÇA AQUI</p>
            <h2 id="final-cta-title">Conhece uma oportunidade gratuita que pode ajudar alguém?</h2>
            <p>Indique um curso e ajude mais pessoas a encontrarem novos caminhos.</p>
          </article>
          <Link className="button button-primary" to="/cursos">Indicar um curso gratuito <ArrowRight size={16} aria-hidden="true" /></Link>
        </section>
    )
}