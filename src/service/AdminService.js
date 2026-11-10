import { BaseService } from "./BaseService.mjs";
import { UsuarioService } from "./UsuarioService.mjs";

export class AdminService extends BaseService {
    #usuarioService;

    constructor() {
        super("admin");
        this.bootstrap();
        this.#usuarioService = new UsuarioService();
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
        const autor = this.#usuarioService.findById(idAutor);

        // Validar se é autor e aplicar o status novo
    }
}