import { Check, CircleX } from "lucide-react";
import { CursoService, statusCurso, validateStatusCurso } from "../../../service";
import { useCursoContext } from "../../../context";
import { useState } from "react";
import { EditCursoModal } from "./EditCursoModal";

const cursoService = new CursoService();

export function AutorCursoItem({ curso }) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const { setCursos } = useCursoContext();
    function excluirCurso() {
        const confirmacao = window.confirm("Deseja realmente excluir este curso?");
        if (confirmacao) {
            if(cursoService.deleteById(curso.id)) {
                window.alert("Curso excluído com sucesso!");
                setCursos(cursoService.findAll());
            } else {
                window.alert("Erro ao excluir o curso.");
            }
        }
    }

    return (
        <div key={curso.id} className="card-autor">
            <div className="info-autor">
            <span className={`status-badge ${curso.status}`}>
                {curso.status === statusCurso.aprovado && <Check size={18} />}
                {curso.status === statusCurso.reprovado && <CircleX size={18} />}
                <p>{curso.status.charAt(0).toUpperCase() + curso.status.slice(1)}</p>
            </span>
            <p className="font-semibold">{curso.titulo}</p>
            </div>
            <div className="curso-actions">
                {validateStatusCurso.aprovado.test(curso.status) && (
                    <button onClick={()=>setIsEditOpen(true)} className="button button-secondary">
                        <p className="text-xs font-medium">Editar</p>
                    </button>
                )}
                <button className="button button-danger" onClick={excluirCurso}>
                    <p className="font-medium text-xs">Excluir curso</p>
                </button>
            </div>
            {isEditOpen && <EditCursoModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} curso={curso} />}
        </div>
    )
}