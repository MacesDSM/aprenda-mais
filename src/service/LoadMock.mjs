import estudanteMock from "../mocks/estudante.json" with { type: 'json' };
import autorMock from "../mocks/autor.json" with { type: 'json' };
import cursoMock from "../mocks/curso.json" with { type: 'json' };
import { UsuarioService } from "./UsuarioService.mjs";
import { CursoService } from "./CursoService.mjs";


/**
 * Função que limpa o localStorage e, em seguida popula ele com dados de teste
 */
export function mock() {
    localStorage.clear();

    const usuarioService = new UsuarioService();
    const cursoService = new CursoService();

    estudanteMock.forEach(est=>usuarioService.save(est));
    autorMock.forEach(au=>usuarioService.save(au));
    cursoMock.forEach(c=>cursoService.save(c));

}