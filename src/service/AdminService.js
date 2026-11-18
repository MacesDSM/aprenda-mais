import { AutorService } from "./AutorService";
import { BaseService } from "./BaseService.mjs";
import { CursoService } from "./CursoService.mjs";

export class AdminService extends BaseService {
    autorService;
    cursoService;

    constructor() {
        super("admin");
        this.bootstrap();
        this.autorService = new AutorService();
        this.cursoService = new CursoService();
    }

    statusAutorRegExp = new RegExp("pendente|aprovado|reprovado", "i");

    statusCursoRegExp = new RegExp("pendente|aprovado|reprovado", "i");

    

    /**
     * Método que cria o admin caso o sistema não tenha o iniciado ainda.
     */
    bootstrap() {
        if(this.count() < 1) {
            this.save({
                nome: "Admin",
                email: "admin@email.com",
                senha: "123456"
            });
        }
    }

    alterarStatusAutor(idAutor, status) {
        const autor = this.autorService.findById(idAutor);

        if(this.statusAutorRegExp.test(status)) {
            this.autorService.update(idAutor, {...autor, status: status});
        } else {
            throw new Error("Status inválido para o autor");
        }
    }

    alterarStatusCurso(idCurso, status) {
        const curso = this.cursoService.findById(idCurso);

        if(this.statusCursoRegExp.test(status)) {
            this.cursoService.update(idCurso, {...curso, status: status});
        } else {
            throw new Error("Status inválido para o curso");
        }
    }
}