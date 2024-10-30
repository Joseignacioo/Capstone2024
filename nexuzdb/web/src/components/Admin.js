import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/style.css';

const Admin = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Llama a la API para obtener todos los usuarios
        const response = await axios.get('http://192.168.56.1:4000/api/user/users'); // Cambia a la URL de tu servidor
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
            <h1 className="poppins-regular">USUARIOS</h1>
          </div>
          <div className="cards">
            <div className="card-form">
              <table>
                <thead className="poppins-semibold">
                  <tr>
                    <th>Correo</th>
                    <th>Nombre</th>
                    <th>Notificar</th>
                  </tr>
                </thead>
                <tbody className="poppins-regular">
                  {users.map(user => (
                    <tr key={user.usuario_id}>
                      <td>{user.email}</td>
                      <td>{user.nombre_usuario}</td>
                      <td><a href="/">Notificar</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;