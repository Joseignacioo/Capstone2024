import React, { useState } from 'react';

const CrearUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [celular, setCelular] = useState('');
    const [error, setError] = useState(null); // Estado para manejar errores
    const [successMessage, setSuccessMessage] = useState(null); // Estado para manejar mensajes de éxito

    const handleSubmit = async (e) => {
        e.preventDefault();

        const usuarioData = {
            nombre, // Usa los nombres de campos correctos
            apellido,
            correo,
            celular
        };

        try {
            const response = await fetch('https://n4k38zqpv6.execute-api.us-east-2.amazonaws.com/dev/solicitudes', { // Nueva URL del API Gateway
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioData),
            });

            if (!response.ok) {
                throw new Error('Error en la creación del usuario');
            }

            const data = await response.json();
            console.log('Usuario creado:', data);
            setSuccessMessage('Solicitud Realizada'); // Mensaje de éxito
            setError(null); // Limpia el error si fue exitoso

            // Reinicia los campos después de un envío exitoso
            setNombre('');
            setApellido('');
            setCorreo('');
            setCelular('');

        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setError(error.message); // Establece el mensaje de error
        }
    };

    return (
        <div>
            <main>
                <section className="s3">
                    <div className="line2"></div>
                    <div className="title2">
                        <h1 className="poppins-regular">Quieres Ser parte de NexuzDB?</h1>
                    </div>
                    <div className="cards">
                        <div className="card-form">
                            <form className="poppins-regular" onSubmit={handleSubmit}>
                                <div className="form">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input 
                                        type="text" 
                                        id="nombre" 
                                        placeholder="Ingrese su Nombre" 
                                        value={nombre} 
                                        onChange={(e) => setNombre(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form">
                                    <label htmlFor="apellido">Apellido</label>
                                    <input 
                                        type="text" 
                                        id="apellido" 
                                        placeholder="Ingrese su Apellido" 
                                        value={apellido} 
                                        onChange={(e) => setApellido(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form">
                                    <label htmlFor="correo">Correo</label>
                                    <input 
                                        type="email" 
                                        id="correo" 
                                        placeholder="Ingrese su Correo" 
                                        value={correo} 
                                        onChange={(e) => setCorreo(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form">
                                    <label htmlFor="celular">Celular</label>
                                    <input 
                                        type="text" 
                                        id="celular" 
                                        placeholder="Ingrese su Celular" 
                                        value={celular} 
                                        onChange={(e) => setCelular(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form">
                                    <input className="btn poppins-semibold" type="submit" value="Enviar" />
                                </div>
                                {error && <p className="error-message">{error}</p>} {/* Muestra el mensaje de error */}
                                {successMessage && <p className="success-message">{successMessage}</p>}
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <footer>
                <section className="s4">
                    <ul>
                        <li className="poppins-semibold"><h3>NexuzDB</h3></li>
                        <li className="poppins-regular">DuocUC Antonio Varas, providencia</li>
                        <li className="poppins-regular">todos los derechos @NexuzDB 2024</li>
                    </ul>
                    <ul>
                        <li className="poppins-semibold">Conocenos</li>
                        <div className="line"></div>
                        <li className="poppins-regular"><a href="/">Nuestra empresa</a></li>
                        <li className="poppins-regular"><a href="/">Unidades de negocio</a></li>
                        <li className="poppins-regular"><a href="/">Trabaja con nosotros</a></li>
                    </ul>
                    <ul>
                        <li className="poppins-semibold">Sostenibilidad</li>
                        <div className="line"></div>
                        <li className="poppins-regular"><a href="/">Modelo empresa</a></li>
                        <li className="poppins-regular"><a href="/">Inversionistas</a></li>
                    </ul>
                </section>
            </footer>
        </div>
    );
};

export default CrearUsuario;
