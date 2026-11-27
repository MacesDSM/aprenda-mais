import { Globe } from "lucide-react";
import { Modal } from "../../../components";
import { CategoriaCursoService, CursoService } from "../../../service";
import { useCursoContext } from "../../../context";

const categoriaService = new CategoriaCursoService();
const cursoService = new CursoService();

export function EditCursoModal({ isOpen, onClose, curso }) {
    const { setCursos } = useCursoContext();
    const categorias = categoriaService.findAll();

    function edit(event) {
        event.preventDefault();
        const formData = cursoService.getFormObject(event);

        try {
            if (cursoService.update(curso.id, formData)) {
                setCursos(cursoService.findAll());
                window.alert("Curso atualizado com sucesso!");
            } else {
                window.alert("Erro ao atualizar o curso.");
            }
        } catch(e) {
            window.alert(`Não foi possível atualizar o curso: ${e.message}`);
        }
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Editar Curso: ${curso.titulo}`}>
            <form onSubmit={edit} className="modal-form">
                <main className="modal-main">
                    <div className="modal-form-field">
                        <p className="text-xs font-medium">Nome do Curso</p>
                        <input defaultValue={curso.titulo} className="input" type="text" name="titulo" placeholder="Digite o nome do curso" required />
                    </div>
                    <div className="modal-form-field">
                        <p className="text-xs font-medium">Descrição do Curso</p>
                        <textarea defaultValue={curso.descricao ?? ""} className="input" type="text" name="descricao" placeholder="Digite a descrição do curso" />
                    </div>
                    <div className="modal-form-field">
                        <p className="text-xs font-medium">Link do Curso</p>
                        <div className="input-group">
                            <Globe className="icon" />
                            <input defaultValue={curso.link} className="input" type="text" name="link" placeholder="Digite o link do curso" required />
                        </div>
                    </div>
                    <div className="modal-form-field">
                        <p className="text-xs font-medium">Categoria do curso</p>
                        <select defaultValue={curso.categoria.id ?? ""} className="input" name="categoria">
                            <option value="">Selecionar categoria</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </main>
                <footer className="modal-footer">
                    <button onClick={onClose} type="button" className="button button-secondary">
                        <p className="text-xs font-medium">Cancelar</p>
                    </button>
                    <button type="submit" className="button button-primary">
                        <p className="text-xs font-medium">Salvar alterações</p>
                    </button>
                </footer>
            </form>
        </Modal>
    );
}