import { BaseService } from "./BaseService.mjs";

/**
 * Classe que traz os comandos de perssistência de dados do usuário.
 */
export class UsuarioService extends BaseService {
    // Chave para acessar a base de dados usuário no LocalStorage
    key = "usuario";

    // Método para inicializar o banco.
    bootstrap() {

    }

    /**
     * Busca na base de dados os usuários cadastrados no sistema.
     * @returns Uma lista com os usuários cadastrados, se não houver retorna um lista vazia.
     */
    findAll() {
        const response = super.jsonToObject(localStorage.getItem(this.key));
        return response ?? [];
    }

    /**
     * Salva um novo objeto Usuario na base de dados.
     * @param {*} request 
     * @description No objeto do parametro não é necessário informar o ID, pois esse não será
     * considerado na lógica e sim alterado para a ordem sequencial dos IDs. Se você precisa alterar um registro já
     * existente, use o método `update()`
     */
    save(request) {
        const listaAtual = this.findAll();

        // Lógica para computar o ID
        let id;
        if(listaAtual.length < 1) {
            id = 1;
        } else {
            id = listaAtual[listaAtual.length - 1].id++;
        }
        request.id = id;
        
        localStorage.setItem(this.key, super.objectToJson([...listaAtual, request]));
    }

    /**
     * Atualiza um registro da base de dados pelo seu ID
     * @param {*} id ID único do registro a ser modificado.
     * @param {*} request Novo objeto alterado.
     * @throws Caso nenhum registro com o ID informado seja encontrado, uma exceção é
     * lançada.
     */
    update(id, request) {
        const listaAtual = this.findAll();
        let encontrado = false;

        const novaLista = listaAtual.map(i=>{
            if(i.id === id){
                encontrado = true;
                return request;
            }
            return i;
        });

        if(encontrado) {
            localStorage.setItem(this.key, this.objectToJson(novaLista));
        } else {
            throw new Error("Nenhum registro com o ID informado foi encontrado");
        }
    }

    /**
     * Exclui um registro da base de dados pelo seu ID
     * @param {*} id ID único do registro a ser excluido.
     * @throws Caso nenhum registro com o ID informado seja encontrado, uma exceção é
     * lançada.
     */
    deleteById(id) {
        const listaAtual = this.findAll();
        let encontrado = false;

        const novaLista = listaAtual.filter(i=>{
            if(i.id === id) {
                encontrado = true;
                // Retorna falso para remover o item da lista.
                return false;
            }
            return true;
        });

        if(encontrado) {
            localStorage.setItem(this.key, super.jsonToObject(novaLista));
        } else {
            throw new Error("Nenhum registro com o ID informado foi encontrado");
        }
    }

    /**
     * Conta a quantidade de registros na base de dados;
     * @returns Retorna um `number` com a quantidade de registros encontrados
     */
    count() {
        const listaAtual = this.findAll();
        return listaAtual.length;
    }
}