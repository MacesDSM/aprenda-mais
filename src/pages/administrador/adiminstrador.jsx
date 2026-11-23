import React, { useState } from 'react';
import './administrador.css';

const cursosIniciais = [
  { id: 1, nome: 'Introdução à Inteligência Artificial', instrutor: 'Rafael Lins', status: 'pendente', data: '2026-11-20' },
  { id: 2, nome: 'Educação Financeira na vida e nos negócios', instrutor: 'Bento Santos', status: 'pendente', data: '2026-11-19' },
  { id: 3, nome: 'Figma: do zero ao primeiro projeto', instrutor: 'Mariana Costa', status: 'aprovado', data: '2026-11-18' },
  { id: 4, nome: 'Comunicação para equipes', instrutor: 'Paulo Mendes', status: 'aprovado', data: '2026-11-17' },
  { id: 5, nome: 'Design de Interfaces na prática', instrutor: 'Mariana Costa', status: 'aprovado', data: '2026-11-15' },
  { id: 6, nome: 'Excel para análise de dados', instrutor: 'Mylena Lins', status: 'aprovado', data: '2026-11-12' },
];
export function Administrador() {
  const [cursos, setCursos] = useState(cursosIniciais);
  const [abaAtiva, setAbaAtiva] = useState('todos');

  const aprovarCurso = (id) => {
    setCursos(prev => prev.map(curso =>
      curso.id === id ? { ...curso, status: 'aprovado' } : curso
    ));
  };

  const filtrarCursos = () => {
    if (abaAtiva === 'todos') return cursos;
    return cursos.filter(c => c.status === abaAtiva);
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Conheça +</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item">
            <span>📊</span>
            <span>Meu perfil</span>
          </a>
          <a href="#" className="nav-item active">
            <span>📚</span>
            <span>Cursos</span>
          </a>
          <a href="#" className="nav-item">
            <span>👥</span>
            <span>Usuários</span>
          </a>
        </nav>
        <div className="sidebar-footer">
          <div className="footer-card">
            <strong>Uma nova conquista<br />está a um passo de você.</strong>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <div className="top-bar">
          <div className="top-left">
            <h1 className="page-title">Gestão de cursos</h1>
            <p className="page-subtitle">Gerencie, aprove e acompanhe os cursos da plataforma.</p>
          </div>
          <div className="top-right">
            <button className="suporte-btn">Suporte</button>
            <div className="user-area">
              <span>Ana Roberta</span>
              <span>▼</span>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Pendentes</div>
            <div className="stat-value">12</div>
            <div className="stat-change">Aguardando avaliação</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Aprovados</div>
            <div className="stat-value">18</div>
            <div className="stat-change">Prestes a publicar</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Alunos</div>
            <div className="stat-value">118</div>
            <div className="stat-change">Vagas em destaque</div>
          </div>
        </div>

        <div className="alert-box">
          <span className="alert-text">12 cursos aguardam sua avaliação</span>
          <span className="alert-link">Ver pendentes →</span>
        </div>

        <div className="tabs-bar">
          <span className={`tab-item ${abaAtiva === 'todos' ? 'active' : ''}`} onClick={() => setAbaAtiva('todos')}>Todos {cursos.length}</span>
          <span className={`tab-item ${abaAtiva === 'pendente' ? 'active' : ''}`} onClick={() => setAbaAtiva('pendente')}>Pendentes {cursos.filter(c => c.status === 'pendente').length}</span>
          <span className={`tab-item ${abaAtiva === 'aprovado' ? 'active' : ''}`} onClick={() => setAbaAtiva('aprovado')}>Aprovados {cursos.filter(c => c.status === 'aprovado').length}</span>
        </div>

        <div className="filter-row">
          <span className="filter-label">6 cursos cadastrados</span>
          <div className="filter-controls">
            <button className="filter-btn">Filtrar ▼</button>
            <button className="filter-btn">Mais recentes ▼</button>
          </div>
        </div>

        <div className="courses-table-container">
          <div className="table-header-row">
            <span>Nome do curso</span>
            <span>Instrutor</span>
            <span>Status</span>
            <span>Data</span>
            <span>Ações</span>
          </div>

          {filtrarCursos().map(curso => (
            <div key={curso.id} className="table-row">
              <span className="course-name">{curso.nome}</span>
              <span className="course-instructor">{curso.instrutor}</span>
              <span className={`course-status status-${curso.status}`}>
                {curso.status === 'pendente' ? 'Pendente' : 'Aprovado'}
              </span>
              <span className="course-date">{curso.data}</span>
              <span>
                {curso.status === 'pendente' && (
                  <button className="action-btn btn-aprovar" onClick={() => aprovarCurso(curso.id)}>Aprovar</button>
                )}
                <button className="action-btn btn-ver">Ver mais</button>
              </span>
            </div>
          ))}
        </div>

        <div className="pagination">
          <span>Anterior</span>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <span>Próxima</span>
        </div>
      </main>
    </div>
  );
}

export default Administrador;
