import { useState } from "react";
import { Link } from "react-router";
import {
    Camera, CirclePlus, UserRoundPen, BadgeCheck, Clock, CircleArrowRight, Link2, UsersRound,
} from "lucide-react";
import { EstudanteService, UsuarioService } from "../../service";
import "./perfil.css";
import { Footer, Navbar } from "../../components";

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

const usuarioService = new UsuarioService();
const estudanteService = new EstudanteService();

export function Perfil() {
    const usuario = usuarioService.findById(usuarioService.getUsuarioLogado()?.id);

    const estudante = estudanteService.findById(usuario.id);

    console.log(estudante.cursos);
    return (
        <>
        <Navbar />
        <main>
            <section className="perfil-resumo" aria-label="Resumo do perfil">
                <div className="perfil-informacoes">
                    <div className="perfil-dados">
                        <div className="perfil-titulo-usuario">
                            <h1>Olá, {usuario?.nome ?? "usuário"}!</h1>
                            <span className="perfil-situacao">Estudante ativo(a)</span>
                        </div>
                        <p>{usuario?.email ?? "email não disponível"}</p>

                        <button className="perfil-botao-editar" type="button">
                            <UserRoundPen size={16} aria-hidden="true" />
                            Editar perfil
                        </button>
                    </div>
                </div>

                <section className="perfil-cartoes-resumo" aria-label="Resumo dos cursos">
                    <article className="perfil-cartao-resumo">
                        <p className="text-sm font-medium">Cursos Salvos</p>
                        <p>0</p>
                    </article>
                </section>
            </section>

            <section className="perfil-cursos-em-andamento" aria-label="Cursos em andamento">
                <h2>Cursos Salvos</h2>
                <p>Retome rapidamente de onde parou com links diretos aos portais oficiais parceiros.</p>
                {estudante.cursos.map((curso) => (
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
                {estudante.cursos < 1 && <p>Nenhum curso salvo</p>}
            </section>
        </main>

        <Footer />
      </>
    )
}