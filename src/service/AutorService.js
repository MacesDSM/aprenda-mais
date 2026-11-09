import { BaseService } from "./BaseService.mjs";

export const StatusAutor = [
    "PENDENTE",
    "APROVADO",
    "REPROVADO"
];

export class AutorService extends BaseService {
    constructor() {
        super("autor");
    }


    save(request) {
        request.status = StatusAutor[0];
        super.save(request);
    }
}