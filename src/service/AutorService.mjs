import { BaseService } from "./BaseService.mjs";

export class AutorService extends BaseService {
    constructor() {
        super("autor");
    }

    save(request) {
        const listaAtual = this.findAll();

        // Inicializando estudante
        const autor = {
            id: request.id,
            cursos: [],
            status: "pendente",
            fotoUrl: ""
        };

        listaAtual.push(autor);

        localStorage.setItem(this.key, this.objectToJson(listaAtual));
        
        return autor;
    }
}