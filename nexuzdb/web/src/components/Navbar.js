import React from 'react';
import '../styles/style.css';

const Navbar = () => (
  <nav>
    <h2 className="poppins-light">NEXUZ<span>DB</span></h2>
    <div className="links">
      <ul className="poppins-regular">
        <li><a href="/">INICIO</a></li>
        <li><a href="/nosotros">NOSOTROS</a></li>
        <li><a href="/contacto">CONTACTANOS</a></li>
        <li><a href="/dashboard">ADMIN</a></li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
