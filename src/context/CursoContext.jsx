import { createContext, useContext, useState } from "react";
import { CursoService } from "../service";

const CursoContext = createContext({});
const cursoService = new CursoService();


export function CursoContextProvider({children}) {

    const [cursos, setCursos] = useState(cursoService.findAll());

    return (
        <CursoContext.Provider value={{cursos, setCursos}}>
            {children}
        </CursoContext.Provider>
    )
}

/**
 * 
 * @returns {{cursos: Array, setCursos: Function}}
 */
export function useCursoContext() {
    const context = useContext(CursoContext);
    if (!context) {
        throw new Error("useCursoContext deve ser usado dentro de um CursoContextProvider");
    }
    return context;
}