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
import "./home.css"

const categories = [
  {
    name: "Tecnologia & Dados",
    description: "Programação, dados e novas tecnologias para o futuro.",
    icon: SquareTerminal,
    tone: "blue",
  },
  {
    name: "Educação Financeira",
    description: "Aprenda a cuidar do seu dinheiro e planejar seus sonhos.",
    icon: WalletCards,
    tone: "orange",
  },
  {
    name: "Setor Público & Gov.br",
    description: "Oportunidades e formação para transformar o setor público.",
    icon: Landmark,
    tone: "green",
  },
  {
    name: "Empreendedorismo",
    description: "Tire suas ideias do papel e faça seu negócio crescer.",
    icon: Rocket,
    tone: "red",
  },
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
  {
    icon: Code2,
    title: "Como Funciona a Cuidadoria",
    description: "Uma introdução prática para entender os fundamentos da programação.",
    tone: "blue",
  },
  {
    icon: BriefcaseBusiness,
    title: "Sem Pegadinhas ou Taxas",
    description: "Cursos gratuitos, com informações claras e sem custos escondidos.",
    tone: "purple",
  },
  {
    icon: Palette,
    title: "Desenvolvimento Voluntário",
    description: "Uma iniciativa feita por pessoas que acreditam na educação para todos.",
    tone: "orange",
  },
]

export function Home() {
  return (
    <div className="home-page">
      <header className="site-header">
        <div className="header-inner">
          <div className="header-search" aria-label="Buscar cursos e áreas">
            <Search size={14} />
            <span>Buscar cursos, áreas...</span>
            <kbd>/</kbd>
          </div>

          <nav className="main-nav" aria-label="Navegação principal">
            <span className="nav-link nav-link-active">Início</span>
            <span className="nav-link">Cursos Gratuitos</span>
            <span className="nav-link">Área de Aprendizado</span>
            <span className="nav-link nav-link-wrapped">Cursos<br />indicados</span>
            <span className="nav-link nav-link-about"><UsersRound size={12} /> Sobre o Projeto</span>
          </nav>
          <div className="header-actions">
            <span className="button button-primary header-signup">Indicar Curso</span>
            <span className="profile-icon" aria-label="Perfil"><UserRound size={14} /></span>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h1>Descubra cursos que <span>iluminam</span> o<br className="hero-title-break" /> seu caminho.</h1>
            <p className="hero-description">
              O Conheça Mais é uma plataforma comunitária aberta que reúne, organiza e explica cursos
              gratuitos de alta qualidade das melhores instituições públicas do país.
            </p>

            <div className="hero-notice">
              <Info size={15} />
              <span>
                Não hospedamos nem cobramos por cursos: conectamos você com transparência e links
                diretos às plataformas oficiais (Gov.br, FGV, Sebrae, MEC, etc.).
              </span>
            </div>

            <div className="course-search">
              <Search size={19} aria-hidden="true" />
              <span className="search-placeholder">O que você gostaria de aprender? Ex.: Python, finanças...</span>
              <span className="button button-primary search-button">
                Buscar cursos <ArrowRight size={16} />
              </span>
            </div>

            <div className="popular-searches">
              <span>Mais buscados:</span>
              {["Tecnologia", "Finanças", "Empreendedorismo"].map((term) => (
                <span key={term}>{term}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="category-section content-width" aria-label="Categorias de cursos">
          <div className="category-grid">
            {categories.map(({ name, description, icon: Icon, tone }) => (
              <div className={`category-card category-${tone}`} key={name}>
                <span className="category-icon"><Icon size={19} /></span>
                <span className="category-copy">
                  <strong>{name}</strong>
                  <span>{description}</span>
                </span>
                <ChevronRight className="category-arrow" size={17} />
              </div>
            ))}
          </div>
        </section>

        <section className="courses-section content-width">
          <div className="section-heading courses-heading">
            <div>
              <span className="eyebrow">APRENDA NO SEU TEMPO</span>
              <h2>Capacitações com inscrição imediata</h2>
              <p>Encontre seu próximo passo entre cursos gratuitos de instituições confiáveis.</p>
            </div>
            <span className="text-link">Ver todos os cursos <ArrowUpRight size={16} /></span>
          </div>

          <div className="filter-row" aria-label="Filtrar cursos por categoria">
            {["Todos", "Tecnologia", "Finanças", "Empreendedorismo"].map((category, index) => (
              <span key={category} className={`filter-chip${index === 0 ? " filter-chip-active" : ""}`}>
                {category}
              </span>
            ))}
            <span className="course-count">{courses.length} cursos em destaque</span>
          </div>

          <div className="course-grid">
            {courses.map((course) => (
              <article className="course-card" key={course.title}>
                <div className="course-card-top">
                  <span className={`provider-icon provider-${course.tone}`}><BookOpen size={17} /></span>
                  <span className="course-provider">{course.provider}</span>
                  <span className="free-label">Gratuito</span>
                </div>
                <span className={`course-category category-label-${course.tone}`}>{course.category}</span>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span><BadgeCheck size={14} /> {course.level}</span>
                  <span>{course.duration}</span>
                </div>
                <span className="course-link">Ver detalhes <ArrowRight size={15} /></span>
              </article>
            ))}
          </div>
        </section>

        <section className="certificate-banner content-width">
          <div className="banner-icon"><BadgeCheck size={22} /></div>
          <div className="banner-copy">
            <span className="eyebrow">APRENDER TAMBÉM É CONQUISTAR</span>
            <h2>Zero mensalidades. Certificação 100% gratuita.</h2>
            <p>O Aprenda Mais conecta você a cursos de qualidade e certificados reconhecidos, sem pagar nada.</p>
          </div>
          <div className="banner-actions">
            <span className="button button-primary">Encontre seu próximo curso <ArrowRight size={15} /></span>
            <span className="text-link">Explorar categorias</span>
          </div>
        </section>

        <section className="about-section content-width" id="sobre">
          <div className="section-heading about-heading">
            <div>
              <span className="eyebrow">UM PROJETO FEITO PARA COMPARTILHAR</span>
              <h2>Sobre o Projeto & Desenvolvedores</h2>
              <p>Conheça uma iniciativa que acredita no poder da educação para transformar vidas.</p>
            </div>
            <span className="team-badge"><HeartPulse size={15} /> Feito com propósito</span>
          </div>

          <div className="benefit-grid">
            {developerBenefits.map(({ icon: Icon, title, description, tone }) => (
              <article className="benefit-card" key={title}>
                <span className={`benefit-icon benefit-${tone}`}><Icon size={19} /></span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="benefit-link">Saiba mais <ArrowRight size={14} /></span>
              </article>
            ))}
          </div>

          <div className="question-callout">
            <span className="question-icon"><CircleHelp size={18} /></span>
            <span><strong>Quer conhecer melhor nossa iniciativa?</strong><small>Saiba mais sobre o projeto, nossa missão e quem faz parte dele.</small></span>
            <span className="callout-action">Conheça o Aprenda Mais <ArrowRight size={14} /></span>
          </div>
        </section>

        <section className="final-cta content-width">
          <div>
            <span className="eyebrow">SUA PRÓXIMA CONQUISTA COMEÇA AQUI</span>
            <h2>Conhece uma oportunidade gratuita que pode ajudar alguém?</h2>
            <p>Indique um curso e ajude mais pessoas a encontrarem novos caminhos.</p>
          </div>
          <span className="button button-primary">Indicar um curso gratuito <ArrowRight size={16} /></span>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner content-width">
          <div className="footer-brand">
            <span className="brand">
              <span className="brand-mark"><GraduationCap size={21} strokeWidth={2.4} /></span>
              <span>aprenda<span className="brand-highlight">+</span></span>
            </span>
            <p>Conhecimento abre portas.<br />A gente ajuda você a encontrar a sua.</p>
            <span className="footer-note"><Star size={13} fill="currentColor" /> Educação acessível para todos</span>
          </div>
          <div className="footer-column">
            <strong>Plataforma</strong>
            <span>Explorar cursos</span>
            <span>Indicar um curso</span>
            <span>Sobre o projeto</span>
          </div>
          <div className="footer-column">
            <strong>Materiais & Recursos</strong>
            <span>Tecnologia & Dados</span>
            <span>Educação financeira</span>
            <span>Empreendedorismo</span>
          </div>
          <div className="footer-column">
            <strong>Comunidade & Ajuda</strong>
            <span>Conheça o projeto</span>
            <span>Compartilhe oportunidades</span>
            <span>Acesse sua conta</span>
          </div>
        </div>
        <div className="footer-bottom content-width">
          <span>© {new Date().getFullYear()} Aprenda Mais. Feito para aprender e compartilhar.</span>
          <span><span>Termos de uso</span><span>Privacidade</span><span>Acessibilidade</span></span>
        </div>
      </footer>
    </div>
  )
}
