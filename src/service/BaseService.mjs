/**
 * Classe modelo para os outros services do sistema.
 * 
 * Classe base que gerencia a persistência genérica no LocalStorage.
 * Pode ser herdada por qualquer entidade do sistema.
 */
export class BaseService {
    
    /**
     * Construtor que inicia a base de dados e a vincula com o nome do parâmetro.
     * @param {string} key Nome da base de dados a ser incializada.
     */
    constructor(key) {
        this.key = key;
        this.bootstrap();
    }
    
    /**
     * Método que inicia a base de dados, se a chave (nome da base de dados) não tiver nenhum registro,
     * ele se inicia com um array vazio `[]`
     */
    bootstrap() {
        if (!localStorage.getItem(this.key)) {
            localStorage.setItem(this.key, this.objectToJson([]));
        }
    }

    /**
     * Busca na base de dados os registros cadastrados no sistema.
     * @returns Uma lista com os registros cadastrados.
     */
    findAll() {
        const dados = localStorage.getItem(this.key);
        return dados ? this.jsonToObject(dados) : [];
    }

    /**
     * 
     * @param {number} id 
     * @returns 
     */
    findById(id) {
        const registo = this.findAll()
            .filter(r=>r.id===id)[0];
        return registo ?? null;
    }

    /**
     * Salva um novo objeto na base de dados.
     * @param {*} request 
     * @description No objeto do parametro não é necessário informar o ID, pois esse não será
     * considerado na lógica e sim alterado para a ordem sequencial dos IDs. Se você precisa alterar um registro já
     * existente, use o método `update()`
     */
    save(request) {
        const listaAtual = this.findAll();
        
        const id = listaAtual.length < 1 ? 1 : listaAtual[listaAtual.length - 1].id + 1;
        
        const novoItem = { ...request, id };
        listaAtual.push(novoItem);
        
        localStorage.setItem(this.key, this.objectToJson(listaAtual));
        return novoItem;
    }

    /**
     * Atualiza um registro da base de dados pelo seu ID
     * @param {number} id ID único do registro a ser modificado.
     * @param {*} request Novo objeto alterado.
     * @throws Caso nenhum registro com o ID informado seja encontrado, uma exceção é
     * lançada.
     */
    update(id, request) {
        const listaAtual = this.findAll();
        let encontrado = false;

        const novaLista = listaAtual.map(item => {
            if (item.id === Number(id)) {
                encontrado = true;
                return { ...item, ...request, id };
            }
            return item;
        });

        if (encontrado) {
            localStorage.setItem(this.key, this.objectToJson(novaLista));
        } else {
            throw new Error(`Nenhum registro com o ID ${id} foi encontrado.`);
        }
    }

    /**
     * Exclui um registro da base de dados pelo seu ID
     * @param {number} id ID único do registro a ser excluido.
     * @throws Caso nenhum registro com o ID informado seja encontrado, uma exceção é
     * lançada.
     */
    deleteById(id) {
        const listaAtual = this.findAll();
        const tamanhoOriginal = listaAtual.length;

        // Filtra removendo o item desejado
        const novaLista = listaAtual.filter(item => item.id !== Number(id));

        if (novaLista.length < tamanhoOriginal) {
            localStorage.setItem(this.key, this.objectToJson(novaLista)); // Correção: objectToJson substituindo jsonToObject
        } else {
            throw new Error(`Nenhum registro com o ID ${id} foi encontrado.`);
        }
    }

    /**
     * Conta a quantidade de registros na base de dados;
     * @returns Retorna um `number` com a quantidade de registros encontrados
     */
    count() {
        return this.findAll().length;
    }

    // Utilitários
    /**
     * Converte um JSON em um Plain Object Javascript.
     * @description Esse método é util para transportar os dados do localStorage para dentro do código
     * em forma de objeto de volta.
     * @param {string} json string de Objeto JSON
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

    /**
     * Método que converte os dados de um `<form>` do HTML em um objeto JS.
     * @param {*} formEvent Objeto de evento do formulário, obtido pelo onSubmit
     * @returns Objeto JS com as propriedades e valores do formulário
     * Para funcionar corretamente, todos os campos (controles) do formulário devem
     * ter o atributo `name` devidamente definido.
     */
    getFormObject(formEvent) {
        const formData = new FormData(formEvent.target);

        return Object.fromEntries(formData)
    }
}