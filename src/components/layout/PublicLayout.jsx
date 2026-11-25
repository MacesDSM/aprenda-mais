import { Navigate, Outlet } from "react-router";
import { UsuarioService } from "../../service";

/**
 * Usar esse componente para proteger rotas que só podem ser acessadas por usuários não logados.
 */
export function PublicLayout() {
    const usuarioService = new UsuarioService();

    if(!usuarioService.getUsuarioLogado()) {
        return <Outlet />;
    } else {
        return <Navigate to="/home" replace={true} />
  }
}