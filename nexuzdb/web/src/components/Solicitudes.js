import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await fetch('https://4z2c32msrl.execute-api.us-east-2.amazonaws.com/dev/solicitudes');
        if (!response.ok) {
          throw new Error('Error al obtener las solicitudes');
        }
        const data = await response.json();
        console.log('Datos obtenidos:', data);
        setSolicitudes(data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSolicitudes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://4z07bcdkr1.execute-api.us-east-2.amazonaws.com/dev/delsolicitudes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la solicitud');
      }

      setSolicitudes((prevSolicitudes) =>
        prevSolicitudes.filter((solicitud) => solicitud.id !== id)
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNotificar = (correo) => {
    navigate(`/enviarCorreo?email=${correo}`);
  };

  const handleCrearUsuario = (correo, nombre, apellido) => {
    // Redirigir al formulario de creación de usuarios con los datos predefinidos en la URL
    navigate(`/crearUsuarios?correo=${correo}&nombre=${nombre}&apellido=${apellido}`);
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
          <h1 className="poppins-regular">SOLICITUDES</h1>
        </div>
        <div className="cards">
          <div className="card-form">
            <div className="table-wrapper">
              <table>
                <thead className="poppins-semibold">
                  <tr>
                    <th>Correo</th>
                    <th>Nombre</th>
                    <th>Celular</th>
                    <th>Crear Usuario</th>
                    <th>Notificar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody className="poppins-regular">
                  {solicitudes.length > 0 ? (
                    solicitudes.map((solicitud) => (
                      <tr key={solicitud.id}>
                        <td>{solicitud.correo}</td>
                        <td>{`${solicitud.nombre} ${solicitud.apellido}`}</td>
                        <td>{solicitud.celular}</td>
                        <td>
                          <button onClick={() => handleCrearUsuario(solicitud.correo, solicitud.nombre, solicitud.apellido)}>Crear Usuario</button>
                        </td>
                        <td>
                          <button onClick={() => handleNotificar(solicitud.correo)}>Notificar</button>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(solicitud.id)}>Eliminar</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No hay solicitudes disponibles</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Solicitudes;
