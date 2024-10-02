import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProductosScreen from './src/screens/ProductosScreen';
import BalanzasScreen from './src/screens/BalanzasScreen';
import InventariosScreen from './src/screens/InventariosScreen';
import CrearProductoScreen from './src/screens/CrearProductoScreen';
import CrearInventarioScreen from './src/screens/CrearInventarioScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { authState } = useAuth();

  return (
    <Stack.Navigator initialRouteName="Home">
      {authState?.authenticated ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Productos" component={ProductosScreen} />
          <Stack.Screen name="Balanzas" component={BalanzasScreen} />
          <Stack.Screen name="Inventarios" component={InventariosScreen} />
          <Stack.Screen name="CrearProductos" component={CrearProductoScreen} />
          <Stack.Screen name="CrearVinculacion" component={CrearInventarioScreen} />
          
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