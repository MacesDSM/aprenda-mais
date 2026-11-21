import { useMemo, useState } from "react"
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Ellipsis,
  Pencil,
  Plus,
  Search,
  UsersRound,
} from "lucide-react"
import { Link } from "react-router"
import "./perfil.css"

const courses = [
  {
    number: "01",
    title: "Design que faz sentido.",
    summary: "Design systems do início ao fim",
    category: "DESIGN",
    initials: "UI",
    tone: "blue",
    status: "Publicado",
    lessons: 24,
    students: 860,
    updated: "2026-11-18",
  },
  {
    number: "02",
    title: "Interfaces com intenção.",
    summary: "Design de interfaces na prática",
    category: "DESIGN",
    initials: "UX",
    tone: "purple",
    status: "Publicado",
    lessons: 12,
    students: 312,
    updated: "2026-11-16",
  },
  {
    number: "03",
    title: "Marcas que deixam marca.",
    category: "BRANDING",
    initials: "Aa",
    tone: "orange",
    status: "Rascunho",
    lessons: 8,
    students: 0,
    progress: 61,
    updated: "2026-11-12",
  },
  {
    number: "04",
    title: "Menos ruído. Mais sistema.",
    summary: "Design systems do início ao fim",
    category: "PRODUTO",
    initials: "DS",
    tone: "green",
    status: "Publicado",
    lessons: 18,
    students: 28,
    updated: "2026-11-10",
  },
  {
    number: "05",
    title: "Cada letra conta.",
    summary: "Tipografia para produtos digitais",
    category: "TIPOGRAFIA",
    initials: "Tt",
    tone: "yellow",
    status: "Publicado",
    lessons: 10,
    students: 48,
    updated: "2026-11-08",
  },
  {
    number: "06",
    title: "Seu trabalho. Sua história.",
    summary: "Portfólio criativo que conecta",
    category: "CARREIRA",
    initials: "→",
    tone: "slate",
    status: "Rascunho",
    lessons: 6,
    students: 0,
    progress: 30,
    updated: "2026-11-05",
  },
]

const tabs = [
  { label: "Todos", value: "Todos", count: 6 },
  { label: "Publicados", value: "Publicado", count: 4 },
  { label: "Rascunhos", value: "Rascunho", count: 2 },
]

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
}

export function Perfil() {
  const [activeTab, setActiveTab] = useState("Todos")
  const [query, setQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("recentes")

  const visibleCourses = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim())
    return courses
      .filter((course) => {
        const matchesTab = activeTab === "Todos" || course.status === activeTab
        const matchesQuery = normalizeText(`${course.title} ${course.category}`).includes(normalizedQuery)
        return matchesTab && matchesQuery
      })
      .sort((first, second) => {
        if (sortOrder === "titulo") return first.title.localeCompare(second.title, "pt-BR")
        return second.updated.localeCompare(first.updated)
      })
  }, [activeTab, query, sortOrder])

  return (
    <main className="author-dashboard">
      <header className="author-topbar">
        <nav className="author-breadcrumb" aria-label="Navegação estrutural">
          <Link to="/home">Área do autor</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Meus cursos</span>
        </nav>
        <p className="author-greeting">Olá, Marina</p>
      </header>

      <div className="author-content">
        <header className="author-heading">
          <div>
            <p className="author-eyebrow">MEU ESPAÇO DE CRIAÇÃO</p>
            <h1>Meus cursos</h1>
            <p className="author-subtitle">Gerencie suas capacitações e compartilhe o que você sabe.</p>
          </div>
          <Link className="author-new-course" to="/indicar-curso">
            <Plus size={16} aria-hidden="true" />
            Novo curso
          </Link>
        </header>

        <section className="author-stats" aria-label="Resumo dos cursos">
          <article className="author-stat">
            <div className="author-stat-top"><strong>6</strong><BookOpen size={16} aria-hidden="true" /></div>
            <p>Total de cursos</p>
          </article>
          <article className="author-stat">
            <div className="author-stat-top"><strong>4</strong><UsersRound size={16} aria-hidden="true" /></div>
            <p>Publicados</p>
          </article>
          <article className="author-stat">
            <div className="author-stat-top"><strong>2</strong><Pencil size={16} aria-hidden="true" /></div>
            <p>Rascunhos</p>
          </article>
          <article className="author-stat">
            <div className="author-stat-top"><strong>1.248</strong><UsersRound size={16} aria-hidden="true" /></div>
            <p>Alunos inscritos</p>
          </article>
        </section>

        <section className="author-course-section" aria-label="Seus cursos">
          <div className="author-toolbar">
            <nav className="author-tabs" aria-label="Filtrar cursos por status">
              {tabs.map((tab) => (
                <button
                  className={`author-tab${activeTab === tab.value ? " author-tab-active" : ""}`}
                  type="button"
                  key={tab.value}
                  aria-pressed={activeTab === tab.value}
                  onClick={() => setActiveTab(tab.value)}
                >
                  {tab.label}<span>{tab.count}</span>
                </button>
              ))}
            </nav>
            <label className="author-search">
              <Search size={16} aria-hidden="true" />
              <span className="visually-hidden">Buscar curso</span>
              <input
                type="search"
                placeholder="Buscar curso..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          </div>

          <div className="author-list-heading">
            <p aria-live="polite">
              {visibleCourses.length} {visibleCourses.length === 1 ? "curso cadastrado" : "cursos cadastrados"}
            </p>
            <label className="author-sort">
              <span className="visually-hidden">Ordenar cursos</span>
              <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                <option value="recentes">Mais recentes</option>
                <option value="titulo">Ordem alfabética</option>
              </select>
              <ChevronDown size={14} aria-hidden="true" />
            </label>
          </div>

          {visibleCourses.length > 0 ? (
            <ul className="author-course-grid" aria-live="polite">
              {visibleCourses.map((course) => (
                <li key={course.title}>
                  <article className={`author-course-card tone-${course.tone}`}>
                    <header className="author-course-cover">
                      <div>
                        <p>{course.category}</p>
                        <h2>{course.title}</h2>
                      </div>
                      <strong aria-hidden="true">{course.initials}</strong>
                      <span className="author-course-index">{course.number}</span>
                    </header>
                    <div className="author-course-body">
                      <div className="author-course-status-row">
                        <span className={`author-course-status${course.status === "Rascunho" ? " status-draft" : ""}`}>
                          {course.status}
                        </span>
                        <Ellipsis className="author-more" size={18} aria-hidden="true" />
                      </div>
                      {course.status === "Publicado" ? (
                        <>
                          <p className="author-course-description">{course.summary}</p>
                          <div className="author-course-meta">
                            <span><BookOpen size={13} aria-hidden="true" /> {course.lessons} aulas</span>
                            <span><UsersRound size={13} aria-hidden="true" /> {course.students.toLocaleString("pt-BR")} alunos</span>
                          </div>
                        </>
                      ) : (
                        <div className="author-progress">
                          <div className="author-progress-label"><span>{course.lessons} aulas adicionadas</span><span>{course.progress}% concluído</span></div>
                          <div className="author-progress-track" role="progressbar" aria-label={`Progresso de ${course.title}`} aria-valuenow={course.progress} aria-valuemin={0} aria-valuemax={100}>
                            <span style={{ width: `${course.progress}%` }} />
                          </div>
                        </div>
                      )}
                      <footer className="author-course-footer">
                        <Link to="/cursos">{course.status === "Publicado" ? "Gerenciar curso" : "Continuar edição"}</Link>
                        {course.status === "Rascunho" && <CalendarDays size={14} aria-label="Rascunho em edição" />}
                        {course.status === "Publicado" && <ArrowRight size={15} aria-hidden="true" />}
                      </footer>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p className="author-empty-state" role="status">Nenhum curso encontrado. Tente outro termo ou filtro.</p>
          )}

          <footer className="author-results-footer">
            <p>Mostrando {visibleCourses.length ? 1 : 0}–{visibleCourses.length} de {visibleCourses.length} cursos</p>
            <p>Feito para ensinar. Criado por você.</p>
          </footer>
        </section>
      </div>
    </main>
  )
}
