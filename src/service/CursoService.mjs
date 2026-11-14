import { BaseService } from "./BaseService.mjs";

export class CursoService extends BaseService {
    constructor() {
        super("curso");
    }

    /**
     * @inheritdoc
     * @param {{titulo: string, categoria: any, descricao: string, duracao: string, link: string}} request 
     */
    save(request) {

        request.status = "pendente";
        

        super.save(request);
    }
}