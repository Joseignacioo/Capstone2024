import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('my-jwt');  // Recupera el token de localStorage
    const role = localStorage.getItem('role');    // Recupera el rol de localStorage

    console.log("Token:", token);   // Verifica el token
    console.log("Role:", role);     // Verifica el rol

    // Si no hay token o si el rol no es 'admin', redirige al login o al home
    if (!token || role !== 'admin') {
        console.log("Redirigiendo al Home..."); // Imprime mensaje de redirección
        return <Navigate to="/" />;
    }

    return children;  // Si está autenticado y tiene rol de admin, muestra el contenido protegido
};

export default ProtectedRoute;
