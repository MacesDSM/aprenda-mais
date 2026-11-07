import { useState } from "react";
import { UsuarioService } from "../../service";
import { Eye, EyeOff, LockKeyhole, IdCard } from "lucide-react";
import styles from "./login.module.css";

function logar(event) {
    const service = new UsuarioService();

    const dados = service.getFormObject(event);

    const logado = service.logar(dados);
    if(logado) {
        window.alert(`Conta logada com sucesso!`);
    } else {
        window.alert("Login ou senha inválidos")
    }

    event.preventDefault();
}

export function Login() {
    const [verSenha, setVerSenha] = useState(false);

    function toggleVerSenha() {
        setVerSenha(prev=>!prev);
    }

    return (
        <section className={styles.main}>
            <div className={styles.painel}>
                <div className={styles.painelEsquerda}>
                    <p className="text-md">Conheça +</p>
                    <div className={styles.painelEsquerdaInfo}>
                        <p className="text-lg font-medium">Capacitação aberta, pública e gratuita.</p>
                        <p className="text-md font-light">
                            Conecte-se aos maiores portais de certificação governamental, tecnologia
                            aplicada e desenvolvimento pessoal do país.
                        </p>
                        <div className={styles.painelCard}>
                            <p className="text-sm font-medium">Diversos cursos 100% gratuitos!</p>
                            <p className="text-xs">Emitidos por universidades e órgãos oficiais e verificados.</p>
                        </div>
                        <div className={styles.painelCard}>
                            <p className="text sm font-medium">Certificados Reconhecidos</p>
                            <p className="text-xs">Validação instantânea para concursos e progressão de carreira.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.painelDireita}>
                    <div>
                        <div>
                            <p className="text-md font-semibold">Acesse sua conta</p>
                            <p className="text-sm font-light">Continue seus estudos gratuitos e acompanhe suas indicações de cursos.</p>
                        </div>
                        <form onSubmit={logar}>
                            <div className={styles.formField}>
                                <p className="font-medium">Email</p>
                                <div className="input-group">
                                    <IdCard className="icon" />
                                    <input name="email" className="input" type="email" placeholder="seu.email@exemplo.com" />
                                </div>
                            </div>
                            <div className={styles.formField}>
                                <p className="font-medium">Senha</p>
                                <div className="input-group">
                                    <LockKeyhole className="icon"/>
                                    <input name="senha" className="input" type={verSenha?"text":"password"} placeholder="Digite sua senha de acesso" />
                                    <button type="button" className="button-icon button-icon-secondary" onClick={toggleVerSenha}>
                                        {verSenha ? <EyeOff size={18}/> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="button button-teriary">
                                <p className="text-sm font-medium">Entrar na plataforma</p>
                            </button>
                        </form>
                    </div>
                    <div className={styles.cadastroInfo}>
                        <p className="text-sm text-secondary-600">Ainda não tem cadastro?</p>
                        <a href="/cadastro">Crie sua conta gratuita em menos de 1 minuto</a>
                    </div>
                </div>
            </div>
        </section>
    );
}