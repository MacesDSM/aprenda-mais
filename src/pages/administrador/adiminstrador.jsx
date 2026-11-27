import { BookOpen, UsersRound } from 'lucide-react';
import { Footer, Navbar } from '../../components';
import './administrador.css';
import { Link, Outlet, useLocation } from 'react-router';
import { AutorContextProvider } from '../../context';

export function Administrador() {

  const pathname = useLocation().pathname;

  return (
    <AutorContextProvider>
      <section>
        <Navbar />
        <div className="admin-container">
          <aside className="sidebar">
            <nav className="sidebar-nav">
              <Link to="cursos" className={`nav-item ${pathname!=="/administrador/autores" ? "active" : ""}`}>
                <BookOpen />
                <span>Cursos</span>
              </Link>
              <Link to="autores" className={`nav-item ${pathname==="/administrador/autores" ? "active" : ""}`}>
                <UsersRound />
                <span>Autores</span>
              </Link>
            </nav>
          </aside>
          <Outlet />
        </div>
        <Footer />
      </section>
    </AutorContextProvider>
  );
}
