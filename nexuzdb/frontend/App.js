import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/homeScreen';
import ProductosScreen from './src/screens/productosScreen';
import BalanzasScreen from './src/screens/balanzasScreen';
import InventariosScreen from './src/screens/inventariosScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Productos" component={ProductosScreen} />
        <Stack.Screen name="Balanzas" component={BalanzasScreen} />
        <Stack.Screen name="Inventarios" component={InventariosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}