import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Correo = () => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: 'Notificación',
    text: 'Este es un correo de notificación.',
  });
  const [message, setMessage] = useState('');
  const location = useLocation(); // Hook para obtener la ubicación

  useEffect(() => {
    // Obtener el correo de los parámetros de la URL
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    if (email) {
      setEmailData((prevState) => ({ ...prevState, to: email }));
    }
  }, [location]);

  const sendEmail = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/email/send', emailData);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      setMessage('Error al enviar el correo');
    }
  };

  return (
    <div>
      <main>
        <section className="s3">
          <nav>
            <div className="links">
              <ul className="poppins-regular btn">
                <li><a href="/dashboard">USUARIOS</a></li>
                <li><a href="/solicitudes">SOLICITUDES</a></li>
                <li><a href="/crearUsuarios">CREAR USUARIO</a></li>
              </ul>
            </div>
          </nav>
          <div className="title3">
            <h1 className="poppins-regular">NOTIFICAR</h1>
          </div>
          <div className="cards">
            <div className="card-form poppins-regular">
              <div className="form poppins-regular">
                <h1>Enviar Notificación por Correo</h1>
                <input className='poppins-regular'
                  type="email"
                  placeholder="Correo destinatario"
                  value={emailData.to}
                  onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                />
              </div>
              <div className='form'>
              <input className='poppins-regular'
                  type="text"
                  placeholder="Asunto"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                />
              </div>
              <div className='form'>
                <textarea className='poppins-regular'
                  placeholder="Escribe tu mensaje"
                  value={emailData.text}
                  onChange={(e) => setEmailData({ ...emailData, text: e.target.value })}
                />
              </div>
              <div className='form' >
                <button className='poppins-regular' onClick={sendEmail}>Enviar Correo</button>
                {message && <p>{message}</p>}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Correo;
