/*
Muitas funções precisam de conexões das quais eu não soube fazer,
a maioria das funcionalidasdes utilizam dados temporários,
se tiverem tempo para revisar o código e ajustar essas questões!
*/




import { useState } from "react";
import { Link } from "react-router";
import {
    Camera, CirclePlus, UserRoundPen, BadgeCheck, Clock, CircleArrowRight, Link2, UsersRound,
} from "lucide-react";
import { UsuarioService } from "../../service";
import "./perfil.css";

// Dados temporários; substituir pelos dados do serviço quando estiver disponível.
const cursosEmAndamento = [
    {
        id: 1,
        titulo: "Lógica de programação",
        categoria: "Programação",
        plataforma: "IFSP",
        resumo: "Fundamentos de lógica, algoritmos e programação para iniciantes.",
        progresso: 75,
        modulosRestantes: 2,
        ultimaAtividade: "Há 3 dias",
    },
    {
        id: 2,
        titulo: "Proteção de dados",
        categoria: "Privacidade e cidadania",
        plataforma: "Santander Open Academy",
        resumo: "Conceitos essenciais para proteger dados pessoais e navegar com segurança.",
        progresso: 20,
        modulosRestantes: 4,
        ultimaAtividade: "Há 1 dia",
    },
];

const cursosIndicados = [
    {
        id: 1,
        titulo: "Python para Automação de Processos",
        plataforma: "coursera.org/usp",
        descricao: "Curso prático de automação para estudantes brasileiros.",
        impacto: "420 estudantes",
    },
];

export function Perfil() {
    const [foto, definirFoto] = useState("");
    const usuario = new UsuarioService().getUsuarioLogado();

    function selecionarFoto(evento) {
        const arquivo = evento.target.files[0];

        // URL temporária. 
        if (arquivo) definirFoto(URL.createObjectURL(arquivo));
    }

    const resumos = [
        { id: "em-andamento", titulo: "Em andamento", quantidade: usuario?.cursosEmAndamento ?? 0,
          descricao: "Cursos ativos hoje" },
        { id: "indicados", titulo: "Indicados por você", quantidade: usuario?.cursosIndicados ?? 0,
          descricao: "Contribuições à comunidade" },
        { id: "salvos", titulo: "Salvos / Favoritos", quantidade: usuario?.cursosSalvos ?? 0,
          descricao: "Trilhas na sua lista" },
        { id: "certificados", titulo: "Certificados emitidos", quantidade: usuario?.certificadosEmitidos ?? 0,
          descricao: "Comprovantes válidos" },
    ];

    return (
        <>
            <header>
                <nav className="perfil-navegacao" aria-label="Navegação principal">
                    <ul>
                        <li><Link to="/cursos">Cursos gratuitos</Link></li>
                        <li><Link to="/perfil">Área de Estudo</Link></li>
                        <li><Link to="/indicar">Indicar Curso</Link></li>
                        <li><Link to="/sobre">Sobre o portal</Link></li>
                    </ul>
                </nav>
            </header>

        <main>
            <section className="perfil-resumo" aria-label="Resumo do perfil">
                <div className="perfil-informacoes">
                    <div className="perfil-foto">
                        {foto && (
                            <img src={foto} alt="Prévia da foto de perfil" width="140" height="140" />
                        )}

                        <span className="perfil-selo-foto" aria-hidden="true">
                            <BadgeCheck size={20} strokeWidth={2.5} />
                        </span>

                        <label htmlFor="foto-perfil" aria-label="Escolher foto">
                            <Camera size={16} aria-hidden="true" />
                        </label>
                        <input
                            id="foto-perfil"
                            type="file"
                            accept="image/*"
                            onChange={selecionarFoto}
                        />
                    </div>

                    <div className="perfil-dados">
                        <div className="perfil-titulo-usuario">
                            <h1>Olá, {usuario?.nome ?? "usuário"}!</h1>
                            <span className="perfil-situacao">Estudante ativa</span>
                        </div>
                        <p>{usuario?.email ?? "email não disponível"}</p>

                        <button className="perfil-botao-editar" type="button">
                            <UserRoundPen size={16} aria-hidden="true" />
                            Editar perfil
                        </button>
                    </div>
                </div>

                <section className="perfil-cartoes-resumo" aria-label="Resumo dos cursos">
                    {resumos.map((resumo) => (
                        <article className="perfil-cartao-resumo" key={resumo.id}>
                            <h2>{resumo.titulo}</h2>
                            <p>{resumo.quantidade}</p>
                            <p>{resumo.descricao}</p>
                        </article>
                    ))}
                </section>
            </section>

            <section className="perfil-cursos-em-andamento" aria-label="Cursos em andamento">
                   <h2> Continue estudando!</h2>
                   <p>Retome rapidamente de onde parou com links diretos aos portais oficiais parceiros.</p>
                    {cursosEmAndamento.map((curso) => (
                       <article
                           className="perfil-cartao-curso perfil-cartao-curso-andamento"
                           key={curso.id}
                       >
                           <div className="perfil-cabecalho-curso">
                               <span className="perfil-categoria-curso">
                                   {curso.categoria}
                               </span>
                               <span className="perfil-plataforma-curso">
                                  
                                   {curso.plataforma}
                               </span>
                           </div>
                            <h3>{curso.titulo}</h3>
                           <p className="perfil-resumo-curso">{curso.resumo}</p>
                            <div className="perfil-progresso">
                               <div className="perfil-cabecalho-progresso">
                                   <span className="perfil-texto-progresso">
                                       {curso.progresso}% Concluído
                                   </span>
                                   <span className="perfil-modulos-restantes">
                                       {curso.modulosRestantes} módulos restantes
                                   </span>
                               </div>
                                <div
                                    className="perfil-barra-progresso"
                                    role="progressbar"
                                    aria-label={`Progresso no curso ${curso.titulo}`}
                                    aria-valuenow={curso.progresso}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                   aria-valuetext={`${curso.progresso}% concluído`}
                                >
                                    <span
                                        className="perfil-progresso-atual"
                                        style={{ width: `${curso.progresso}%` }}
                                    />
                                </div>
                            </div>
                           <div className="perfil-rodape-curso">
                               <span className="perfil-atividade-recente">
                                   <Clock size={16} aria-hidden="true" />
                                   {curso.ultimaAtividade}
                               </span>

                              {/* Clicáveis porém sem destino definido. Deve redirecionar para o curso do card.*/}
                               <button
                                   className="perfil-botao-continuar"
                                   type="button"
                               >
                                   Continuar
                                   <CircleArrowRight size={18} aria-hidden="true" />
                               </button>
                           </div>
                       </article>
                    ))}
                </section>


            <section className="perfil-cursos-indicados" aria-label="Cursos indicados por você">
                   <Link to="/indicar" className="perfil-botao-indicar-curso">
                       <CirclePlus size={13} aria-hidden="true" />Indicar novo curso
                   </Link>
                   <h2> Cursos Indicados por Você </h2>
                   <p>Cursos e trilhas gratuitas que você recomendou para a comunidade!</p>
                    {cursosIndicados.map((curso) => (
                       <article
                           className="perfil-cartao-curso perfil-cartao-curso-indicado"
                           key={curso.id}
                       >
                           <div className="perfil-cabecalho-curso-indicado">
                               <span className="perfil-situacao-curso">
                                   <BadgeCheck size={14} aria-hidden="true" />
                                   No Catálogo
                               </span>
                               <span className="perfil-codigo-curso">
                                   #{curso.id}
                               </span>
                           </div>
                            <h3>{curso.titulo}</h3>
                           <span className="perfil-endereco-curso">
                               <Link2 size={16} aria-hidden="true" />
                               {curso.plataforma}
                           </span>
                           <p className="perfil-descricao-curso">{curso.descricao}</p>
                            <div className="perfil-impacto-curso">
                               <UsersRound size={18} aria-hidden="true" />
                               <strong>Impacto:</strong>
                               <span>{curso.impacto}</span>
                            </div>
                       </article>
                    ))}
                </section>

        </main>

        <footer className="perfil-rodape">
            <div className="perfil-rodape-conteudo">
                <div className="perfil-rodape-apresentacao">
                    <p>
                        Curadoria cidadã de capacitação pública, tecnologia e formação
                        profissional totalmente gratuita.
                    </p>
                </div>

                <nav className="perfil-rodape-coluna" aria-label="Navegação do rodapé">
                    <h2>Navegação</h2>
                    <ul>
                        <li><Link to="/cursos">Cursos gratuitos</Link></li>
                        <li><Link to="/perfil">Área de Estudo</Link></li>
                        <li><span>Certificados válidos</span></li>
                    </ul>
                </nav>

                <nav className="perfil-rodape-coluna" aria-label="Comunidade">
                    <h2>Comunidade</h2>
                    <ul>
                        {/* Destinos sem rota definida; temporariamente não clicáveis. */}
                        <li><Link to="/indicar">Indicar novo curso</Link></li>
                        <li><span>Critérios de curadoria</span></li>
                        <li><span>Diretrizes de qualidade</span></li>
                        <li><span>Fale com a equipe</span></li>
                    </ul>
                </nav>

                <section className="perfil-rodape-coluna" aria-labelledby="perfil-rodape-civico">
                    <h2 id="perfil-rodape-civico">Compromisso cívico</h2>
                    <p>
                        Iniciativa aberta e sem custos ocultos para democratizar o
                        conhecimento prático em todo o Brasil.
                    </p>
                    <strong className="perfil-rodape-selo">100% livre de cobranças</strong>
                </section>
            </div>

            <nav className="perfil-rodape-links-legais" aria-label="Informações legais">

                <ul>
                    {/* Destinos sem rota definida; temporariamente não clicáveis. */}
         
                    <li><span>Privacidade</span></li>
                    <li><span>Termos de uso</span></li>
                    <li><span>Acessibilidade</span></li>
                </ul>
            </nav>
        </footer>
      </>
    )
}