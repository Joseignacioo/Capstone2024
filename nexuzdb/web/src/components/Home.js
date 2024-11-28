import React from 'react';
import sampleVideo from '../assets/video.mov';

const Home = () => (
  <div>
    <main>
    <div className="line2"></div>
        <section className="s1">
          <div className="title">
            <h1 className="poppins-light">NexuzDB</h1>
            <p className="poppins-light">
              
            </p>
          </div>
          <video autoPlay loop muted>
              <source src={sampleVideo} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
        </section>
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

export default Home;