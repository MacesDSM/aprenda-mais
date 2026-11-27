import { BaseService } from "./BaseService.mjs";

export class EstudanteService extends BaseService {
    
    constructor(){
        super("estudante");
    }

    
    save(request) {
        const listaAtual = this.findAll();

        // Inicializando estudante
        const estudante = {
            id: request.id,
            cursos: request.cursos || []
        };

        listaAtual.push(estudante);

        localStorage.setItem(this.key, this.objectToJson(listaAtual));
        
        return estudante;
    }


    /**
     * Salva um curso para o estudante logado.
     * @param {number} cursoId 
     * @returns Retorna `true` se o curso for salvo com sucesso, caso contrário retorna `false`.
     */
    salvarCurso(cursoId) {
        const usuarioLogado = this.getUsuarioLogado();
        if(!usuarioLogado) {
            throw new Error("Nenhum usuário logado encontrado.");
        }

        const estudante = this.findById(usuarioLogado.id);
        if(!estudante) {
            throw new Error("Estudante não encontrado.");
        }

        estudante.cursos.push({id: cursoId});
        return this.update(estudante.id, estudante);
        
    }
    
    removerCursoSalvo(cursoId) {
        const usuarioLogado = this.getUsuarioLogado();
        if(!usuarioLogado) {
            throw new Error("Nenhum usuário logado encontrado.");
        }

        const estudante = this.findById(usuarioLogado.id);
        if(!estudante) {
            throw new Error("Estudante não encontrado.");
        }

        estudante.cursos = estudante.cursos.filter(c => c.id != cursoId);
        return this.update(estudante.id, estudante);
    }
}