import { createContext, useContext, useState } from "react";
import { AutorService, UsuarioService } from "../service";
import { validateTipoUsuario } from "../service/TipoUsuario.mjs";

const AutorContext = createContext({});
const usuarioService = new UsuarioService();
const autorService = new AutorService();

export function AutorContextProvider({ children }) {
    const listaAutor = autorService.findAll();
    const listaAutorCompleta = usuarioService.findAll()
        .filter(usuario => validateTipoUsuario.autor.test(usuario.tipoUsuario))
        .map(u=>{
            const autorEncontrado = listaAutor.filter(a => a.id === u.id);
            return { ...u, ...autorEncontrado[0] };
        });
    const [autores, setAutores] = useState(listaAutorCompleta);
 
    return (
        <AutorContext.Provider value={{autores, setAutores}}>
            {children}
        </AutorContext.Provider>
    );
}

/**
 * @returns {{autores: Array, setAutores: Function}}
 */
export function useAutorContext() {
    const context = useContext(AutorContext);
    if (!context) {
        throw new Error("useAutorContext deve ser usado dentro de um AutorContextProvider");
    }
    return context;
}