import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { Cursos, Home, IndicarCurso, Login, Perfil, Sobre, Cadastro } from './pages'
import { mock } from './service/LoadMock.mjs'

// Usar para testar c/ dados falsos
mock();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='home' element={<Home />}/>
        <Route path='cursos' element={<Cursos />}/>
        <Route path='indicar-curso' element={<IndicarCurso />}/>
        <Route path='login' element={<Login />}/>
        <Route path='perfil' element={<Perfil />}/>
        <Route path='sobre' element={<Sobre />}/>
        <Route path='cadastro' element={<Cadastro />} />


        {/* Rota coringa que redireciona para Home */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
