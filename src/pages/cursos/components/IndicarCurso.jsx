import { BadgeCheck, CirclePlus, Globe, Send } from "lucide-react";
import { CategoriaCursoService, CursoService, UsuarioService } from "../../../service";
import { useCursoContext } from "../../../context";

const categoriaCursoService = new CategoriaCursoService();
const usuarioService = new UsuarioService();
const cursoService = new CursoService();

export function IndicarCurso() {

  const categorias = categoriaCursoService.findAll();
  const { setCursos } = useCursoContext();

  function submit(event) {
      event.preventDefault();
      const formData = cursoService.getFormObject(event);

      formData.categoria = {id: Number(formData.categoria)};

      formData.autor = {
        nome: `${formData.autor} (Indicado)`,
        id: usuarioService.findByEmail("indicado@email.com").id
      };

      try {
          cursoService.save(formData);
          setCursos(cursoService.findAll());
          window.alert("Curso cadastrado com sucesso!");
      } catch (error) {
          window.alert(error.message);
      }
      event.currentTarget.reset();
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
                      className="input"
                      id="indicacao-titulo"
                      name="titulo"
                      type="text"
                      placeholder="Ex: Gestão de Projetos Ágeis"
                      required
                    />
                  </div>
                  <div className="indicacao-campo">
                    <label className="indicacao-rotulo" htmlFor="descricao">Descrição do curso</label>
                    <textarea maxLength={600} placeholder="Descrição do curso" name="descricao" className="input"></textarea>
                  </div>
                  <div className="indicacao-campo">
                    <label className="indicacao-rotulo" htmlFor="indicacao-link">
                      Link Oficial Direto
                    </label>
                    <div className="input-group">
                      <Globe className="icon" size={20} aria-hidden="true" />
                      <input
                        className="input"
                        id="indicacao-link"
                        name="link"
                        type="url"
                        placeholder="https://www.gov.br/..."
                        required
                      />
                    </div>
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
                        className="input"
                        id="indicacao-instituicao"
                        name="autor"
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
                        className="input "
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
                <button className="button button-primary" type="submit">
                  <p className="text-xs">Enviar Sugestão</p>
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