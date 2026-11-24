import { AutorService } from "./AutorService";
import { BaseService } from "./BaseService.mjs";
import { CategoriaCursoService } from "./CategoriaCursoService.mjs";
import { CursoService } from "./CursoService.mjs";
import { statusAutorRegExp } from "./StatusAutor.mjs";
import { statusCursoRegExp } from "./StatusCurso.mjs";

export class AdminService extends BaseService {
    constructor() {
        super("admin");
        this.bootstrap();
        this.autorService = new AutorService();
        this.cursoService = new CursoService();
        this.categoriaCursoService = new CategoriaCursoService();
    }

    

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

        if(statusAutorRegExp.test(status)) {
            this.autorService.update(idAutor, {...autor, status: status});
        } else {
            throw new Error("Status inválido para o autor");
        }
    }

    alterarStatusCurso(idCurso, status) {
        const curso = this.cursoService.findById(idCurso);

        if(statusCursoRegExp.test(status)) {
            this.cursoService.update(idCurso, {...curso, status: status});
        } else {
            throw new Error("Status inválido para o curso");
        }
    }
}