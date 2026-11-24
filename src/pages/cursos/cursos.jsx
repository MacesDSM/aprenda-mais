/* Cards precisam ser modificados. Alguns botões precisam ser modificados */

/*Pesquise: Botões temporariamente indisponíveis. 
Alterar quando tiverem destino.
/* Pesquise: Cards demonstrativos.*/



import { useState } from "react";
import { Link } from "react-router";
import { CursoService } from "../../service/CursoService.mjs";
import {
  ArrowDownUp, BadgeCheck, ChevronLeft, ChevronRight, CirclePlus,Clock3, ExternalLink, Globe, GraduationCap, Info,Search, Send, Star,
} from "lucide-react";
import "./cursos.css";
import { Navbar } from "../../components";

  /* Cards demonstrativos.*/

const cursos = [
  {
    id: 1,
    titulo: "Introdução à Ciência de Dados e IA no Setor Público",
    categoria: "Tecnologia & Dados",
    plataforma: "Enap / EV.G",
    resumo:
      "Apresenta os fundamentos essenciais de análise preditiva, princípios éticos para uso de inteligência artificial governamental e repositórios abertos de dados públicos.",
    horasdecurso: 40,
    certificado: "EAD Online",
    modalidade: "Autoinstrucional",
    link: "https://www.gov.br/",
    cor: "azul",
  },
  {
    id: 2,
    titulo: "Lei Geral de Proteção de Dados (LGPD) e Direitos do Cidadão",
    categoria: "Gov.br & Cidadania",
    plataforma: "Gov.br / SGD",
    resumo:
      "Explica os direitos fundamentais de privacidade e autodeterminação informativa no ambiente digital, requisitos para tratamento de dados e diretrizes de conformidade jurídica.",
    horasdecurso: 25,
    certificado: "EAD Online",
    modalidade: "Ritmo livre",
    link: "https://www.gov.br/",
    cor: "verde",
  },
  {
    id: 3,
    titulo: "Gestão Financeira Descomplicada para Novos Negócios",
    categoria: "Finanças & Negócios",
    plataforma: "Sebrae Nacional",
    resumo:
      "Capacitação prática orientada a controle de fluxo de caixa, precificação com margem real, divisão de despesas de pessoa física e jurídica e regularização fiscal descomplicada.",
    horasdecurso: 15,
    certificado: "EAD Online",
    modalidade: "Autoinstrucional",
    link: "https://sebrae.com.br/",
    cor: "laranja",
  },
  {
    id: 4,
    titulo: "Fundamentos de Programação Web: HTML5, CSS & JS Moderno",
    categoria: "Tecnologia & Dados",
    plataforma: "MEC / IFSP & Pronatec",
    resumo:
      "Ensina a codificar páginas web modernas a partir do zero, abrangendo acessibilidade, responsividade, semântica web e noções de lógica com JavaScript nativo.",
    horasdecurso: 60,
    certificado: "Certificado Grátis",
    modalidade: "Autoinstrucional",
    link: "https://www.gov.br/",
    cor: "azul",
  },
  {
    id: 5,
    titulo: "Inglês para o Ambiente de Trabalho",
    categoria: "Idiomas",
    plataforma: "Escola Virtual Gov",
    resumo:
      "Pratique vocabulário e situações comuns da comunicação profissional em inglês.",
    horasdecurso: 20,
    certificado: "Certificado Grátis",
    modalidade: "Ritmo livre",
    link: "https://www.escolavirtual.gov.br/",
    cor: "roxo",
  },
  {
    id: 6,
    titulo: "Cidadania Digital e Segurança na Internet",
    categoria: "Gov.br & Cidadania",
    plataforma: "Enap / EV.G",
    resumo:
      "Conheça práticas para proteger seus dados, reconhecer riscos digitais e exercer sua cidadania na internet.",
    horasdecurso: 10,
    certificado: "EAD Online",
    modalidade: "Autoinstrucional",
    link: "https://www.gov.br/",
    cor: "verde",
  },
  {
    id: 7,
    titulo: "Planejamento Financeiro Pessoal",
    categoria: "Finanças & Negócios",
    plataforma: "Sebrae Nacional",
    resumo:
      "Aprenda a organizar o orçamento, definir objetivos financeiros e planejar os próximos passos.",
    horasdecurso: 12,
    certificado: "Certificado Grátis",
    modalidade: "Ritmo livre",
    link: "https://sebrae.com.br/",
    cor: "laranja",
  },
  {
    id: 8,
    titulo: "Lógica de Programação para Iniciantes",
    categoria: "Tecnologia & Dados",
    plataforma: "IFSP",
    resumo:
      "Desenvolva o raciocínio lógico e conheça os primeiros conceitos de algoritmos e programação.",
    horasdecurso: 30,
    certificado: "EAD Online",
    modalidade: "Autoinstrucional",
    link: "https://www.gov.br/",
    cor: "azul",
  },
];

const categorias = [
  "Todos",
  "Gov.br & Cidadania",
  "Tecnologia & Dados",
  "Finanças & Negócios",
  "Idiomas",
];
const cursosPorPagina = 4;

export function Cursos() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [duracaoSelecionada, setDuracaoSelecionada] = useState("todas");
  const [certificadoSelecionado, setCertificadoSelecionado] = useState("todos");
  const [ordemSelecionada, setOrdemSelecionada] = useState("recentes");
  const [paginaAtual, setPaginaAtual] = useState(1);


/* Cards demonstrativos.*/

  const cursosFiltrados = cursos
    .filter((curso) => {
      const textoBusca =
        `${curso.titulo} ${curso.categoria} ${curso.plataforma}`.toLocaleLowerCase(
          "pt-BR",
        );
      const categoriaOk =
        categoriaSelecionada === "Todos" ||
        curso.categoria === categoriaSelecionada;
      const buscaOk = textoBusca.includes(
        busca.trim().toLocaleLowerCase("pt-BR"),
      );
      const duracaoOk =
        duracaoSelecionada === "todas" ||
        (duracaoSelecionada === "curta" && curso.horasdecurso <= 20) ||
        (duracaoSelecionada === "media" &&
          curso.horasdecurso > 20 &&
          curso.horasdecurso <= 40) ||
        (duracaoSelecionada === "longa" && curso.horasdecurso > 40);
      const certificadoOk =
        certificadoSelecionado === "todos" ||
        (certificadoSelecionado === "gratis" &&
          curso.certificado === "Certificado Grátis") ||
        (certificadoSelecionado === "ead" &&
          curso.certificado === "EAD Online");

      return categoriaOk && buscaOk && duracaoOk && certificadoOk;
    })
    .sort((a, b) => {
      if (ordemSelecionada === "menor-duracao") {
        return a.horasdecurso - b.horasdecurso;
      }

      if (ordemSelecionada === "maior-duracao") {
        return b.horasdecurso - a.horasdecurso;
      }

      return a.id - b.id;
    });
    /* Fim cards demonstrativos.*/

  const totalPaginas = Math.max(1, Math.ceil(cursosFiltrados.length / cursosPorPagina));
  const cursosVisiveis = cursosFiltrados.slice(
    (paginaAtual - 1) * cursosPorPagina,
    paginaAtual * cursosPorPagina,
  );
  const primeiroCurso = cursosFiltrados.length
    ? (paginaAtual - 1) * cursosPorPagina + 1
    : 0;
  const ultimoCurso = Math.min(paginaAtual * cursosPorPagina, cursosFiltrados.length);
  const atualizarFiltro = (setter, valor) => {
    setter(valor);
    setPaginaAtual(1);
  };


  function enviarIndicacao(evento) {
    evento.preventDefault();

    const dados = new FormData(evento.currentTarget);
    new CursoService().save({
      titulo: dados.get("titulo"),
      link: dados.get("link"),
      plataforma: dados.get("instituicao"),
      categoria: dados.get("categoria"),
      status: "pendente",
    });

    evento.currentTarget.reset();
    window.alert("Sugestão salva neste navegador.");
  }

  return (
    <div className="pagina-cursos">
      <Navbar />

      <main className="cursos-conteudo">
        <section className="Cursos-resumo-inicio">
          <div className="cartao-cursos-verificado">
            <BadgeCheck size={12} aria-hidden="true" />
            {" "}
            <span>CURADORIA VERIFICADA & SEM FINS LUCRATIVOS</span>
          </div>
          <div className="cursos-introducao">
            <div className="informacoes-curso">
              <h1>Explore Cursos Gratuitos</h1>
              <p>
                Capacitação pública de alto nível com certificações oficiais do
                Gov.br, EV.G, Sebrae, MEC e instituições de ponta.
              </p>
            </div>
            <div className="Botoes-curso-direcionar">
              <Link to="/sobre" className="curso-botao-sobre">
                <Info size={13} aria-hidden="true" />
                {" "}
                Sobre o Projeto & Desenvolvedores
              </Link>
              <Link to="/indicar" className="curso-botao-indicar">
                <CirclePlus size={14} aria-hidden="true" />
                {" "}
                Adicionar Novo Curso
              </Link>
            </div>
          </div>
        </section>

        <section className="Botoes-cursos" aria-label="Filtros de cursos">
          <div className="filtros-categorias">
            {categorias.map((categoria) => {
              const quantidade =
                categoria === "Todos"
                  ? cursos.length
                  : cursos.filter((curso) => curso.categoria === categoria)
                      .length;

              return (
                <button
                  className={`filtro-categoria${categoriaSelecionada === categoria ? " filtro-categoria-ativo" : ""}`}
                  type="button"
                  key={categoria}
                  aria-pressed={categoriaSelecionada === categoria}
                  onClick={() =>
                    atualizarFiltro(setCategoriaSelecionada, categoria)
                  }
                >
                  {categoria}
                  <span>{quantidade}</span>
                </button>
              );
            })}
          </div>
          <div className="filtros-detalhados">
            <label>
              <span className="visualmente-oculto">Filtrar por duração</span>
              <select
                value={duracaoSelecionada}
                onChange={(evento) =>
                  atualizarFiltro(setDuracaoSelecionada, evento.target.value)
                }
              >
                <option value="todas">Duração: Todas</option>
                <option value="curta">Até 20 horas</option>
                <option value="media">De 21 a 40 horas</option>
                <option value="longa">Mais de 40 horas</option>
              </select>
            </label>
            <label>
              <span className="visualmente-oculto">Filtrar por certificado</span>
              <select
                value={certificadoSelecionado}
                onChange={(evento) =>
                  atualizarFiltro(setCertificadoSelecionado, evento.target.value)
                }
              >
                <option value="todos">Certificado: Todos</option>
                <option value="gratis">Certificado Grátis</option>
                <option value="ead">EAD Online</option>
              </select>
            </label>
            <label className="filtro-ordenacao">
              <span className="visualmente-oculto">Ordenar cursos</span>
              <ArrowDownUp size={13} aria-hidden="true" />
              <select
                className="ordenacao-select"
                value={ordemSelecionada}
                onChange={(evento) =>
                  atualizarFiltro(setOrdemSelecionada, evento.target.value)
                }
              >
                <option value="recentes">Mais recentes</option>
                <option value="menor-duracao">Menor duração</option>
                <option value="maior-duracao">Maior duração</option>
              </select>
            </label>
          </div>
        </section>

        <div className="cursos-layout">
          <div className="cursos-coluna-principal">
            <section className="Card-guia" aria-label="Sobre o diretório">
              <span className="guia-icone">
                <Info size={16} aria-hidden="true" />
              </span>
              <div className="guia-conteudo">
                <div className="guia-titulo">
                  <h2>Guia e Diretório Aberto e Gratuito</h2>
                  <span className="cartao-gratuito">100% Livre</span>
                </div>
                <p>
                  <strong>Nosso papel é apenas conectar você:</strong> não
                  hospedamos aulas nem cobramos nada. Você estuda e emite seu
                  certificado direto na fonte oficial!
                </p>
              </div>
            </section>

        {/* Cards demonstrativos.*/}
            <section
              className="grade-cursos"
              aria-label="Cursos gratuitos disponíveis"
              aria-live="polite"
            >
              {cursosVisiveis.length ? (
                cursosVisiveis.map((curso) => (
                  <article
                    className={`cartao-curso`}
                    key={curso.id}
                  >
                    <div className="curso-provedor">
                      <span>
                        <i aria-hidden="true" /> Plataforma Hospedeira:{" "}
                        <strong>{curso.plataforma}</strong>
                      </span>
                      <span className="curso-selo">{curso.certificado}</span>
                    </div>
                    <h2>{curso.titulo}</h2>
                    <div className="curso-resumo">
                      <span className="curso-resumo-titulo">
                        DO QUE SE TRATA ESTE CURSO:
                      </span>
                      <p>{curso.resumo}</p>
                    </div>
                    <div className="curso-metadados">
                      <span>
                        <Clock3 size={12} aria-hidden="true" />
                        {" "}
                        {curso.horasdecurso}h totais
                      </span>
                      <span>
                        <BadgeCheck size={12} aria-hidden="true" />
                        {" "}
                        {curso.modalidade}
                      </span>
                      <span className="curso-gratuito">
                        <BadgeCheck size={12} aria-hidden="true" />
                        {" "}
                        100% Gratuito
                      </span>
                    </div>
                    <a
                      className="diretorio-direcionar"
                      href={curso.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ir para a plataforma oficial{" "}
                      <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  </article>
                ))
              ) : (
                <p className="cursos-vazios">
                  Nenhum curso encontrado com esses filtros. Tente alterar sua
                  busca.
                </p>
              )}
            </section>
            {/* Fim cards demonstrativos.*/}


            <div className="cursos-paginacao">
              <p>
                Mostrando <strong>{primeiroCurso}–{ultimoCurso}</strong> de{" "}
                <strong>{cursosFiltrados.length}</strong> cursos disponíveis
              </p>
              <nav aria-label="Paginação dos cursos">
                <button
                  className="botao-pagina"
                  type="button"
                  aria-label="Página anterior"
                  disabled={paginaAtual === 1}
                  onClick={() => setPaginaAtual(paginaAtual - 1)}
                >
                  <ChevronLeft size={15} aria-hidden="true" />
                </button>
                {Array.from(
                  { length: totalPaginas },
                  (_, indice) => indice + 1,
                ).map((pagina) => (
                  <button
                    className={`botao-pagina${paginaAtual === pagina ? " pagina-ativa" : ""}`}
                    type="button"
                    key={pagina}
                    aria-label={`Página ${pagina}`}
                    aria-current={
                      paginaAtual === pagina ? "page" : undefined
                    }
                    onClick={() => setPaginaAtual(pagina)}
                  >
                    {pagina}
                  </button>
                ))}
                <button
                  className="botao-pagina"
                  type="button"
                  aria-label="Próxima página"
                  disabled={paginaAtual === totalPaginas}
                  onClick={() => setPaginaAtual(paginaAtual + 1)}
                >
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>

          <aside className="cursos-coluna-lateral">
            <section className="card-indicar-curso" aria-labelledby="titulo-indicar-curso">
              <div className="indicacao-cabecalho">
                <div>
                  <span className="indicacao-icone">
                    <CirclePlus size={14} aria-hidden="true" />
                  </span>
                  <h2 id="titulo-indicar-curso">
                    Indicar Curso Gratuito
                  </h2>
                </div>
                <span className="indicacao-colaborativa">Colaborativo</span>
              </div>
              <p className="indicacao-descricao">
                Ajude a comunidade compartilhando capacitações gratuitas e
                oficiais.
              </p>
              <form className="indicacao-form" onSubmit={enviarIndicacao}>
                <div className="indicacao-campos">
                  <div className="indicacao-campo">
                    <label className="indicacao-rotulo" htmlFor="indicacao-titulo">
                      Nome do Curso
                    </label>
                    <input
                      className="indicacao-input"
                      id="indicacao-titulo"
                      name="titulo"
                      type="text"
                      placeholder="Ex: Gestão de Projetos Ágeis"
                      required
                    />
                  </div>
                  <label className="indicacao-rotulo" htmlFor="indicacao-link">
                    Link Oficial Direto
                  </label>
                  <div className="indicacao-link">
                    <Globe size={13} aria-hidden="true" />
                    <input
                      className="indicacao-input"
                      id="indicacao-link"
                      name="link"
                      type="url"
                      placeholder="https://www.gov.br/..."
                      required
                    />
                  </div>
                  <div className="indicacao-linha">
                    <div className="indicacao-campo">
                      <label
                        className="indicacao-rotulo"
                        htmlFor="indicacao-instituicao"
                      >
                        Instituição
                      </label>
                      <input
                        className="indicacao-input"
                        id="indicacao-instituicao"
                        name="instituicao"
                        type="text"
                        placeholder="Ex: Enap, USP"
                        required
                      />
                    </div>
                    <div className="indicacao-campo">
                      <label
                        className="indicacao-rotulo"
                        htmlFor="indicacao-categoria"
                      >
                        Área
                      </label>
                      <select
                        className="indicacao-input"
                        id="indicacao-categoria"
                        name="categoria"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Selecionar
                        </option>
                        {categorias.slice(1).map((categoria) => (
                          <option key={categoria} value={categoria}>
                            {categoria}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <button className="botao-enviar-indicacao" type="submit">
                  Enviar Sugestão
                  <Send size={14} aria-hidden="true" />
                </button>
              </form>
            </section>

            <section className="card-curadoria">
              <div className="curadoria-icone">
                <BadgeCheck size={15} aria-hidden="true" />
              </div>
              <div>
                <h2>Curadoria Humana</h2>
                <p>Sem taxas, sem pegadinhas.</p>
              </div>
              <span>100% Livre</span>
            </section>
          </aside>
        </div>
      </main>

      <footer className="rodape-cursos">
        <div className="rodape-conteudo">
          <div className="rodape-marca">
            <span className="rodape-logo">
              <span className="rodape-simbolo">
                <GraduationCap
                  size={21}
                  strokeWidth={2.4}
                  aria-hidden="true"
                />
              </span>
              <span>
                aprenda<span className="rodape-destaque">+</span>
              </span>
            </span>
            <p> Conhecimento abre portas.<br /> A gente ajuda você a encontrar a sua. </p>
            <span className="rodape-nota">
              <Star size={13} fill="currentColor" aria-hidden="true" />
              {" "}
              Educação acessível para todos
            </span>
          </div>
          <div className="rodape-coluna">
            <strong>Plataforma</strong>
            <Link to="/cursos">Explorar cursos</Link>
            <Link to="/indicar">Indicar um curso</Link>
            <Link to="/sobre">Sobre o projeto</Link>
          </div>
          <div className="rodape-coluna">
              {/*Botões temporariamente indisponíveis.
            Alterar quando tiverem destino.*/}
            <strong>Materiais & Recursos</strong>
            <span>Tecnologia & Dados</span>
            <span>Educação financeira</span>
            <span>Empreendedorismo</span>
          </div>
          <div className="rodape-coluna">
            <strong>Comunidade & Ajuda</strong>
            <Link to="/sobre">Conheça o projeto</Link>
            <Link to="/indicar">Compartilhe oportunidades</Link>
            <Link to="/perfil">Acesse sua conta</Link>
          </div>
        </div>
        <div className="rodape-final">
          <span>
            © {new Date().getFullYear()} Aprenda Mais. Feito para aprender e
            compartilhar.
          </span>
          <div>
            {/*Botões temporariamente indisponíveis.
            Alterar quando tiverem destino.*/}
            <span>Termos de Uso</span>
            <span>Privacidade</span>
            <span>Acessibilidade</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
