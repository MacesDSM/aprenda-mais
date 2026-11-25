import { Link } from "react-router"
import "./style.css"
import { GraduationCap, Star } from "lucide-react"
export function Footer() {
    return (
        <footer className="site-footer">
        <section className="footer-inner content-width" aria-label="Links institucionais">
          <section className="footer-brand">
            <Link className="brand" to="/home" aria-label="Aprenda Mais - início">
              <figure className="brand-mark" aria-hidden="true"><GraduationCap size={21} strokeWidth={2.4} /></figure>
              <p>aprenda<strong className="brand-highlight">+</strong></p>
            </Link>
            <p>Conhecimento abre portas.<br />A gente ajuda você a encontrar a sua.</p>
            <p className="footer-note"><Star size={13} fill="currentColor" aria-hidden="true" /> Educação acessível para todos</p>
          </section>
          <nav className="footer-column" aria-label="Plataforma">
            <h2>Plataforma</h2>
            <ul>
              <li><Link to="/cursos">Explorar cursos</Link></li>
              <li><Link to="/cursos">Indicar um curso</Link></li>
              <li><Link to="/sobre">Sobre o projeto</Link></li>
            </ul>
          </nav>
          <nav className="footer-column" aria-label="Materiais e recursos">
            <h2>Materiais & Recursos</h2>
            <ul>
              <li><Link to="/cursos">Tecnologia & Dados</Link></li>
              <li><Link to="/cursos">Educação financeira</Link></li>
              <li><Link to="/cursos">Empreendedorismo</Link></li>
            </ul>
          </nav>
          <nav className="footer-column" aria-label="Comunidade e ajuda">
            <h2>Comunidade & Ajuda</h2>
            <ul>
              <li><Link to="/sobre">Conheça o projeto</Link></li>
              <li><Link to="/cursos">Compartilhe oportunidades</Link></li>
              <li><Link to="/login">Acesse sua conta</Link></li>
            </ul>
          </nav>
        </section>
        <section className="footer-bottom content-width" aria-label="Informações legais">
          <p>© {new Date().getFullYear()} Aprenda Mais. Feito para aprender e compartilhar.</p>
          <ul>
            <li>Termos de uso</li>
            <li>Privacidade</li>
            <li>Acessibilidade</li>
          </ul>
        </section>
      </footer>
    )
}