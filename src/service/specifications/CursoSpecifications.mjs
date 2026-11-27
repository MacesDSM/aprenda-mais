/**
 * Funções que implementam especificações para filtrar cursos.
 */

import { statusCursoRegExp, validateStatusCurso } from "../StatusCurso.mjs";
import { BaseSpecifications } from "./BaseSpecifications.mjs";


export class CursoSpecifications extends BaseSpecifications {
    constructor(lista) {
        super(lista);
    }

    /**
     * Filtra os cursos por categoria.
     * @param {number | string} categoriaId ID da categoria alvo
     * @returns Objeto Spec
     * @description Se a categoriaId for `null`,
     * o filtro não será executado.
     */
    specCategoriaId(categoriaId) {
        if(categoriaId) {
            this.lista = this.lista.filter(c=>{
                if(c.categoria) {
                    return c.categoria.id == categoriaId;
                }
                return false;
            });
        }
        return this;
    }

    /**
     * Filtra os cursos por status.
     * @param {string } status 
     * @returns 
     */
    specStatusCurso(status) {
        if(statusCursoRegExp.test(status)) {
            this.lista = this.lista.filter(c => validateStatusCurso[status].test(c.status));
        }
        return this;
    }

    specAutorId(autorId) {
        if(autorId) {
            this.lista = this.lista.filter(c => c.autor && c.autor.id == autorId);
        }
        return this;
    }
}


