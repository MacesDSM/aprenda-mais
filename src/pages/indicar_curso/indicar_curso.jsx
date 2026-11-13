import { Globe } from "lucide-react";
import "./indicar-curso.css";
export function IndicarCurso() {
    return (
        <section>
            <div className="heading">
                <div className="titulo text-xl font-bold">
                    <p>Indique um Curso Gratuito e</p>
                    <p className="teriary-500">Transform Carreiras</p>
                </div>
                <p className="text-sm text-secondary-500">
                    Conhece uma capacitação séria, com certificado garantido e sem pegadinhas financeiras
                    (Gov.br, Sebrae, universidades, FGV)? Compartilhe com a nossa rede para adicionarmos
                    ao catálogo aberto
                </p>
            </div>
            <form>
                <div className="form-content">
                    <div className="titulo">
                        <p className="text-md font-semibold">Ficha de Indicação</p>
                        <p className="text-secondary-500">Preencha os dados oficiais do curso. O preview ao lado é atualizado em tempo real.</p>
                    </div>
                    <div className="form-field font-medium">
                        <p>Nome do Curso</p>
                        <input className="input" type="text" />
                    </div>
                    <div className="form-field-row font-medium">
                        <div className="form-field">
                            <p>Insituição / Autor</p>
                            <input className="input" type="text" />
                        </div>
                        <div className="form-field font-medium">
                            <p>Carga Horária estimada</p>
                            <input className="input" type="text" />
                        </div>
                    </div>
                    <div className="form-field font-medium">
                        <p>Link Oficial Direto (URL)</p>
                        <div className="input-group">
                            <Globe className="icon" size={20} />
                            <input className="input" type="text" placeholder="https://" />
                        </div>
                    </div>
                    <p className="font-normal text-sm">Cole o link da página do curso para onde os estudantes serão diretamente redirecionados.</p>
                    <div className="form-field font-medium">
                        <p>Área de Conhecimento / Categoria</p>
                        <div className="radio-group">
                            <input type="radio" name="categoria"/>
                            <p>Categoria A</p>
                        </div>
                        <div className="radio-group">
                            <input type="radio" name="categoria" defaultChecked/>
                            <p>Categoria B</p>
                        </div>
                    </div>
                    <div className="form-field-row form-footer">
                        <div className="form-field">
                            <button className="button button-secondary" type="reset">Limpar</button>
                        </div>
                        <div className="form-field">
                            <button className="button button-teriary" type="submit">
                                <p className="text-sm font-normal">Enviar</p>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="card">
                <div className="card-content">
                    <p className="teriary-500 font-medium">ACESSO DEMOCRÁTICO À EDUCAÇÃO</p>
                    <p className="text-secondary-600 font-semibold text-md">Por que catalogar e não cobrar?</p>
                    <p className="text-secondary-500">
                        O Aprenda Mais nasceu do princípio de que o melhor conhecimento
                        governamental e universitário já está pago com recursos públicos e civis.
                        Nosso trabalho é apenas pavimentar o caminho até o estudante sem
                        barreiras de algoritmos ou taxas.
                    </p>
                </div>
                <div className="card-content card-addon-left">
                    <div className="card-badge">
                        <p className="teriary-500 font-bold text-xl">100%</p>
                        <p>Gratuidade Real</p>
                    </div>
                    <div className="card-badge">
                        <p className="font-bold text-xl red-500">0</p>
                        <p>Taxas ou Banners</p>
                    </div>
                </div>
            </div>
        </section>
    )
}