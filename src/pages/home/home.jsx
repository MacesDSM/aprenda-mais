import { useState } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  ChevronRight,
  CircleHelp,
  Code2,
  GraduationCap,
  HeartPulse,
  Info,
  Palette,
  Search,
  SquareTerminal,
  Star,
  WalletCards,
  Landmark,
  Rocket,
  UserRound,
  UsersRound,
} from "lucide-react"
import { Link } from "react-router"
import "./home.css"
import { Footer, Navbar } from "../../components"
import { HeroHome } from "./HeroHome"
import { CategoriaCursoService } from "../../service"
import { CategoriaHome } from "./CategoriaHome/CategoriaHome"

/**
 * const categories = [
  { name: "Tecnologia & Dados", filter: "Tecnologia", description: "Programação, dados e novas tecnologias para o futuro.", icon: SquareTerminal, tone: "blue" },
  { name: "Educação Financeira", filter: "Finanças", description: "Aprenda a cuidar do seu dinheiro e planejar seus sonhos.", icon: WalletCards, tone: "orange" },
  { name: "Setor Público & Gov.br", filter: "Setor Público", description: "Oportunidades e formação para transformar o setor público.", icon: Landmark, tone: "green" },
  { name: "Empreendedorismo", filter: "Empreendedorismo", description: "Tire suas ideias do papel e faça seu negócio crescer.", icon: Rocket, tone: "red" },
]
 */

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

const developerBenefits = [
  { icon: Code2, title: "Como Funciona a Curadoria", description: "Uma introdução prática para entender os fundamentos da programação.", tone: "blue" },
  { icon: BriefcaseBusiness, title: "Sem Pegadinhas ou Taxas", description: "Cursos gratuitos, com informações claras e sem custos escondidos.", tone: "purple" },
  { icon: Palette, title: "Desenvolvimento Voluntário", description: "Uma iniciativa feita por pessoas que acreditam na educação para todos.", tone: "orange" },
]

const courseFilters = ["Todos", "Tecnologia", "Finanças", "Empreendedorismo", "Setor Público"]


// Padroniza acentos e caixa para que buscas como "financas" encontrem "Finanças".
function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
}

const categoriaService = new CategoriaCursoService();

export function Home() {
  // O termo aplicado fica separado do texto digitado para permitir buscar ao enviar o formulário.
  const [query, setQuery] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("Todos")

  // Aplica categoria e texto simultaneamente sem alterar a lista original de cursos.
  const visibleCourses = courses.filter((course) => {
    const matchesFilter = activeFilter === "Todos" || course.category === activeFilter
    const searchableText = normalizeText(
      `${course.title} ${course.provider} ${course.category} ${course.description} ${course.level}`,
    )
    return matchesFilter && searchableText.includes(searchTerm)
  })

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
  const categories = categoriaService.findAll();
  
  return (
    <section className="home-page" aria-label="Página inicial">
      <Navbar applySearch={applySearch} query={query} setQuery={setQuery}/>

      <main>
        <HeroHome />

        <CategoriaHome />        

        {/* Os filtros e resultados compartilham o mesmo estado de busca da página. */}
        <section className="courses-section content-width" id="cursos" aria-labelledby="courses-title">
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
                      <strong className="free-label">Gratuito</strong>
                    </header>
                    <p className={`course-category category-label-${course.tone}`}>{course.category}</p>
                    <h3>{course.title}</h3>
                    <p className="course-description">{course.description}</p>
                    <footer className="course-meta">
                      <p><BadgeCheck size={14} aria-hidden="true" /> {course.level}</p>
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

        <section className="about-section content-width" id="sobre" aria-labelledby="about-title">
          <header className="section-heading about-heading">
            <section>
              <p className="eyebrow">UM PROJETO FEITO PARA COMPARTILHAR</p>
              <h2 id="about-title">Sobre o Projeto & Desenvolvedores</h2>
              <p>Conheça uma iniciativa que acredita no poder da educação para transformar vidas.</p>
            </section>
            <p className="team-badge"><HeartPulse size={15} aria-hidden="true" /> Feito com propósito</p>
          </header>

          <ul className="benefit-grid">
            {developerBenefits.map(({ icon: Icon, title, description, tone }) => (
              <li key={title}>
                <article className="benefit-card">
                  <figure className={`icon-badge benefit-icon benefit-${tone}`} aria-hidden="true"><Icon size={19} /></figure>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              </li>
            ))}
          </ul>

          <aside className="question-callout">
            <figure className="question-icon" aria-hidden="true"><CircleHelp size={18} /></figure>
            <article className="question-copy">
              <strong>Quer conhecer melhor nossa iniciativa?</strong>
              <p>Saiba mais sobre o projeto, nossa missão e quem faz parte dele.</p>
            </article>
            <Link className="callout-action" to="/sobre">Conheça o Aprenda Mais <ArrowRight size={14} aria-hidden="true" /></Link>
          </aside>
        </section>

        <section className="final-cta content-width" aria-labelledby="final-cta-title">
          <article>
            <p className="eyebrow">SUA PRÓXIMA CONQUISTA COMEÇA AQUI</p>
            <h2 id="final-cta-title">Conhece uma oportunidade gratuita que pode ajudar alguém?</h2>
            <p>Indique um curso e ajude mais pessoas a encontrarem novos caminhos.</p>
          </article>
          <Link className="button button-primary" to="/cursos">Indicar um curso gratuito <ArrowRight size={16} aria-hidden="true" /></Link>
        </section>
      </main>

      <Footer />
    </section>
  )
}
