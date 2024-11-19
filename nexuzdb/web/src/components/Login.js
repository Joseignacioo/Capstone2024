import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useAuth } from '../context/AuthContext'; // Asegúrate de importar el contexto

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para el indicador de carga
  const { onLogin } = useAuth();
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Activa el indicador de carga

    const result = await onLogin(email, password); // Llama a la función de login

    setIsLoading(false); // Desactiva el indicador de carga

    if (result.error) {
      alert(result.msg); // Muestra el mensaje de error
    } else {
      navigate('/'); // Redirige a la ruta del Home si el login es exitoso
    }
  };

  return (
    <div className="login">
      <div className="card-form">
        <div className="title3">
          <h1 className="poppins-regular">Iniciar Sesión</h1>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-input">
            <label className="poppins-regular">Email:</label>
            <input
              className="poppins-regular"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading} // Desactiva el campo mientras carga
            />
          </div>
          <div className="form-input">
            <label className="poppins-regular">Contraseña:</label>
            <input
              className="poppins-regular"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading} // Desactiva el campo mientras carga
            />
          </div>
          <br />
          <button
            className="btn poppins-regular"
            type="submit"
            disabled={isLoading} // Desactiva el botón mientras carga
          >
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'} {/* Cambia el texto */}
          </button>
        </form>
        {isLoading && <p className="loading poppins-regular">Validando credenciales...</p>}
        {/* Muestra un mensaje opcional */}
      </div>
    </div>
  );
};

export default Login;

