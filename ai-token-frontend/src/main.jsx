import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Checkauth from './components/checkauth.jsx'
import Navbar from './components/navbar.jsx'
import Tokens from './pages/tokens.jsx'
import Tokendetails from './pages/token.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/Signup.jsx'
import Admin from './pages/admin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className="min-h-screen bg-base-200 text-base-content">
        <Navbar />
        <Routes>
          <Route 
          path='/'
          element={
            <Checkauth protectedRoute={true}>
              <Tokens />
            </Checkauth>
          }
          />
          <Route 
          path='/tokens/:id'
          element={
            <Checkauth protectedRoute={true}>
              <Tokendetails />
            </Checkauth>
          }
          />
          <Route 
          path='/login'
          element={
            <Checkauth protectedRoute={false}>
              <Login />
            </Checkauth>
          }
          />
          <Route 
          path='/signup'
          element={
            <Checkauth protectedRoute={false}>
              <Signup />
            </Checkauth>
          }
          />
          <Route 
          path='/admin'
          element={
            <Checkauth protectedRoute={true}>
              <Admin />
            </Checkauth>
          }
          />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
