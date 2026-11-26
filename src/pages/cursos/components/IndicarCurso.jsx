import { BadgeCheck, CirclePlus, Globe, Send } from "lucide-react";
import { CategoriaCursoService } from "../../../service";

const categoriaCursoService = new CategoriaCursoService();

export function IndicarCurso() {

    const categorias = categoriaCursoService.findAll();

    function submit(event) {
        event.preventDefault();
    }

    return (
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
              <form className="indicacao-form" onSubmit={submit}>
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
                        {categorias.map((categoria) => (
                          <option key={categoria.id} value={categoria}>
                            {categoria.nome}
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
    )
}