import React, { useState } from 'react';

const CrearUsuario = () => {
  // Estado para almacenar los datos del nuevo usuario
  const [usuario, setUsuario] = useState({
    nombre_usuario: '',
    email: '',
    contrasena: '',
    rol: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://0bqi0nu3gk.execute-api.us-east-2.amazonaws.com/dev/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Error al crear usuario');
      }

      setSuccess('Usuario creado con éxito');
      setUsuario({ nombre_usuario: '', email: '', contrasena: '', rol: '' }); // Limpiar formulario
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main>
      <section className="s3">
        <div className='admin'>
          <div className="links">
            <ul className="poppins-regular btn">
              <li><a href="/dashboard">USUARIOS</a></li>
              <li><a href="/solicitudes">SOLICITUDES</a></li>
              <li><a href="/crearUsuarios">CREAR USUARIO</a></li>
            </ul>
          </div>  
        </div>  
        <div className="title3">
          <h1 className="poppins-regular">CREAR USUARIO</h1>
        </div>
        <div className="cards">
          <div className="card-form">
            <form onSubmit={handleSubmit} className='form'>
              <div className='form-input'>
                <label htmlFor="nombre_usuario">Nombre de Usuario:</label>
                <input 
                  type="text" 
                  id="nombre_usuario" 
                  name="nombre_usuario" 
                  value={usuario.nombre_usuario} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className='form-input'>
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={usuario.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className='form-input'>
                <label htmlFor="contrasena">Contraseña:</label>
                <input 
                  type="password" 
                  id="contrasena" 
                  name="contrasena" 
                  value={usuario.contrasena} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className='form-input'>
                <label htmlFor="rol">Rol:</label>
                <input 
                  type="text" 
                  id="rol" 
                  name="rol" 
                  value={usuario.rol} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <br />
              <button type="submit">Crear Usuario</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CrearUsuario;
