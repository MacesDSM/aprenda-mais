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
import { AdminService, AutorService } from "../../service"

const categories = [
  { name: "Tecnologia & Dados", filter: "Tecnologia", description: "Programação, dados e novas tecnologias para o futuro.", icon: SquareTerminal, tone: "blue" },
  { name: "Educação Financeira", filter: "Finanças", description: "Aprenda a cuidar do seu dinheiro e planejar seus sonhos.", icon: WalletCards, tone: "orange" },
  { name: "Setor Público & Gov.br", filter: "Setor Público", description: "Oportunidades e formação para transformar o setor público.", icon: Landmark, tone: "green" },
  { name: "Empreendedorismo", filter: "Empreendedorismo", description: "Tire suas ideias do papel e faça seu negócio crescer.", icon: Rocket, tone: "red" },
]

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
const popularSearches = ["Tecnologia", "Finanças", "Empreendedorismo"]

// Padroniza acentos e caixa para que buscas como "financas" encontrem "Finanças".
function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
}

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

  return (
    <section className="home-page" aria-label="Página inicial">
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
            <Link className="navbar-link navbar-link-wrapped" to="/indicar-curso">Cursos<br />indicados</Link>
            <Link className="navbar-link navbar-link-about" to="/sobre"><UsersRound size={12} aria-hidden="true" /> Sobre o Projeto</Link>
          </nav>
          <nav className="header-actions" aria-label="Conta e indicações">
            <Link className="button button-primary header-signup" to="/indicar-curso">Indicar Curso</Link>
            <Link className="profile-icon" to="/perfil" aria-label="Perfil"><UserRound size={14} aria-hidden="true" /></Link>
          </nav>
        </section>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <article className="hero-content">
            <h1 id="hero-title">Descubra cursos que <strong>iluminam</strong> o<br className="hero-title-break" /> seu caminho.</h1>
            <p className="hero-description">
              O Conheça Mais é uma plataforma comunitária aberta que reúne, organiza e explica cursos
              gratuitos de alta qualidade das melhores instituições públicas do país.
            </p>

            <aside className="hero-notice">
              <Info size={15} aria-hidden="true" />
              <p>
                Não hospedamos nem cobramos por cursos: conectamos você com transparência e links
                diretos às plataformas oficiais (Gov.br, FGV, Sebrae, MEC, etc.).
              </p>
            </aside>

            <form className="course-search" role="search" onSubmit={applySearch}>
              <Search size={19} aria-hidden="true" />
              <input
                className="search-placeholder"
                type="search"
                placeholder="O que você gostaria de aprender? Ex.: Python, finanças..."
                aria-label="O que você gostaria de aprender?"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button className="button button-primary search-button" type="submit">
                Buscar cursos <ArrowRight size={16} aria-hidden="true" />
              </button>
            </form>

            {/* Pesquisas sugeridas aplicam o termo e levam o foco aos resultados. */}
            <section className="popular-searches" aria-label="Pesquisas populares">
              <p>Mais buscados:</p>
              <ul>
                {popularSearches.map((term) => (
                  <li key={term}>
                    <button type="button" onClick={() => selectPopularSearch(term)}>{term}</button>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </section>

        <section className="category-section content-width" aria-label="Categorias de cursos">
          <ul className="category-grid">
            {categories.map(({ name, description, icon: Icon, tone, filter }) => (
              <li key={name}>
                <button
                  className={`category-card category-${tone}`}
                  type="button"
                  onClick={() => {
                    setActiveFilter(filter)
                    setSearchTerm("")
                    setQuery("")
                    document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <figure className="icon-badge category-icon" aria-hidden="true"><Icon size={19} /></figure>
                  <article className="category-copy">
                    <strong>{name}</strong>
                    <p>{description}</p>
                  </article>
                  <ChevronRight className="category-arrow" size={17} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </section>

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
                  <Link className="benefit-link" to="/sobre">Saiba mais <ArrowRight size={14} aria-hidden="true" /></Link>
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
          <Link className="button button-primary" to="/indicar-curso">Indicar um curso gratuito <ArrowRight size={16} aria-hidden="true" /></Link>
        </section>
      </main>

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
              <li><Link to="/indicar-curso">Indicar um curso</Link></li>
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
              <li><Link to="/indicar-curso">Compartilhe oportunidades</Link></li>
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
    </section>
  )
}
