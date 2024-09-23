import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

const icon = require('../../assets/LOGO-NEXUZDB.jpeg'); // Asegúrate de que la ruta sea correcta

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NEXUZ DB</Text>
      <Image source={icon} style={styles.logo} />

      <Text style={styles.subtitle}>Data Visualization</Text>

      {/* Botón para ir a la pantalla de Productos */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Productos')}
      >
        <Text style={styles.buttonText}>Ver Productos</Text>
      </TouchableOpacity>

      {/* Botón para ir a la pantalla de Balanzas */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Balanzas')}
      >
        <Text style={styles.buttonText}>Ver Balanzas</Text>
      </TouchableOpacity>

      {/* Botón para ir a la pantalla de Inventarios */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Inventarios')}
      >
        <Text style={styles.buttonText}>Ver Inventarios</Text>
      </TouchableOpacity>
    </View>
  );
}