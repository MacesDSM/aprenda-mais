import styles from "./login.module.css";

function login(req) {
    

    //

    service.save({nome: "TEste", email: "123456"});
}


export function Login() {

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
                            <p className="text-md font-medium">Acesse sua conta</p>
                            <p className="text-sm font-light">Continue seus estudos gratuitos e acompanhe suas indicações de cursos.</p>
                        </div>
                        <form>
                            <div className={styles.formField}>
                                <p>Email</p>
                                <input type="text" placeholder="seu.email@exemplo.com" />
                            </div>
                            <div className={styles.formField}>
                                <p>Senha</p>
                                <input type="password" placeholder="Digite sua senha de acesso" />
                            </div>
                            <button>Entrar na plataforma</button>
                        </form>
                    </div>
                    <div className={styles.cadastroInfo}>
                        <p>Ainda não tem cadastro?</p>
                        <a href="/cadastro">Crie sua conta gratuita em menos de 1 minuto</a>
                    </div>
                </div>
            </div>
        </section>
    );
}