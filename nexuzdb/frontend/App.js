import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList } from 'react-native';
import { useEffect, useState } from 'react';

const icon = require('./assets/LOGO-NEXUZDB.jpeg');

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("http://192.168.100.5:3000/api/v1/productos");
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }

  // Renderizar cada producto
  const renderProducto = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.productoNombre}>Nombre: {item.nombre_producto}</Text>
      <Text style={styles.productoNombre}>Desc: {item.descripcion}</Text>
      <Text style={styles.productoNombre}>Peso: {item.peso_unitario} gr</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NEXUZ DB</Text>
      <Image source={icon} style={styles.logo} />
      
      <Text style={styles.subtitle}>Data Visualization</Text>
      
      <TouchableHighlight
        onPress={() => alert('hola')}
        style={styles.button}
        underlayColor="#555"
      >
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableHighlight>

      {/* Lista de productos */}
      <FlatList
        data={todos}
        renderItem={renderProducto}
        keyExtractor={(item) => item.usuario_id} // Usar un id único como clave
        ListEmptyComponent={<Text>No hay productos disponibles</Text>} // Mensaje si no hay productos
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  title: {
    padding: 10,
    fontSize: 40,
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
    width: 150,
    height: 50,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 10,
    width: '90%',
  },
  productoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});