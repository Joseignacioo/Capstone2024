import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Si tienes un componente de navegación separado
import Home from './components/Home';
import Solicitudes from './components/Solicitudes';
import Admin from './components/Admin';
import CrearUsuarios from './components/CrearUsuarios';
import Contacto from './components/Contacto';
import Nosotros from './components/Nosotros'


const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Admin />} />
      <Route path="/solicitudes" element={<Solicitudes />} />
      <Route path="/CrearUsuarios" element={<CrearUsuarios />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/nosotros" element={<Nosotros />} />
    </Routes>
  </Router>
);

export default App;


