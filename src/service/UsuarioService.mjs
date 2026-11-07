import { BaseService } from "./BaseService.mjs";

/**
 * Classe que traz os comandos de perssistência de dados do usuário.
 */
export class UsuarioService extends BaseService {
    constructor() {
        super("usuario");
    }

    /**
     * Atributo apenas para guardar a key que guarda o usuário autênticado.
     */
    #authKey = "auth";

    /**
     * @inheritdoc BaseService.save
     * @example
     * ```js
     * {
     *  nome: "Nome Usuario",
     *  email: "email@email.com",
     *  senha: "senha123"
     * }
     * ``
     * 
     * @param {*} request 
     */
    save(request) {
        
        // Inicializando cursos
        request.cursos = [];

        super.save(request);
    }


    /**
     * @param {*} request Objeto com email e senha do login
     * @example
     * Exemplo de objeto do parâmetro
     * ```js
     * {
     *  email: "email@email.com",
     *  senha: "senhaDoLogin123"
     * }
     * ```
     * @returns Retorna `true` se o usuário foi autênticado com sucesso, caso contrário
     * retorna `false`
     */
    logar(request) {
        const conta = this.findByEmail(request.email);
        if(conta && conta.senha === request.senha) {
            localStorage.setItem(this.#authKey, this.objectToJson(conta));
            return true;
        }
        return false;
    }

    /**
     * Busca na base de dados o usuário pelo seu email
     * @param {*} email Email buscado.
     * @returns Se existir algum registro com o email do parâmetro, é retornado o objeto correspondente,
     * caso contrário se retorna `null`.
     */
    findByEmail(email) {
        const listaUsuarios = this.findAll();
        return listaUsuarios.filter(u=>u.email===email)[0] ?? null;
    }

    /**
     * Busca o usuário logado, armazenado na base de dados `auth`
     * @returns Caso exista (esteja logado), retorna o objeto do usuário logado, caso contrário
     * retorna `null`.
     */
    getUsuarioLogado() {
        const obj = localStorage.getItem(this.#authKey);
        if(obj) {
            return this.jsonToObject(obj);
        }
        return null;
    }

    /**
     * Faz logout do usuário autênticado, removendo da base de dados `auth`.
     */
    logout() {
        localStorage.removeItem(this.#authKey);
    }
}