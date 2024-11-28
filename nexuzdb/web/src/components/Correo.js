import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Correo = () => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    text: '',
  });
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    if (email) {
      setEmailData((prev) => ({ ...prev, to: email }));
    }
  }, [location]);

  const sendEmail = async () => {
    setMessage(''); // Limpiar mensajes previos
    if (!emailData.to || !emailData.subject || !emailData.text) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await axios.post(
        'https://tgbhqmmvo3.execute-api.us-east-2.amazonaws.com/dev/sendemail',
        emailData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setMessage(response.data.message); // Mostrar mensaje de éxito
    } catch (error) {
      console.error('Error al enviar el correo:', error.response || error);
      setMessage('Error al enviar el correo. Revisa los datos e intenta nuevamente.');
    }
  };

  return (
    <main>
      <section className="s3">
        <div className="admin">
          <div className="links">
            <ul className="poppins-regular btn">
              <li><a href="/dashboard">USUARIOS</a></li>
              <li><a href="/solicitudes">SOLICITUDES</a></li>
              <li><a href="/crearUsuarios">CREAR USUARIO</a></li>
            </ul>
          </div>
        </div>
        <div className="title3">
          <h1 className="poppins-regular">NOTIFICAR</h1>
        </div>
        <div className="cards">
          <div className="card-form poppins-regular">
            <div className="form poppins-regular">
              <h1>Enviar Notificación por Correo</h1>
              <div className="form-input">
                <label htmlFor="to">Correo destinatario:</label>
                <input
                  type="email"
                  id="to"
                  className="poppins-regular"
                  value={emailData.to}
                  onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                  readOnly
                />
              </div>
              <div className="form-input">
                <label htmlFor="subject">Asunto:</label>
                <input
                  type="text"
                  id="subject"
                  className="poppins-regular"
                  placeholder="Escribe el asunto"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                />
              </div>
              <div className="form-input">
                <label htmlFor="text">Mensaje:</label>
                <textarea
                  id="text"
                  className="poppins-regular"
                  placeholder="Escribe tu mensaje"
                  value={emailData.text}
                  onChange={(e) => setEmailData({ ...emailData, text: e.target.value })}
                />
              </div>
              <div className="form-input">
                <button className="poppins-regular" onClick={sendEmail}>Enviar Correo</button>
                {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Correo;
