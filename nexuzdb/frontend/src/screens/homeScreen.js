import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Importa tu contexto de autenticación
import InventarioItem from '../components/InventarioItem';
import { styles } from '../styles';

export default function HomeScreen({ navigation }) {
  const { logout } = useAuth(); // Obtén la función de logout desde tu contexto

  // const onLogout = () => {
  //   logout(); // Ejecuta el logout cuando se presione el botón
  // };

  const [inventarios, setInventarios] = useState([]);

  useEffect(() => {
    fetchInventarios();
  }, []);

  async function fetchInventarios() {
    try {
      const res = await fetch('http://192.168.100.5:3000/api/inventario/inventarios');
      const data = await res.json();
      setInventarios(data);
    } catch (error) {
      console.error("Error al obtener los inventarios:", error);
    }
  }

  return (
    <View style={styles1.container}>
      <TouchableOpacity
        style={styles1.button_create}
        onPress={() => navigation.navigate('CrearVinculacion')}
      >
        <Text style={styles1.buttonText_create}>vinculacion</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Productos')}
      >
        <Text style={styles1.buttonText}>Productos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CrearProductos')}
      >
        <Text style={styles1.buttonText}>Crear</Text>
      </TouchableOpacity>

      <View style={styles1.container}>
        <FlatList
          data={inventarios}
          renderItem={({ item }) => <InventarioItem item={item} />}
          keyExtractor={(item) => item.inventario_id.toString()}
          ListEmptyComponent={<Text>No hay inventarios disponibles</Text>}
        />
      </View>
      <View>
      <Text style={styles.title}>Historial de retiros</Text>
        </View>      
    </View>
  );
}

const styles1 = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button_create: {
    position: 'absolute', // Posiciona el botón de manera absoluta
    top: 10,              // Distancia desde la parte superior
    right: 10,            // Distancia desde la parte derecha
    backgroundColor: 'green',
    width: 150,
    height: 50,
    borderRadius: 30,     // Hace el botón circular
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,            // Asegura que el botón esté sobre otros elementos
  },
  button: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonText_create: {
    color: 'white',
    fontSize: 20,
  },
});