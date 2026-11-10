import { AutorService } from "./AutorService";
import { BaseService } from "./BaseService.mjs";

export class AdminService extends BaseService {
    autorService;

    constructor() {
        super("admin");
        this.bootstrap();
        this.autorService = new AutorService();
    }

    statusAutorRegExp = new RegExp("pendente|aprovado|reprovado", "i");

    

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
            this.autorService.update(idAutor, {...autor, status: status})
        } else {
            throw new Error("Status inválido para o autor");
        }
    }
}