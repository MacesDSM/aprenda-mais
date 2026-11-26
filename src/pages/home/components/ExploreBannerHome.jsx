import { ArrowRight, BadgeCheck } from "lucide-react";
import { Link } from "react-router";

export function ExploreBannerHome() {
    return (
        <aside className="certificate-banner content-width" aria-labelledby="certificate-title">
          <figure className="banner-icon" aria-hidden="true"><BadgeCheck size={22} /></figure>
          <article className="banner-copy">
            <p className="eyebrow">APRENDER TAMBÉM É CONQUISTAR</p>
            <h2 id="certificate-title">Zero mensalidades. Certificação 100% gratuita.</h2>
            <p>O Aprenda Mais conecta você a cursos de qualidade e certificados reconhecidos, sem pagar nada.</p>
          </article>
          <nav className="banner-actions" aria-label="Explorar cursos">
            <Link className="button button-primary" to="/cursos">Encontre seu próximo curso <ArrowRight size={15} aria-hidden="true" /></Link>
            <Link className="text-link" to="/cursos">Explorar categorias</Link>
          </nav>
        </aside>
    )
}