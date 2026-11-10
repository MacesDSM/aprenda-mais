import { Eye, EyeOff, LockKeyhole, IdCard, User } from "lucide-react";
import "./cadastro.css";
import { useState } from "react";
import { AdminService, UsuarioService } from "../../service";

function criarConta(e) {
    e.preventDefault();
    const service = new UsuarioService();

    const dadosForm = service.getFormObject(e);

    if(service.save(dadosForm)) {
        alert("Cadastro concluido com sucesso!");
    }
}

export function Cadastro() {
    const [verSenha, setVerSenha] = useState(false);
    const [verConfirmar, setConfirmar] = useState(false);

    function toggleVerSenha() {
        setVerSenha(prev=>!prev);
    }
        function toggleConfirmar() {
        setConfirmar(prev=>!prev);
    }
    

    


    return (
         <section className="main">
            <div className="painel">
                <div className="painelEsquerda">
                    <p className="text-md">Conheça +</p>
                    <div className="painelEsquerdaInfo">
                        <p className="text-lg font-medium">Capacitação aberta, pública e gratuita.</p>
                        <p className="text-md font-light">
                            Conecte-se aos maiores portais de certificação governamental, tecnologia
                            aplicada e desenvolvimento pessoal do país.
                        </p>
                        <div className="painelCard">
                            <p className="text-sm font-medium">Diversos cursos 100% gratuitos!</p>
                            <p className="text-xs">Emitidos por universidades e órgãos oficiais e verificados.</p>
                        </div>
                        <div className="painelCard">
                            <p className="text sm font-medium">Certificados Reconhecidos</p>
                            <p className="text-xs">Validação instantânea para concursos e progressão de carreira.</p>
                        </div>
                    </div>
                </div>
                <div className="painelDireita">
                    <div>
                        <div>
                            <p className="text-md font-semibold">Criar conta</p>
                            <p className="text-sm font-light">Inicie seus estudos gratuitos e acompanhe suas indicações de cursos.</p>
                        </div>
                        <form onSubmit={criarConta}>
                            <div className="formField">
                                <p className="font-medium">Nome</p>
                                <div className="input-group">
                                    <User className="icon" />
                                    <input name="nome" className="input" type="text" placeholder="Digite seu nome" />
                                </div>
                            </div>
                            <div className="formField">
                                <p className="font-medium">Email</p>
                                <div className="input-group">
                                    <IdCard className="icon" />
                                    <input name="email" className="input" type="email" placeholder="seu.email@exemplo.com" />
                                </div>
                            </div>
                            <div className="formField">
                                <p className="font-medium">Senha</p>
                                <div className="input-group">
                                    <LockKeyhole className="icon"/>
                                    <input name="senha" className="input" type={verSenha?"text":"password"} placeholder="Digite sua senha de acesso" />
                                    <button onClick={toggleVerSenha} type="button" className="button-icon button-icon-secondary">
                                        {verSenha ? <EyeOff size={18}/> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="formField">
                                <p className="font-medium">Confirmação de Senha</p>
                                <div className="input-group">
                                    <LockKeyhole className="icon"/>
                                    <input name="senha" className="input" type={verConfirmar?"text":"password"} placeholder="Digite a senha novamente" />
                                    <button onClick={toggleConfirmar} type="button" className="button-icon button-icon-secondary">
                                        {verConfirmar ? <EyeOff size={18}/> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="formField">
                                <p className="font-medium">Tipo de usuário</p>
                                <div className="itemRadio">
                                    <input value="autor" name="tipoUsuario" type="radio" />
                                    <p>Autor</p>
                                </div>
                                <div className="itemRadio">
                                    <input value="estudante"  name="tipoUsuario" type="radio" />
                                    <p>Estudante</p>
                                </div>

                            </div>
                            <button type="submit" className="button button-teriary">
                                <p className="text-sm font-medium">Criar Conta</p>
                            </button>
                        </form>
                    </div>
                    <div className="cadastroInfo">
                        <p className="text-sm text-secondary-600">Já tem uma conta?</p>
                        <a href="/login">Faça login agora</a>
                    </div>
                </div>
            </div>
        </section>
    )
}