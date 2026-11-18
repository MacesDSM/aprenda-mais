import { BaseService } from "./BaseService.mjs";
import { UsuarioService } from "./UsuarioService.mjs";

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
        
}