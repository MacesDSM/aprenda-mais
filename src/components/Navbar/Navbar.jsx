import { LogIn, LogOut, Search, UserRound, UsersRound } from "lucide-react";
import { Link, useNavigate } from "react-router";
import "./style.css";
import { UsuarioService } from "../../service";

const usuarioService = new UsuarioService();


export function Navbar({ applySearch, query, setQuery }) {
  
  const navigate = useNavigate();

  const usuarioLogado = usuarioService.findById(usuarioService.getUsuarioLogado()?.id);
  
  function logout() {
    const confirmacao = window.confirm("Deseja realmente sair da sua conta?");
    if(confirmacao) {
      usuarioService.logout();
      navigate("/home");
    }
  }
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
          <Link className="navbar-link navbar-link-about" to="/sobre"><UsersRound size={12} aria-hidden="true" /> Sobre o Projeto</Link>
          <nav className="header-actions" aria-label="Conta e indicações">
            <Link className="button button-primary header-signup" to="/cursos">Indicar Curso</Link>
          </nav>
          {usuarioLogado ? (
            <>
              <Link className="button button-secondary header-login" to="/perfil"><UserRound size={12} aria-hidden="true" /> {usuarioLogado.nome}</Link>
              <button onClick={logout} className="button-icon">
                <LogOut color="red" size={18} />
              </button>
            </>
          ) : (
            <Link className="button button-secondary header-login" to="/login">
              <LogIn size={18} aria-hidden="true" />
              Entrar
            </Link>
          )}
        </nav>
      </section>
    </header>
  )
}