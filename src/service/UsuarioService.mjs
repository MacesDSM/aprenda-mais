import { AutorService } from "./AutorService";
import { BaseService } from "./BaseService.mjs";
import { EstudanteService } from "./EstudanteService";

/**
 * Classe que traz os comandos de perssistência de dados do usuário.
 */
export class UsuarioService extends BaseService {
    constructor() {
        super("usuario");
        this.estudanteService = new EstudanteService();
        this.autorService = new AutorService();
    }

    /**
     * Expressão regular para testar se o tipo de usuário é valido.
     */
    tipoUsuarioRegExp = new RegExp("autor|estudante", "i");

    /**
     * Atributo apenas para guardar a key que guarda o usuário autênticado.
     */
    #authKey = "auth";

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
     * @param {string} email Email buscado.
     * @returns Se existir algum registro com o email do parâmetro, é retornado o objeto correspondente,
     * caso contrário se retorna `null`.
     */
    findByEmail(email) {
        const listaUsuarios = this.findAll();
        const usuario = listaUsuarios.filter(u=>u.email===email)[0] ?? null;
        return this.findById(usuario.id);
    }

    /**
     * Busca na base de dados o usuário pelo seu id
     * @param {number} id Id buscado.
     * @returns {*} Se existir algum registro com o email do parâmetro, é retornado o objeto correspondente,
     * caso contrário se retorna `null`.
     */
    findById(id) {
        const usuario = super.findById(id);
    
        let usuarioFinal;
        
        if(usuario) {
            this.#executarPorTipoUsuario(usuario.tipoUsuario.toUpperCase(), [
                {tipoUsuario: "AUTOR", callback:()=>usuarioFinal = this.autorService.findById(id)},
                {tipoUsuario: "ESTUDANTE", callback:()=>usuarioFinal = this.estudanteService.findById(id)}
            ]);
        }

        if(usuarioFinal) {
            usuarioFinal = {...usuarioFinal, ...usuario}
        }

        return usuarioFinal || null;
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
    /**
     * Cadastra um novo usuário no sistema
     * @param {{nome: string, email: string, senha: string, tipoUsuario: "estudante" | "autor"}} request Objeto para cadastrar o autor;
     * @returns Objeto do usuário cadastrado.
     */
    save(request) {
        if(!request.tipoUsuario || !this.tipoUsuarioRegExp.test(request.tipoUsuario)) {
            throw new Error("Tipo de usuário não encontrado ou inválido");
        }

        const usuarioSalvo = super.save(request);

        let usuarioFinal;
        this.#executarPorTipoUsuario(request.tipoUsuario.toUpperCase(), [
            {tipoUsuario: "AUTOR", callback: ()=>usuarioFinal = this.autorService.save(usuarioSalvo)},
            {tipoUsuario: "ESTUDANTE", callback: ()=>usuarioFinal = this.estudanteService.save(usuarioSalvo)}
        ]);

        return usuarioFinal || null;
    }


    /**
     * Função que compara um tipo de usuário no parâmetro e, dada uma ação correspondente no
     * segundo parâmentro, ele executa uma callback.
     * @param {string} tipoUsuario 
     * @param {[{tipoUsuario: string, callback: ()=>void}]} listaAcoes Um array com um objeto que lista, o valor correspondente com o tipoUsuario e em
     *  seguida uma callback para se excecutada.
     * 
     * @example
     * Exemplo no salvamento de um usuário, onde existem duas especializações que deve retornar valores diferentes,
     * dependendo da implementação.
     *  ```js
     * #executarPorTipoUsuario(request.tipoUsuario.toUpperCase(), [
     *      {tipoUsuario: "AUTOR", callback: ()=>this.autorService.save(usuarioSalvo)},
     *      {tipoUsuario: "ESTUDANTE", callback: ()=>this.estudanteService.save(usuarioSalvo)}
     * ]);
        ```
     */
    #executarPorTipoUsuario(tipoUsuario, listaAcoes) {
        listaAcoes.filter(a=>a.tipoUsuario==tipoUsuario);
        if(listaAcoes.length < 1) {
            throw new Error("Nenhum valor correspondente na lista de ações");
        }
        listaAcoes[0].callback();
    }
}