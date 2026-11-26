import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { Cursos, Home, Login, Perfil, Sobre, Cadastro, Autor, Administrador } from './pages'
import { mock } from './service/LoadMock.mjs'
import { UsuarioService } from './service'
import { ExclusiveLayout, PublicLayout } from './components/layout'
import { tipoUsuario } from './service/TipoUsuario.mjs'

// Usar para testar c/ dados falsos
const service = new UsuarioService();

if(service.count() < 1) {
  mock();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
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
        <Route element={<ExclusiveLayout role={tipoUsuario.estudante} />}>
          <Route path='perfil' element={<Perfil />}/>
        </Route>

        {/* Rotas exclusivamente para autores logados */}
        <Route element={<ExclusiveLayout role={tipoUsuario.autor} />}>
          <Route path='autor' element={<Autor />}/>
        </Route>

        {/* Rotas exclusivamente para administradores */}
        <Route element={<ExclusiveLayout role={tipoUsuario.admin} />}>
          <Route path='administrador' element={<Administrador />} />
        </Route>

        {/* Rota coringa que redireciona para Home */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
