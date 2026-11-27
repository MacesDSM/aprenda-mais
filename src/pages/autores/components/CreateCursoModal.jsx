import { Globe } from "lucide-react";
import { Modal } from "../../../components";
import { CategoriaCursoService, CursoService } from "../../../service";
import { useAuthContext, useCursoContext } from "../../../context";

const categoriaService = new CategoriaCursoService();
const cursoService = new CursoService();

export function CreateCursoModal({ isOpen, onClose }) {

    const categorias = categoriaService.findAll();
    const {setCursos} = useCursoContext();
    const {usuario} = useAuthContext();
    
    function createCurso(event) {
        event.preventDefault();
        const formData = cursoService.getFormObject(event);
        formData.autor = { id: usuario.id, nome: usuario.nome };
        formData.categoria = { id: Number(formData.categoria) };

        try {
            if(cursoService.save(formData)) {
                setCursos(cursoService.findAll());
                window.alert("Curso criado com sucesso!");
            } else {
                window.alert("Erro ao criar curso.");
            }
        } catch(e) {
            window.alert(`Erro ao criar curso: ${e.message}`);
        }
        onClose();
    }
    

    return(
        <Modal isOpen={isOpen} onClose={onClose} title="Criar Novo Curso">
            <form onSubmit={createCurso} className="modal-form">
                <main className="modal-main">
                    <div className="modal-form-field">
                        <p className="text-xs font-medium">Nome do Curso</p>
                        <input className="input" type="text" name="titulo" placeholder="Digite o nome do curso" required />
                    </div>
                    <div className="modal-form-field">
                        <p className="text-xs font-medium">Descrição do Curso</p>
                        <textarea className="input" type="text" name="descricao" placeholder="Digite a descrição do curso" />
                    </div>
                    <div className="modal-form-field">
                        <p className="text-xs font-medium">Link do Curso</p>
                        <div className="input-group">
                            <Globe className="icon" />
                            <input className="input" type="text" name="link" placeholder="Digite o link do curso" required />
                        </div>
                    </div>
                    <div className="modal-form-field">
                        <p className="text-xs font-medium">Categoria do curso</p>
                        <select defaultValue="" className="input" name="categoria">
                            <option value="">Selecionar categoria</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </main>
                <footer className="modal-footer text-xs">
                    <button type="button" className="button button-secondary" onClick={onClose}>
                        <p>Cancelar</p>
                    </button>
                    <button type="submit" className="button button-primary">
                        <p>Criar Curso</p>
                    </button>
                </footer>
            </form>
        </Modal>
    )
}