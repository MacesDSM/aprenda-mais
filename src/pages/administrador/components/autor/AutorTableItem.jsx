import { useAutorContext } from "../../../../context";
import { AdminService, AutorService, statusAutor, validateStatusAutor } from "../../../../service";

const autorService = new AutorService();
const adminService = new AdminService();

export function AutorTableItem({ autor }) {
    console.log("AutorTableItem autor:", autor); // Adicione este log para depuração
    const { setAutores } = useAutorContext();

    function alterarStatusAutor(autor, status) {
        const confirm = window.confirm(`Tem certeza que deseja alterar o status do autor "${autor.nome} para ${status}"?`);
        if (confirm) {
            if(adminService.alterarStatusAutor(autor.id, status)) {
                setAutores(prev=>(prev.map(a => a.id === autor.id ? { ...a, status } : a)));
                window.alert("Autor atualizado com sucesso!");
            }
        }
    }
    return (
        <div className="table-row">
            <span className="course-name">{autor.nome}</span>
            <div>
                <span className={`course-status status-${autor.status}`}>{autor.status.toUpperCase(0)}</span>
            </div>
            <span className="course-date">{new Date(Date.now()).toLocaleDateString()}</span>
            <span>
                {validateStatusAutor.pendente.test(autor.status) && (
                    <>
                        <button className="action-btn btn-aprovar" onClick={() => alterarStatusAutor(autor, statusAutor.aprovado)}>Aprovar</button>
                        <button className="action-btn btn-reprovar" onClick={() => alterarStatusAutor(autor, statusAutor.reprovado)}>Reprovar</button>
                    </>
                )}
                {!validateStatusAutor.pendente.test(autor.status) && (
                    <button className="button button-secondary" onClick={() => alterarStatusAutor(autor, statusAutor.pendente)}>
                        <p className="text-xs">Reverter para pendente</p>
                    </button>
                )}
            </span>
        </div>
    )
}