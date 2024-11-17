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
    <div className='login'>
      <div className='card-form'>
      <div className="title3">
          <h1 className="poppins-regular">Iniciar Sesión</h1>
        </div>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-input'>
          <label className='poppins-regular'>Email:</label>
          <input className='poppins-regular'
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className='form-input'>
          <label  className='poppins-regular'>Contraseña:</label>
          <input className='poppins-regular'
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <br></br>
        <button className='btn poppins-regular' type="submit">Iniciar Sesión</button>
      </form>
      </div>
    </div>
  );
};

export default Login;
