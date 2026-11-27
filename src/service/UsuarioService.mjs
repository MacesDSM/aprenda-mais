import { AutorService } from "./AutorService.mjs";
import { BaseService } from "./BaseService.mjs";
import { CategoriaCursoService } from "./CategoriaCursoService.mjs";
import { EstudanteService } from "./EstudanteService.mjs";
import { tipoUsuario, tipoUsuarioRegExp } from "./TipoUsuario.mjs";

/**
 * Classe que traz os comandos de perssistência de dados do usuário.
 */
export class UsuarioService extends BaseService {
    constructor() {
        super("usuario");
        this.estudanteService = new EstudanteService();
        this.autorService = new AutorService();
        this.categoriaCursoService = new CategoriaCursoService();
    }

    /**
     * Expressão regular para testar se o tipo de usuário é valido.
     */
    

    

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
     * @returns Retorna o usuário autênticado se o login for bem-sucedido, caso contrário
     * retorna `null`
     */
    logar(request) {
        const conta = this.findByEmail(request.email);
        if(conta && conta.senha === request.senha) {
            localStorage.setItem(this.authKey, this.objectToJson({id: conta.id}));
            return conta;
        }
        return null;
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
                {tipoUsuario: tipoUsuario.autor, callback:()=>usuarioFinal = this.autorService.findById(id)},
                {tipoUsuario: tipoUsuario.estudante, callback:()=>usuarioFinal = this.estudanteService.findById(id)},
                {tipoUsuario: tipoUsuario.admin, callback:()=>usuarioFinal = usuario}
            ]);
        }

        if(usuarioFinal) {
            usuarioFinal = {...usuarioFinal, ...usuario}
        }

        return usuarioFinal || null;
    }

    /**
     * Faz logout do usuário autênticado, removendo da base de dados `auth`.
     */
    logout() {
        localStorage.removeItem(this.authKey);
    }
    /**
     * Cadastra um novo usuário no sistema
     * @param {{nome: string, email: string, senha: string, tipoUsuario: "estudante" | "autor"}} request Objeto para cadastrar o autor;
     * @returns Objeto do usuário cadastrado.
     */
    save(request) {
        if(!request.tipoUsuario || !tipoUsuarioRegExp.test(request.tipoUsuario)) {
            throw new Error("Tipo de usuário não encontrado ou inválido");
        }

        const usuarioSalvo = super.save(request);

        let usuarioFinal;
        this.#executarPorTipoUsuario(request.tipoUsuario.toUpperCase(), [
            {tipoUsuario: tipoUsuario.admin, callback: ()=>{}},
            {tipoUsuario: tipoUsuario.estudante, callback: ()=>usuarioFinal = this.estudanteService.save(usuarioSalvo)},
            {tipoUsuario: tipoUsuario.autor, callback: ()=>usuarioFinal = this.autorService.save(usuarioSalvo)},
        ]);

        return usuarioFinal || null;
    }


    /**
     * Função que compara um tipo de usuário no parâmetro e, dada uma ação correspondente no
     * segundo parâmentro, ele executa uma callback.
     * @param {string} tipoRecebido 
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
    #executarPorTipoUsuario(tipoRecebido, listaAcoes) {

    // O .find() para a busca assim que encontra o primeiro resultado válido
    const acaoEncontrada = listaAcoes.find(
        acao => acao.tipoUsuario?.toUpperCase() === tipoRecebido.toUpperCase()
    );

    if (!acaoEncontrada) {
        throw new Error(`Nenhum valor correspondente para o tipo: ${tipoRecebido}`);
    }

    acaoEncontrada.callback();
}

}