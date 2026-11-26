import { ArrowRight, CircleHelp, HeartPulse } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { Link } from "react-router";

const developerBenefits = [
  { icon: "code", title: "Como Funciona a Curadoria", description: "Uma introdução prática para entender os fundamentos da programação.", tone: "blue" },
  { icon: "briefcase-business", title: "Sem Pegadinhas ou Taxas", description: "Cursos gratuitos, com informações claras e sem custos escondidos.", tone: "purple" },
  { icon: "palette", title: "Desenvolvimento Voluntário", description: "Uma iniciativa feita por pessoas que acreditam na educação para todos.", tone: "orange" },
];

export function SobreBannerHome() {
    return (
        <section className="about-section content-width" id="sobre" aria-labelledby="about-title">
          <header className="section-heading about-heading">
            <section>
              <p className="eyebrow">UM PROJETO FEITO PARA COMPARTILHAR</p>
              <h2 id="about-title">Sobre o Projeto & Desenvolvedores</h2>
              <p>Conheça uma iniciativa que acredita no poder da educação para transformar vidas.</p>
            </section>
            <p className="team-badge"><HeartPulse size={15} aria-hidden="true" /> Feito com propósito</p>
          </header>

          <ul className="benefit-grid">
            {developerBenefits.map(({ icon, title, description, tone }) => (
              <li key={title}>
                <article className="benefit-card">
                  <figure className={`icon-badge benefit-icon benefit-${tone}`} aria-hidden="true">
                    <DynamicIcon name={icon} size={19} />
                  </figure>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              </li>
            ))}
          </ul>

          <aside className="question-callout">
            <figure className="question-icon" aria-hidden="true"><CircleHelp size={18} /></figure>
            <article className="question-copy">
              <strong>Quer conhecer melhor nossa iniciativa?</strong>
              <p>Saiba mais sobre o projeto, nossa missão e quem faz parte dele.</p>
            </article>
            <Link className="callout-action" to="/sobre">Conheça o Aprenda Mais <ArrowRight size={14} aria-hidden="true" /></Link>
          </aside>
        </section>
    )
}