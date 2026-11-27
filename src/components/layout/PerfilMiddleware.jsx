
import { Navigate } from "react-router";
import { UsuarioService } from "../../service"
import { Perfil } from "../../pages";
import { validateTipoUsuario } from "../../service/TipoUsuario.mjs";


const usuarioService = new UsuarioService();

/**
 * Opera a lógicar para redirecionar para a rota de perfil com base na Role do usuario logado
 */
export function PerfilMiddleWare() {
    const usuario = usuarioService.findById(usuarioService.getUsuarioLogado()?.id);

    if(usuario) {
        if(validateTipoUsuario.admin.test(usuario.tipoUsuario)) {
            return <Navigate to="/administrador" replace/>
        } else if(validateTipoUsuario.autor.test(usuario.tipoUsuario)) {
            return <Navigate to="/autor" replace/>
        } else if(validateTipoUsuario.estudante.test(usuario.tipoUsuario)) {
            return <Perfil />
        }
    }
    return <Navigate to="/home" replace/>
}