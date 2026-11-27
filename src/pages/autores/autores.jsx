import { CursoSpecifications } from '../../service/specifications';
import { AutorCursoItem, CreateCursoModal } from './components';
import { useAuthContext, useCursoContext } from '../../context';
import { AutorService, statusCurso, validateStatusAutor } from '../../service';
import { Footer, Navbar } from '../../components';
import { useState } from 'react';
import './autores.css';
import { CirclePlus } from 'lucide-react';

const autorService = new AutorService();

export function Autor() {
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { cursos } = useCursoContext();
  const { usuario } = useAuthContext();
  
  const autor = autorService.findById(usuario.id);

  const cursosProprios = new CursoSpecifications(cursos)
  .specAutorId(usuario.id)
  .build();

  const cursosPendentes = new CursoSpecifications(cursosProprios)
  .specStatusCurso(statusCurso.pendente)
  .build();

  const cursosAprovados = new CursoSpecifications(cursosProprios)
  .specStatusCurso(statusCurso.aprovado)
  .build();

  const cursosFiltrados = cursosProprios.filter(c=>{
    if(filtroAtivo === 'todos') {
      return true;
    }
    return c.status === filtroAtivo;
  })

  return (
    <section>
      <Navbar />
      <div className="autores-container">
        <div className="autores-header">
          <div>
            <h1>Meus cursos</h1>
            {validateStatusAutor.aprovado.test(autor.status) && (
              <button onClick={()=>setIsCreateDialogOpen(true)} className="button-icon button-primary">
                <CirclePlus size={20} />
              </button>
            )}
          </div>
          <p className="subtitulo">Gerencie seus conteúdos e compartilhe o que você sabe.</p>
        </div>

        {validateStatusAutor.aprovado.test(autor.status) && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-valor">{cursosProprios.length}</div>
                <div className="stat-label">Total de cursos</div>
              </div>
              <div className="stat-card">
                <div className="stat-valor">{cursosPendentes.length}</div>
                <div className="stat-label">Pendentes</div>
              </div>
              <div className="stat-card">
                <div className="stat-valor">{cursosAprovados.length}</div>
                <div className="stat-label">Aprovados</div>
              </div>
            </div>


            <div className="filtros-barra">
              <div className="filtros-botoes">
                <button
                className={`botao-filtro ${filtroAtivo === 'todos' ? 'ativo' : ''}`}
                onClick={() => setFiltroAtivo('todos')}>
                  Todos
                </button>
                <button
                className={`botao-filtro ${filtroAtivo === statusCurso.pendente ? 'ativo' : ''}`}
                onClick={() => setFiltroAtivo(statusCurso.pendente)}>
                  Pendentes
                </button>
                <button
                className={`botao-filtro ${filtroAtivo === statusCurso.aprovado ? 'ativo' : ''}`} onClick={() => setFiltroAtivo(statusCurso.aprovado)}>
                  Aprovados
                </button>
                <button
                className={`botao-filtro ${filtroAtivo === statusCurso.reprovado ? 'ativo' : ''}`}
                onClick={() => setFiltroAtivo(statusCurso.reprovado)}>
                  Reprovados
                </button>
              </div>
            </div>

            <div className="lista-autores">
              {cursosFiltrados.map(curso => (
                <AutorCursoItem key={curso.id} curso={curso} />
              ))}
              {cursosFiltrados.length < 1 && <p className="secondary-500 text-sm">Nenhum curso encontrado.</p>}
            </div>
          </>
        )}
        {!validateStatusAutor.aprovado.test(autor.status) && (
          <div className="autores-fallback">
            <p className={`status-badge status-${autor.status}`}>Status atual: {autor.status}</p>
            <p className="text-sm text-secondary-500 font-medium">Seu perfil de autor deve ser aprovado antes de poder criar cursos.</p>
          </div>
        )}

          <CreateCursoModal
          title="Criar Novo Curso"
          isOpen={isCreateDialogOpen}
          onClose={()=>setIsCreateDialogOpen(false)}
          />
      </div>
      <Footer />
    </section>
  );
};
