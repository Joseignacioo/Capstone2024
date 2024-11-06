import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import { useAuth } from '../context/AuthContext'; // Asegúrate de importar el contexto de autenticación

const Navbar = () => {
  const { authState, onLogout } = useAuth(); // Obtener el estado de autenticación y la función de logout
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleLogout = () => {
    onLogout(); // Llama a la función de logout desde el contexto
    navigate('/'); // Redirige al Home después de cerrar sesión
  };

  return (
    <nav>
      <h2 className="poppins-light">NEXUZ<span>DB</span></h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/nosotros">Nosotros</Link></li>

        {authState.authenticated ? (
          <>
            <li><Link to="/dashboard">ADMIN</Link></li>
            <li><button className='poppins-light' onClick={handleLogout}>Cerrar Sesión</button></li>
          </>
        ) : (
          <li><Link to="/login">Iniciar Sesión</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
