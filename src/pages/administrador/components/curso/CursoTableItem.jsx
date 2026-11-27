import { useCursoContext } from "../../../../context";
import { AdminService, CursoService, statusCurso, validateStatusCurso } from "../../../../service";

const adminService = new AdminService();
const cursoService = new CursoService();


export function CursoTableItem({ curso }) {

    const { setCursos } = useCursoContext();

    function alteraStatusCurso(curso, status) {
        const confirmado = window.confirm(`Tem certeza que deseja alterar o status do curso "${curso.titulo} para ${status}"?`);
        if (confirmado) {
            if(adminService.alterarStatusCurso(curso.id, status)) {
                setCursos(cursoService.findAll());
                window.alert("Curso atualizado com sucesso!");
            }
        }
    }
    return (
        <div className="table-row">
            <span className="course-name">{curso.titulo}</span>
            <span className="course-instructor">{curso.autor ? curso.autor.nome : 'Não especificado'}</span>
            <div>
                <span className={`course-status status-${curso.status}`}>{curso.status.toUpperCase(0)}</span>
            </div>
            <span className="course-date">{new Date(Date.now()).toLocaleDateString()}</span>
        
            {validateStatusCurso.pendente.test(curso.status) && (
                <div>
                    <button className="action-btn btn-aprovar" onClick={() => alteraStatusCurso(curso, statusCurso.aprovado)}>Aprovar</button>
                    <button className="action-btn btn-reprovar" onClick={() => alteraStatusCurso(curso, statusCurso.reprovado)}>Reprovar</button>
                </div>
            )}
            {!validateStatusCurso.pendente.test(curso.status) && (
                <div>
                    <button className="button button-secondary" onClick={() => alteraStatusCurso(curso, statusCurso.pendente)}>
                        <p className="text-xs">Reverter para pendente</p>
                    </button>
                </div>
            )}
        </div>
    )
}