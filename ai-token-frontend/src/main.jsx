import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Checkauth from './components/checkauth.jsx'
import Tokens from './pages/tokens.jsx'
import Tokendetails from './pages/token.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/Signup.jsx'
import Admin from './pages/admin.jsx'

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
       <Route 
       path='/login'
       element={
        <Checkauth protected={false}>
          <Login />
        </Checkauth>
       }
       />
       <Route 
       path='/signup'
       element={
        <Checkauth protected={false}>
          <Signup />
        </Checkauth>
       }
       />

       <Route 
       path='/admin'
       element={
        <Checkauth protected={true}>
          <Admin />
        </Checkauth>
       }
       />

    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
