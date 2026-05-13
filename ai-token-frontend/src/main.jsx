import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Checkauth from './components/checkauth.jsx'
import Tokens from './pages/tokens.jsx'
import Tokendetails from './pages/token'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
       <Route 
       path='/'
       element={
        <Checkauth protected={true}>
          <Tokens />
        </Checkauth>
       }
       />
       <Route 
       path='/tokens/:id'
       element={
        <Checkauth protected={true}>
          <Tokendetails />
        </Checkauth>
       }
       />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
