import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { authState, onLogout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setMenuOpen(false); // Cierra el menú después de cerrar sesión
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState); // Alterna el estado del menú
  };

  return (
    <nav>
      <h2 className="poppins-light">
        NEXUZ<span>DB</span>
      </h2>
      <div
        className="menu-icon"
        onClick={toggleMenu}
        role="button"
        aria-label="Toggle Menu"
        tabIndex={0}
      >
        &#9776; {/* Ícono del menú hamburguesa */}
      </div>
      <ul className={menuOpen ? 'active' : '' }>
        <li className='poppins-regular'>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li className='poppins-regular'>
          <Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link>
        </li>
        <li className='poppins-regular'>
          <Link to="/nosotros" onClick={() => setMenuOpen(false)}>Nosotros</Link>
        </li>

        {authState.authenticated ? (
          <>
            <li className='poppins-regular'>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>ADMIN</Link>
            </li>
            <li>
              <button className='poppins-regular btnc' onClick={handleLogout}>CERRAR SESIÓN</button>
            </li>
          </>
        ) : (
          <li className='poppins-regular'>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Iniciar Sesión</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
