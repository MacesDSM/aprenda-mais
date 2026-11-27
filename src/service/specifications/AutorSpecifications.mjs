import { statusAutorRegExp, validateStatusAutor } from "../StatusAutor.mjs";
import { BaseSpecifications } from "./BaseSpecifications.mjs";

export class AutorSpecifications extends BaseSpecifications {
    constructor(lista) {
        super(lista);
    }

    /**
     * Filtra a lista de autores por um status alvo
     * @param {string} status - O status a ser filtrado
     */
    specStatusAutor(status) {
        if(statusAutorRegExp.test(status)) {
            this.lista = this.lista.filter(autor => validateStatusAutor[status].test(autor.status));
        }
        return this;
    }
}