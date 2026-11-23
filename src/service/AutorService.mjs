import { BaseService } from "./BaseService.mjs";
import { CursoService } from "./CursoService.mjs";

export class AutorService extends BaseService {
    constructor() {
        super("autor");
        this.cursoService = new CursoService();
    }

    save(request) {
        const listaAtual = this.findAll();

        // Inicializando autor
        const autor = {
            id: request.id,
            cursos: request.cursos || [],
            status: "pendente",
            fotoUrl: ""
        };

        listaAtual.push(autor);

        if(autor.cursos.length > 0) autor.cursos.forEach(c=>this.cursoService.save(c));

        localStorage.setItem(this.key, this.objectToJson(listaAtual));
        
        return autor;
    }

    /**
     * Cadastra um curso do autor
     * @param {{titulo: string, categoria: any, descricao: string, duracao: string, link: string}} request 
     */
    cadastrarCurso(request) {
        const usuarioLogado = this.getUsuarioLogado();
        const autorLogado = this.findById(usuarioLogado.id);

        if(!autorLogado || autorLogado.status !== "aprovado") {
            throw new Error("Sem permissão para esse método: Não autenticado");
        }

        autorLogado.cursos = undefined; // Para não gerar loop ifinito de chamadas.
        request.autor = autorLogado;


        this.cursoService.save(request);
    }


    /**
     * Edição de um curso já aprovado do autor
     * @param {number} idCurso Id do curso ja aprovado
     * @param {*} request 
     * @throws Se o curso não existir ou não for aprovado, gera uma exceção.
     */
    editarCurso(idCurso, request) {
        let curso = this.cursoService.findById(idCurso);

        if(curso || curso.status != "aprovado") {
            throw new Error("Curso não encontrado");
        }

        curso = {...request, id: idCurso}

        this.cursoService.update(idCurso, curso);
    }


    /**
     * 
     * @param {number} idCurso ID do curso que será excluido
     */
    excluirCurso(idCurso) {
        this.innerCurso(idCurso);
        
        this.cursoService.deleteById(idCurso);
    }

    /**
     * Retornar `true` se o curso correspondente com o id passado, for do autor logado no sistema. 
     * @param {number} idCurso ID do curso buscado. 
     */
    innerCurso(idCurso) {
        const usuarioLogado = this.getUsuarioLogado();
        const autor = this.findById(usuarioLogado.id);

        if(!autor || autor.status != "aprovado") {
            throw new Error("Autor não autênticado");
        }

        const cursoBuscado = autor.cursos.find(c=>c.id === idCurso);

        return cursoBuscado ? true : false;
    }
}