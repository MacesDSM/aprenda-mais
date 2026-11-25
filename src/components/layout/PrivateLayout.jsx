import { Navigate, Outlet } from "react-router";
import { UsuarioService } from "../../service";

/**
 * Usar esse componente para proteger rotas que só podem ser acessadas por usuários logados.
 */
export function PrivateLayout() {
  const usuarioService = new UsuarioService();

  if(usuarioService.getUsuarioLogado()) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace={true} />
  }
}