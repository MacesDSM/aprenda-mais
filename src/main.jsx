import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { Cursos, Home, Login, Perfil, Sobre, Cadastro, IndicarCurso } from './pages';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='home' element={<Home />}/>
        <Route path='cursos' element={<Cursos />}/>
        <Route path='login' element={<Login />}/>
        <Route path='perfil' element={<Perfil />}/>
        <Route path='sobre' element={<Sobre />}/>
        <Route path='cadastro' element={<Cadastro />} />
        <Route path='indicar' element={<IndicarCurso />} />

        {/* Rota coringa que redireciona para Home */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
