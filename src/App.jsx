import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ExclusiveLayout, PerfilMiddleWare, PublicLayout } from "./components/layout";
import { Administrador, Autor, AutorDashboard, Cadastro, CursoDashboard, Cursos, Home, Login, Sobre } from "./pages";
import { tipoUsuario } from "./service/TipoUsuario.mjs";
import { useAuthContext } from "./context";

export function App() {
    // Estado global do usuário logado, usado aqui para remontar o componente em caso de login e logout
    const { usuario } = useAuthContext();

    return (
        <BrowserRouter key={usuario}>
            <Routes>
                {/* Rotas públicas */}
                <Route path='home' element={<Home />}/>
                <Route path='cursos' element={<Cursos />}/>
                <Route path='sobre' element={<Sobre />}/>

                {/* Rotas exclusivamente para usuários não logados */}
                <Route element={<PublicLayout />}>
                    <Route path='login' element={<Login />}/>
                    <Route path='cadastro' element={<Cadastro />}/>
                </Route>

                {/* Rotas exclusivamente para estudantes logados */}
                <Route path='perfil' element={<PerfilMiddleWare />} />

                {/* Rotas exclusivamente para autores logados */}
                <Route element={<ExclusiveLayout role={tipoUsuario.autor} />}>
                    <Route path='autor' element={<Autor />}/>
                </Route>

                {/* Rotas exclusivamente para administradores */}
                <Route element={<ExclusiveLayout role={tipoUsuario.admin} />}>
                    <Route path='administrador' element={<Administrador />}>
                        <Route index element={<CursoDashboard />} />
                        <Route path="cursos" index element={<CursoDashboard />} />
                        <Route path="autores" element={<AutorDashboard />} />
                    </Route>

                </Route>

                {/* Rota coringa que redireciona para Home */}
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </BrowserRouter>
    )
}