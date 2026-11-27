import { Check, CircleX } from "lucide-react";
import { statusCurso, validateStatusCurso } from "../../../service";

export function AutorCursoItem({ curso }) {
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
                    <button className="button button-secondary">
                        <p className="text-xs font-medium">Editar</p>
                    </button>
                )}
                
                <button className="button button-danger">
                    <p className="font-medium text-xs">Remover curso</p>
                </button>
            </div>
        </div>
    )
}