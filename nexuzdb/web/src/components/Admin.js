import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/style.css';

const Admin = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Llama a la API para obtener todos los usuarios
        const response = await axios.get('https://wly5abxnyd.execute-api.us-east-2.amazonaws.com/dev/users'); // Nueva URL del API Gateway
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
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
            <h1 className="poppins-regular">USUARIOS</h1>
          </div>
          <div className="cards">
          <div className="card-form">
            <div className="table-wrapper"> {/* Contenedor para habilitar el deslizamiento */}
              <table>
                <thead className="poppins-semibold">
                  <tr>
                    <th>ID</th>
                    <th>Correo</th>
                    <th>Nombre</th>
                    <th>Rol</th>
                  </tr>
                </thead>
                <tbody className="poppins-regular">
                  {users.map(user => (
                    <tr key={user.usuario_id}>
                      <td>{user.usuario_id}</td>
                      <td>{user.email}</td>
                      <td>{user.nombre_usuario}</td>
                      <td>{user.rol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
