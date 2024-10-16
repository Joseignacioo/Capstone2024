import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import HomeScreen from './src/screens/homeScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import ProductosScreen from './src/screens/producto/ProductosScreen';
import CrearProductoScreen from './src/screens/producto/CrearProductoScreen';
import CrearInventarioScreen from './src/screens/inventario/CrearInventarioScreen';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { authState, onLogout } = useAuth();

  return (
    <Stack.Navigator initialRouteName="NexuzDB" >
      {authState?.authenticated ? (
        <>
          {/* Configuramos el botón de cerrar sesión en el header de la pantalla Home */}
          <Stack.Screen 
            name="NexuzDB" 
            component={HomeScreen}
            options={{
              title: 'NexuzDB', // Título en el header
              headerRight: () => (
                <TouchableOpacity onPress={onLogout} style={{ marginRight: 15 }}>
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>Cerrar sesión</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name="Productos" component={ProductosScreen} />
          <Stack.Screen name="CrearProductos" component={CrearProductoScreen} />
          <Stack.Screen name="Vinculacion" component={CrearInventarioScreen} />
          
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}