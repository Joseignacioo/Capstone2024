import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TOKEN_KEY = "my-jwt";
const API_URL = "https://v641bmhf7f.execute-api.us-east-2.amazonaws.com/dev/login";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: false,
    role: null,  // Añadir el rol al estado
  });

  useEffect(() => {
    const loadToken = () => {
      const token = localStorage.getItem('my-jwt');
      const role = localStorage.getItem('role');  // Recupera el rol
  
      if (token && role) {
          // Si se encuentran el token y el rol, actualiza el estado de autenticación
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setAuthState({ token, authenticated: true, role: role });
      } else {
          setAuthState({ token: null, authenticated: false, role: null });
      }
  };
  
    loadToken();
  }, []);

  const login = async (email, password) => {
    try {
        const result = await axios.post(API_URL, { email, contrasena: password });
        if (result.data.success) {
            const { token, user } = result.data;
            setAuthState({ token, authenticated: true, role: user.rol });
            // Guarda el token y el rol en localStorage
            localStorage.setItem('my-jwt', token);
            localStorage.setItem('role', user.rol);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            return result.data;
        } else {
            return { error: true, msg: result.data.message };
        }
    } catch (e) {
        if (e.response) {
            return { error: true, msg: e.response.data.msg || 'Error desconocido' };
        } else {
            return { error: true, msg: 'Error de red o servidor' };
        }
    }
};


  const logout = async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('role');  // Eliminar el rol al cerrar sesión
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({ token: null, authenticated: false, role: null });
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
