import { UsuarioService } from "../service";


export function Home() {
    const service = new UsuarioService();

    return (
        <div>
            <h1>Pagina de home</h1>
        </div>
    )
}