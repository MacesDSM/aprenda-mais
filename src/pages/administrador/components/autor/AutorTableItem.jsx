import { useAutorContext } from "../../../../context";
import { AdminService, AutorService, statusAutor } from "../../../../service";

const autorService = new AutorService();
const adminService = new AdminService();

export function AutorTableItem({ autor }) {

    const { setAutores } = useAutorContext();

    function alterarStatusAutor(autor, status) {
        const confirm = window.confirm(`Tem certeza que deseja ${status === statusAutor.aprovado ? 'aprovar' : 'reprovar'} o autor "${autor.nome}"?`);
        if (confirm) {
            if(adminService.alterarStatusAutor(autor.id, status)) {
                setAutores(autorService.findAll());
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
                {autor.status === statusAutor.pendente && (
                    <>
                        <button className="action-btn btn-aprovar" onClick={() => alterarStatusAutor(autor, statusAutor.aprovado)}>Aprovar</button>
                        <button className="action-btn btn-reprovar" onClick={() => alterarStatusAutor(autor, statusAutor.reprovado)}>Reprovar</button>
                    </>
                )}
            </span>
        </div>
    )
}