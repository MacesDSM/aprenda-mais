import './index.css'
import { UsuarioService } from './service'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { mock } from './service/LoadMock.mjs'
import { App } from './App'
import { AuthContextProvider, CursoContextProvider } from './context'

// Usar para testar c/ dados falsos
const service = new UsuarioService();

if(service.count() <= 1) {
  mock();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <CursoContextProvider>
        <App />
      </CursoContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
