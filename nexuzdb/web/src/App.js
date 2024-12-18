import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Solicitudes from './components/Solicitudes';
import Admin from './components/Admin';
import CrearUsuarios from './components/CrearUsuarios';
import Contacto from './components/Contacto';
import Nosotros from './components/Nosotros';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Correo from './components/Correo';

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Solicitudes" element={<Solicitudes />} />
        <Route path="/CrearUsuario" element={<CrearUsuarios />} />
        <Route path="/Correo" element={<Correo />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/Login" element={<Login />} />

        {/* Rutas protegidas para admins */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/solicitudes" 
          element={
            <ProtectedRoute>
              <Solicitudes />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/CrearUsuarios" 
          element={
            <ProtectedRoute>
              <CrearUsuarios />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/enviarCorreo" 
          element={
            <ProtectedRoute>
              <Correo />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
