import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useEffect, useState } from 'react';

const icon = require('./assets/LOGO-NEXUZDB.jpeg');

export default function App() {
  const [productos, setProductos] = useState([]);
  const [balanzas, setBalanzas] = useState([]);
  const [inventarios, setInventarios] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [productosRes, balanzasRes, inventariosRes] = await Promise.all([
        fetch("http://192.168.100.5:3000/api/producto/productos"),
        fetch("http://192.168.100.5:3000/api/balanza/balanzas"),
        fetch("http://192.168.100.5:3000/api/inventario/inventarios"),
      ]);

      if (!productosRes.ok || !balanzasRes.ok || !inventariosRes.ok) {
        throw new Error('Error en la solicitud');
      }

      const productosData = await productosRes.json();
      const balanzasData = await balanzasRes.json();
      const inventariosData = await inventariosRes.json();

      setProductos(productosData);
      setBalanzas(balanzasData);
      setInventarios(inventariosData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
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
  const renderBalanza = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.productoNombre}>Nombre: {item.nombre_balanza}</Text>
      <Text style={styles.productoNombre}>id: {item.id_unico}</Text>
      <Text style={styles.productoNombre}>capacidad_max: {item.capacidad_maxima} gr</Text>
    </View>
  );
  const renderInventario = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.productoNombre}>id: {item.inventario_id}</Text>
      <Text style={styles.productoNombre}>balanza: {item.balanza_id}</Text>
      <Text style={styles.productoNombre}>cantidad: {item.cantidad} gr</Text>
      <Text style={styles.productoNombre}>fecha_registro: {item.fecha_registro}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NEXUZ DB</Text>
      <Image source={icon} style={styles.logo} />
      
      <Text style={styles.subtitle}>Data Visualization</Text>
      
      <TouchableOpacity
        onPress={() => alert('hola')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <FlatList
        data={productos}
        renderItem={renderProducto}
        keyExtractor={(item) => item.producto_id.toString()}
        ListEmptyComponent={<Text>No hay productos disponibles</Text>}
      />
      <FlatList
        data={balanzas}
        renderItem={renderBalanza}
        keyExtractor={(item) => item.balanza_id.toString()} 
        ListEmptyComponent={<Text>No hay productos disponibles</Text>}
      />
      <FlatList
        data={inventarios}
        renderItem={renderInventario}
        keyExtractor={(item) => item.inventario_id.toString()}
        ListEmptyComponent={<Text>No hay productos disponibles</Text>} 
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // para Android
  },
  productoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});