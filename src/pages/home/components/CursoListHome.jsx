import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { useState } from "react";

const courses = [
  {
    title: "Fundamentos de Lógica de Programação",
    provider: "Fundação Bradesco",
    category: "Tecnologia",
    duration: "18 horas",
    level: "Iniciante",
    description: "Aprenda a estruturar o pensamento lógico e dar os primeiros passos na programação.",
    tone: "blue",
  },
  {
    title: "Linguagem de Programação Python",
    provider: "Plataforma Escola do Trabalhador 4.0",
    category: "Tecnologia",
    duration: "40 horas",
    level: "Iniciante",
    description: "Conheça os fundamentos de Python e desenvolva seus primeiros programas.",
    tone: "purple",
  },
  {
    title: "Como Organizar o Orçamento Familiar",
    provider: "Escola Virtual Gov",
    category: "Finanças",
    duration: "20 horas",
    level: "Iniciante",
    description: "Organize as contas da casa e construa uma relação mais saudável com o dinheiro.",
    tone: "orange",
  },
  {
    title: "Marketing Digital para Pequenos Negócios",
    provider: "Sebrae",
    category: "Empreendedorismo",
    duration: "12 horas",
    level: "Iniciante",
    description: "Use estratégias digitais para divulgar seu negócio e chegar a novos clientes.",
    tone: "pink",
  },
  {
    title: "Inteligência Artificial Responsável",
    provider: "Microsoft & LinkedIn",
    category: "Tecnologia",
    duration: "8 horas",
    level: "Intermediário",
    description: "Entenda os princípios para usar inteligência artificial de forma consciente.",
    tone: "green",
  },
  {
    title: "Desvendando a Indústria 4.0 e Internet das Coisas",
    provider: "SENAI",
    category: "Tecnologia",
    duration: "15 horas",
    level: "Iniciante",
    description: "Explore as tecnologias que estão mudando a indústria e o nosso cotidiano.",
    tone: "blue",
  },
]

// Padroniza acentos e caixa para que buscas como "financas" encontrem "Finanças".
function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
}

const courseFilters = ["Todos", "Tecnologia", "Finanças", "Empreendedorismo", "Setor Público"];

export function CursoListHome(){
    const [activeFilter, setActiveFilter] = useState("Todos");
    const [query, setQuery] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

      function applySearch(event) {
        event.preventDefault()
        setSearchTerm(normalizeText(query.trim()))
        setActiveFilter("Todos")
        document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" })
      }
    
      function selectPopularSearch(term) {
        setQuery(term)
        setSearchTerm(normalizeText(term))
        setActiveFilter("Todos")
        document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" })
      }
    
    // Aplica categoria e texto simultaneamente sem alterar a lista original de cursos.
    const visibleCourses = courses.filter((course) => {
        const matchesFilter = activeFilter === "Todos" || course.category === activeFilter
        const searchableText = normalizeText(
        `${course.title} ${course.provider} ${course.category} ${course.description} ${course.level}`,
        )
        return matchesFilter && searchableText.includes(searchTerm)
    })

    return(
        <section className="courses-section content-width" id="cursos" aria-labelledby="courses-title">
          {/* Os filtros e resultados compartilham o mesmo estado de busca da página. */}
          <header className="section-heading courses-heading">
            <section>
              <p className="eyebrow">APRENDA NO SEU TEMPO</p>
              <h2 id="courses-title">Capacitações com inscrição imediata</h2>
              <p>Encontre seu próximo passo entre cursos gratuitos de instituições confiáveis.</p>
            </section>
            <Link className="text-link" to="/cursos">Ver todos os cursos <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </header>

          <nav className="filter-row" aria-label="Filtrar cursos por categoria">
            {courseFilters.map((category) => (
              <button
                type="button"
                key={category}
                className={`filter-chip${activeFilter === category ? " filter-chip-active" : ""}`}
                aria-pressed={activeFilter === category}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
            <p className="course-count" aria-live="polite">
              {visibleCourses.length} {visibleCourses.length === 1 ? "curso" : "cursos"} em destaque
            </p>
          </nav>

          {visibleCourses.length > 0 ? (
            <ul className="course-grid" aria-live="polite">
              {visibleCourses.map((course) => (
                <li key={course.title}>
                  <article className="course-card">
                    <header className="course-card-top">
                      <figure className={`icon-badge provider-icon provider-${course.tone}`} aria-hidden="true"><BookOpen size={17} /></figure>
                      <p className="course-provider">{course.provider}</p>
                    </header>
                    <p className={`course-category category-label-${course.tone}`}>{course.category}</p>
                    <h3>{course.title}</h3>
                    <p className="course-description">{course.description}</p>
                    <footer className="course-meta">
                      <p>{course.duration}</p>
                    </footer>
                    <Link className="course-link" to="/cursos">Ver detalhes <ArrowRight size={15} aria-hidden="true" /></Link>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state" role="status">Nenhum curso encontrado. Tente outro termo ou categoria.</p>
          )}
        </section>
    )
}