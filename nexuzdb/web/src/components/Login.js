import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import { useAuth } from '../context/AuthContext';  // Asegúrate de importar el contexto

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin } = useAuth();
  const navigate = useNavigate();  // Inicializa useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await onLogin(email, password);  // Llama a la función de login

    if (result.error) {
      alert(result.msg);  // Muestra el mensaje de error
    } else {
      // Redirecciona al Home si el login es exitoso
      navigate('/');  // Redirige a la ruta del Home
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
