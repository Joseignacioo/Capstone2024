import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function CrearProductoScreen({ navigation }) {
  const [producto_id, setProductoId] = useState('');
  const [nombre_producto, setNombreProducto] = useState('');
  const [codigo_barras, setCodigoBarras] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [peso_unitario, setPesoUnitario] = useState('');
  const [categoria, setCategoria] = useState('');

  const crearProducto = async () => {
    try {
      const response = await axios.post('http://192.168.100.5:3000/api/producto/create', {
        producto_id,
        nombre_producto,
        codigo_barras,
        descripcion,
        peso_unitario,
        categoria,
      });

      if (response.status === 201) {
        Alert.alert('Éxito', 'Producto creado exitosamente');
        navigation.navigate('Productos');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al crear el producto');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Producto</Text>

      <TextInput
        style={styles.input}
        placeholder="ID del Producto"
        value={producto_id}
        onChangeText={setProductoId}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del Producto"
        value={nombre_producto}
        onChangeText={setNombreProducto}
      />
      <TextInput
        style={styles.input}
        placeholder="Código de Barras"
        value={codigo_barras}
        onChangeText={setCodigoBarras}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso Unitario"
        value={peso_unitario}
        onChangeText={setPesoUnitario}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={categoria}
        onChangeText={setCategoria}
      />

      <Button title="Crear Producto" onPress={crearProducto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
