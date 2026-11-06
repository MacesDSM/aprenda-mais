/**
 * Classe modelo para os outros services do sistema.
 */
export class BaseService {
    bootstrap() {

    }

    /**
     * Busca na base de dados os registros cadastrados no sistema.
     * @returns Uma lista com os registros cadastrados.
     */
    findAll() {}

    /**
     * Salva um novo objeto na base de dados.
     * @param {*} request 
     * @description No objeto do parametro não é necessário informar o ID, pois esse não será
     * considerado na lógica e sim alterado para a ordem sequencial dos IDs. Se você precisa alterar um registro já
     * existente, use o método `update()`
     */
    save(request) {}

    /**
     * Atualiza um registro da base de dados pelo seu ID
     * @param {*} id ID único do registro a ser modificado.
     * @param {*} request Novo objeto alterado.
     * @throws Caso nenhum registro com o ID informado seja encontrado, uma exceção é
     * lançada.
     */
    update(id, request) {}

    /**
     * Exclui um registro da base de dados pelo seu ID
     * @param {*} id ID único do registro a ser excluido.
     * @throws Caso nenhum registro com o ID informado seja encontrado, uma exceção é
     * lançada.
     */
    deleteById(id) {}


    // Utilitários
    /**
     * Converte um JSON em um Plain Object Javascript.
     * @param {*} json string de Objeto JSON
     * @returns Objeto JS convertido.
     */
    jsonToObject(json) {
        return JSON.parse(json);
    }

    /**
     * Converte um objeto JS em uma string JSON.
     * @param {*} object 
     * @returns string JSON do objeto do parâmetro.
     */
    objectToJson(object) {
        return JSON.stringify(object);
    }
}