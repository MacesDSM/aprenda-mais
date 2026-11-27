import { createContext, useContext, useState } from "react";
import { UsuarioService } from "../service";

const usuarioService = new UsuarioService();
const AuthContext = createContext({});

export function AuthContextProvider({ children }) {

    const [usuario, setUsuario] = useState(usuarioService.findById(usuarioService.getUsuarioLogado()?.id));

    function logout() {
        usuarioService.logout();
        setUsuario(null);
    }

    function login(request) {
        const usuario = usuarioService.logar(request);
        setUsuario(usuario);
        return usuario;
    }

  return (
    <AuthContext.Provider value={{usuario, logout, login}}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para acessar o contexto de autenticação.
 * @returns {{usuario: *, logout: Function, login: Function}}
 */
export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext deve ser usado dentro de um AuthContextProvider");
    }
    return context;
}