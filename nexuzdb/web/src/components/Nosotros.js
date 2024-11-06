import React from 'react';
import logo from '../assets/image2.png';
import logo2 from '../assets/image1.png';



const Nosotros = () => (
  <div>
    <main>
      <div className="line2"></div>
        <section className="s1">
          <div className="title">
            <h1 className="poppins-light">Nosotros</h1>
            <p className="poppins-light">
              Somos un equipo que busca ayudar a los procesos manuales de las bodegas actualmente, a traves de la automatizacion del historial de inventarios
            </p>
          </div>
          <div>
            <img src={logo} alt="Logo de NexuzDB" />
            <img src={logo2} alt="Logo de NexuzDB" />
          </div>
        </section>
        {/* Agrega más secciones según el diseño original */}
      </main>
      <footer>
                <section className="s4">
                    <ul>
                        <li className="poppins-semibold"><h3>NexuzDB</h3></li>
                        <li className="poppins-regular">DuocUC Antonio Varas, providencia</li>
                        <li className="poppins-regular">todos los derechos @NexuzDB 2024</li>
                    </ul>
                    <ul>
                        <li className="poppins-semibold">Conocenos</li>
                        <div className="line"></div>
                        <li className="poppins-regular"><a href="/">Nuestra empresa</a></li>
                        <li className="poppins-regular"><a href="/">Unidades de negocio</a></li>
                        <li className="poppins-regular"><a href="/">Trabaja con nosotros</a></li>
                    </ul>
                    <ul>
                        <li className="poppins-semibold">Sostenibilidad</li>
                        <div className="line"></div>
                        <li className="poppins-regular"><a href="/">Modelo empresa</a></li>
                        <li className="poppins-regular"><a href="/">Inversionistas</a></li>
                    </ul>
                </section>
            </footer>

  </div>
  
  
);

export default Nosotros;
