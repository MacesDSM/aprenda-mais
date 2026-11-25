import { Outlet } from "react-router";
import { UsuarioService } from "../../service";

/**
 * Usar esse componente para proteger rotas que só podem ser acessadas por usuários com um papel específico.
 */
export function ExclusiveLayout({ role }) {
    const usuarioService = new UsuarioService();

    const usuarioLogado = usuarioService.findById(usuarioService.getUsuarioLogado()?.id);

    if(usuarioLogado && usuarioLogado.role.toUpperCase()===role.toUpperCase()) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace={true} />
    }
}