import React, { useEffect, useState } from 'react';

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:4000/api/solicitudes/solicitudes');
        if (!response.ok) {
          throw new Error('Error al obtener las solicitudes');
        }
        const data = await response.json();
        console.log('Datos obtenidos:', data); // Verifica los datos aquí
        setSolicitudes(data.data); // Accede a la propiedad 'data'
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSolicitudes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/api/solicitudes/solicitudes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la solicitud');
      }

      // Actualiza el estado para eliminar la solicitud de la interfaz
      setSolicitudes((prevSolicitudes) => 
        prevSolicitudes.filter((solicitud) => solicitud.id !== id)
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
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
          <h1 className="poppins-regular">SOLICITUDES</h1>
        </div>
        <div className="cards">
          <div className="card-form">
            <table>
              <thead className="poppins-semibold">
                <tr>
                  <th>Correo</th>
                  <th>Nombre</th>
                  <th>Celular</th>
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
                      <td><a href='.'>Notificar</a></td>
                      <td>
                        <button onClick={() => handleDelete(solicitud.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No hay solicitudes disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Solicitudes;
