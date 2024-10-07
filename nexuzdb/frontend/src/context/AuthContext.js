import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "my-jwt";
export const API_URL = "https://v641bmhf7f.execute-api.us-east-2.amazonaws.com/dev/login";
const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: false,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({ token, authenticated: true });
      } else {
        setAuthState({ token: null, authenticated: false });
      }
    };
    loadToken();
  }, []);

  const register = async (email, password) => {
    try {
      return await axios.post(`${API_URL}/register`, { email, password });
    } catch (e) {
      return { error: true, msg: e.response.data.msg };
    }
  };

  const login = async (email, password) => {
    try {
      const result = await axios.post(`${API_URL}`, { email: email, contrasena: password });
      setAuthState({ token: result.data.token || "token", authenticated: true });
      axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      return result;
    } catch (e) {

      if (e.response) {
        return { error: true, msg: e.response.data.msg || 'Error desconocido' };
      } else {
        return { error: true, msg: 'Error de red o servidor' };
      }
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({ token: null, authenticated: false });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};