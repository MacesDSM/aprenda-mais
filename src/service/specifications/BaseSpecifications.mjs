
/**
 * Classe que implementa o pattern Builder para compor filtros em uma lista.
 * @description Deve-se usar o método builder e a partir dele compor os filtros desejados.
 */
export class BaseSpecifications {
    constructor(lista) {
        this.lista = lista;
    }

    /**
     * Ordena a lista de itens por data na ordem especificada.
     * @param {"asc" | "desc"} ordenação
     * @description Caso a ordem não seja especificada, a lista será ordenada em ordem ascendente.
     * A lista de item deve conter o atributo `dataCriacao`.
     */
    specOrdemByData(ordem) {
        if(ordem === "desc") {
            this.lista = this.lista.sort((a, b) => b.dataCriacao - a.dataCriacao);
        }
        this.lista = this.lista.sort((a, b) => a.dataCriacao - b.dataCriacao);

        return this;
    }


    /**
     * Retorna a lista após aplicação de todos os filtros.
     * @returns {Array} Lista filtrada.
     */
    build() {
        return this.lista;
    }
}