import { BaseService } from "./BaseService.mjs";
import { CursoService } from "./CursoService.mjs";

export class AutorService extends BaseService {
    constructor() {
        super("autor");
        this.cursoService = new CursoService();
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


    cadastrarCurso(request) {
        const usuarioLogado = this.usuarioService.getUsuarioLogado();

        if(!usuarioLogado || this.tipoUsuario !="autor") {
            throw new Error("Sem permissão para esse método: Não autenticado");
        }

        usuarioLogado.cursos = undefined;
        request.autor = usuarioLogado;


        this.cursoService.save(request);
    }
}