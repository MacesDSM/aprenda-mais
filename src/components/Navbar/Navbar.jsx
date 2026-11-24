import { Search, UserRound, UsersRound } from "lucide-react";
import { Link } from "react-router";
import "./style.css";
export function Navbar({ applySearch, query, setQuery }) {
    return (
        <header className="site-header">
        <section className="header-inner" aria-label="Acesso rápido">
          <form className="header-search" role="search" onSubmit={applySearch}>
            <Search size={14} aria-hidden="true" />
            <input
              type="search"
              placeholder="Buscar cursos, áreas..."
              aria-label="Buscar cursos e áreas"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <kbd aria-hidden="true">/</kbd>
          </form>

          <nav className="main-nav" aria-label="Navegação principal">
            <Link className="navbar-link nav-link-active" to="/home" aria-current="page">Início</Link>
            <Link className="navbar-link" to="/cursos">Cursos Gratuitos</Link>
            <Link className="navbar-link" to="/perfil">Área de Aprendizado</Link>
            <Link className="navbar-link navbar-link-wrapped" to="/cursos">Cursos<br />indicados</Link>
            <Link className="navbar-link navbar-link-about" to="/sobre"><UsersRound size={12} aria-hidden="true" /> Sobre o Projeto</Link>
          </nav>
          <nav className="header-actions" aria-label="Conta e indicações">
            <Link className="button button-primary header-signup" to="/cursos">Indicar Curso</Link>
            <Link className="profile-icon" to="/perfil" aria-label="Perfil"><UserRound size={14} aria-hidden="true" /></Link>
          </nav>
        </section>
      </header>
    )
}