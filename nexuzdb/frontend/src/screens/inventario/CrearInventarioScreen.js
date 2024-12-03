import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput, Button, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import BalanzaItem from '../../components/balanzaItem';
import { stylesHome } from '../../styles';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

export default function CrearInventarioScreen() {
  const navigation = useNavigation(); 
  const [balanzas, setBalanzas] = useState([]);
  const [productos, setProductos] = useState([]); // Estado para los productos
  const [productoId, setProductoId] = useState('');
  const [balanzaId, setBalanzaId] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Estado de carga para los productos
  

  // Cargar balanzas y productos disponibles al cargar la pantalla
  useEffect(() => {
    fetchBalanzas();
    fetchProductos(); // Llamada para obtener los productos
  }, []);

  // Recargar los productos cada vez que la pantalla recibe foco
  useFocusEffect(
    React.useCallback(() => {
      fetchProductos();  // Recarga la lista de productos cada vez que la pantalla recibe foco
    }, [])
  );

  // Función para obtener la lista de balanzas
  async function fetchBalanzas() {
    try {
      const res = await fetch('https://kmj2ngd23h.execute-api.us-east-2.amazonaws.com/dev/obtener_balanzas');
      const data = await res.json();
      setBalanzas(data);
    } catch (error) {
      console.error("Error al obtener las balanzas:", error);
    }
  }

  // Función para obtener la lista de productos
  async function fetchProductos() {
    try {
      const res = await fetch('https://sasmrjjfbk.execute-api.us-east-2.amazonaws.com/dev/obtener_producto');
      const data = await res.json();
      setProductos(data);
      setIsLoading(false); // Finaliza la carga de productos
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setIsLoading(false); // Termina la carga aunque haya error, para evitar bloqueos
    }
  }

  // Función para crear la vinculación entre producto y balanza
  const CrearVinculacion = async () => {
    if (!productoId || !balanzaId) {
        Alert.alert('Error', 'Por favor, ingresa ambos ID de Producto y de Balanza');
        return;
    }

    try {
        const response = await axios.post('https://7usudnccbf.execute-api.us-east-2.amazonaws.com/dev/crear_vinculacion', {
            producto_id: productoId,
            balanza_id: balanzaId
        });

        if (response.status === 201) {
            Alert.alert('Éxito', 'Inventario creado exitosamente');
            navigation.navigate('NexuzDB');
        }
    } catch (error) {
        console.error('Error al crear la vinculación:', error.response?.data || error.message);
        Alert.alert('Error', error.response?.data?.error || 'Ocurrió un problema al crear la vinculación');
    }
};

  return (
    <View style={stylesHome.container}>
      {/* Formulario para Crear Vinculación */}
      <View>
        <Text style={stylesHome.titulo}>Crear vinculación</Text>
        <TextInput
          style={stylesHome.input}
          placeholder="ID del Producto"
          value={productoId}
          onChangeText={setProductoId}
          keyboardType="numeric"
        />
        <TextInput
          style={stylesHome.input}
          placeholder="ID de la Balanza"
          value={balanzaId}
          onChangeText={setBalanzaId}
          keyboardType="numeric"
        />
        <Button title="VINCULAR" onPress={CrearVinculacion} />
      </View>

      {/* Sección de Productos Disponibles */}
      <View style={{ flex: 1, marginTop: 20 }}>
        <View style={styles.productosHeader}>
          <Text style={stylesHome.productoCantidad}>Productos Disponibles</Text>
          <TouchableOpacity
            style={stylesHome.button_productos}
            onPress={() => navigation.navigate('Productos')}
          >
            <Text style={stylesHome.buttonText_productos}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Mostrar los productos solo cuando se hayan cargado */}
        {!isLoading && productos.length > 0 ? (
          <FlatList
            data={productos}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <Image
                  source={{ uri: `data:image/jpeg;base64,${item.imagen}` }}
                  style={styles.productImage}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productText}># {item.id}</Text>
                  <Text style={styles.productText}>{item.nombre}</Text>
                  <Text style={styles.productText}>Peso: {item.peso_unitario} kg</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
          />
        ) : (
          !isLoading && (
            <Text style={styles.emptyText}>No hay productos disponibles</Text>
          )
        )}
      </View>

      {/* Lista de Balanzas Disponibles */}
      <View>
        <Text style={stylesHome.titulo}>Balanzas disponibles</Text>
        <FlatList
          data={balanzas}
          renderItem={({ item }) => <BalanzaItem item={item} />}
          keyExtractor={(item) => item.balanza_id.toString()}
          ListEmptyComponent={<Text>No hay balanzas disponibles</Text>}
        />
      </View>
    </View>
  );
}

// Estilos para los productos
const styles = StyleSheet.create({
  productosHeader: {
    flexDirection: 'row', // Distribuye los elementos de izquierda a derecha
    justifyContent: 'space-between', // Alinea el texto a la izquierda y el botón a la derecha
    alignItems: 'center',
  },
  productItem: {
    flexDirection: 'column', // Para que la imagen y los textos se acomoden verticalmente
    marginRight: 5, // Espacio entre los elementos
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10, // Espacio entre la imagen y los textos
  },
  productDetails: {
    flex: 1,
  },
  productText: {
    fontSize: 17,
  },
  emptyText: {
    fontSize: 16, // Tamanho visible para el texto
    color: 'gray',
    textAlign: 'center', // Centra el texto
    marginTop: 20, // Separación de los otros elementos
  },
});
