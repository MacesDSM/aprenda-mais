import { useState } from 'react';
import './autores.css';
import { Footer, Navbar } from '../../components';

export function Autor() {
  const autores = [
    { id: 1, nome: 'Júlia Martins', email: 'julia.martins@email.com', curso: '', status: 'pendente' },
    { id: 2, nome: 'Bruno Rocha', email: 'bruno.rocha@email.com', curso: '', status: 'pendente' },
    { id: 3, nome: 'Marina Costa', email: 'marina.costa@email.com', curso: 'Design • 6 cursos publicados', status: 'aprovado' },
    { id: 4, nome: 'Rafael Lima', email: 'rafael.lima@email.com', curso: 'Tecnologia • 4 cursos publicados', status: 'aprovado' },
    { id: 5, nome: 'Camila Souza', email: 'camila.souza@email.com', curso: 'Marketing', status: 'reprovado' },
    { id: 6, nome: 'Lucas Almeida', email: 'lucas.almeida@email.com', curso: 'Finanças', status: 'reprovado' },
  ];

  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [termoBusca, setTermoBusca] = useState('');

  const autoresFiltrados = autores.filter(autor => {
    const combinaStatus = filtroStatus === 'todos' || (filtroStatus === 'pendentes' && autor.status === 'pendente') || (filtroStatus === 'aprovados' && autor.status === 'aprovado') || (filtroStatus === 'reprovados' && autor.status === 'reprovado');
    const combinaBusca = autor.nome.toLowerCase().includes(termoBusca.toLowerCase()) || autor.email.toLowerCase().includes(termoBusca.toLowerCase());
    return combinaStatus && combinaBusca;
  });

  const total = autores.length;
  const pendentes = autores.filter(a => a.status === 'pendente').length;
  const aprovados = autores.filter(a => a.status === 'aprovado').length;
  const reprovados = autores.filter(a => a.status === 'reprovado').length;

  return (
    <section>
      <Navbar />
      <div className="autores-container">
        <div className="autores-header">
          <h1>Gestão de autores</h1>
          <p className="subtitulo">Gerencie solicitações e acompanhe quem ensina.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-valor">{total}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-card">
            <div className="stat-valor">{pendentes}</div>
            <div className="stat-label">Pendentes</div>
          </div>
          <div className="stat-card">
            <div className="stat-valor">{aprovados}</div>
            <div className="stat-label">Aprovados</div>
          </div>
          <div className="stat-card">
            <div className="stat-valor">{reprovados}</div>
            <div className="stat-label">Reprovados</div>
          </div>
        </div>

        <div className="aviso-pendentes">
          <span className="icone-info">ℹ️</span>
          <strong>{pendentes} autores</strong> aguardam sua análise
          <span className="texto-ajuda">Clique em um autor para ver os seus dados e tomar uma decisão.</span>
          <a href="#" className="link-ajuda">Ver pendentes →</a>
        </div>

        <div className="filtros-barra">
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            className="campo-busca"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          <div className="filtros-botoes">
            <button className={`botao-filtro ${filtroStatus === 'todos' ? 'ativo' : ''}`} onClick={() => setFiltroStatus('todos')}>Todos ({total})</button>
            <button className={`botao-filtro ${filtroStatus === 'pendentes' ? 'ativo' : ''}`} onClick={() => setFiltroStatus('pendentes')}>Pendentes ({pendentes})</button>
            <button className={`botao-filtro ${filtroStatus === 'aprovados' ? 'ativo' : ''}`} onClick={() => setFiltroStatus('aprovados')}>Aprovados ({aprovados})</button>
            <button className={`botao-filtro ${filtroStatus === 'reprovados' ? 'ativo' : ''}`} onClick={() => setFiltroStatus('reprovados')}>Reprovados ({reprovados})</button>
          </div>
          <select className="select-ordenacao">
            <option>Mais recentes</option>
            <option>Mais antigos</option>
            <option>Nome A-Z</option>
          </select>
        </div>

        <p className="contagem-lista">{autoresFiltrados.length} autores cadastrados</p>

        <div className="lista-autores">
          {autoresFiltrados.map(autor => (
            <div key={autor.id} className="card-autor">
              <div className="info-autor">
                <span className={`status-badge ${autor.status}`}>
                  {autor.status === 'aprovado' && '✓ '}
                  {autor.status === 'reprovado' && '✗ '}
                  {autor.status.charAt(0).toUpperCase() + autor.status.slice(1)}
                </span>
                <h3 className="nome-autor">{autor.nome}</h3>
                <p className="email-autor">{autor.email}</p>
                {autor.curso && <p className="curso-autor">{autor.curso}</p>}
              </div>
              {autor.status === 'pendente' ? (
                <button className="botao-analisar">Analisar →</button>
              ) : (
                <button className="botao-perfil">Ver perfil →</button>
              )}
            </div>
          ))}
        </div>

        <div className="paginacao">
          <span>Exibindo 1–6 de 84</span>
          <div className="paginas">
            <button className="botao-pagina ativo">1</button>
            <button className="botao-pagina">2</button>
            <span>...</span>
            <button className="botao-pagina">11</button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};
