import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Importa tu contexto de autenticación

const icon = require('../../assets/LOGO-NEXUZDB.jpeg'); // Asegúrate de que la ruta sea correcta

export default function HomeScreen({ navigation }) {
  const { logout } = useAuth(); // Obtén la función de logout desde tu contexto

  const onLogout = () => {
    logout(); // Ejecuta el logout cuando se presione el botón
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NEXUZ DB</Text>
      <Image source={icon} style={styles.logo} />
      <Text style={styles.subtitle}>Data Visualization</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Productos')}
      >
        <Text style={styles.buttonText}>Ver Productos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Balanzas')}
      >
        <Text style={styles.buttonText}>Ver Balanzas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Inventarios')}
      >
        <Text style={styles.buttonText}>Ver Inventarios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onLogout} // Llama a la función de logout cuando se presione el botón
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});