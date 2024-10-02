import React, { useState, useEffect } from 'react';
import { View, FlatList,Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import BalanzaItem from '../components/BalanzaItem';
import { styles } from '../styles';

export default function BalanzasScreen() {
  const [balanzas, setBalanzas] = useState([]);
  const [inventarioId, setInventarioId] = useState('');
  const [balanzaId, setBalanzaId] = useState('');
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [pesoTotal, setPesoTotal] = useState('');

  useEffect(() => {
    fetchBalanzas();
  }, []);

  async function fetchBalanzas() {
    try {
      const res = await fetch('http://192.168.100.5:3000/api/balanza/balanzas');
      const data = await res.json();
      setBalanzas(data);
    } catch (error) {
      console.error("Error al obtener las balanzas:", error);
    }
  }
  const CrearVinculacion = async () => {
    try {
      const response = await axios.post('http://192.168.100.5:3000/api/inventario/create', {
          inventario_id: inventarioId,
          balanza_id: balanzaId,
          producto_id: productoId,
          cantidad: cantidad,
          peso_total: pesoTotal,
        }
      );
      Alert.alert('Éxito', 'Inventario creado exitosamente');
      navigation.navigate('Inventarios'); // Redirige a la lista de inventarios
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el inventario');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles1.title}>Balanzas disponibles</Text>
      <FlatList
        data={balanzas}
        renderItem={({ item }) => <BalanzaItem item={item} />}
        keyExtractor={(item) => item.balanza_id.toString()}
        ListEmptyComponent={<Text>No hay balanzas disponibles</Text>}
      />
      <View style={styles1.container}>
      <Text style={styles1.title}>Crear vinculacion</Text>
      <TextInput
        style={styles1.input}
        placeholder="ID del Inventario"
        value={inventarioId}
        onChangeText={setInventarioId}
      />
      <TextInput
        style={styles1.input}
        placeholder="ID de la Balanza"
        value={balanzaId}
        onChangeText={setBalanzaId}
      />
      <TextInput
        style={styles1.input}
        placeholder="ID del Producto"
        value={productoId}
        onChangeText={setProductoId}
      />
      <TextInput
        style={styles1.input}
        placeholder="Cantidad"
        value={cantidad}
        onChangeText={setCantidad}
      />
      <TextInput
        style={styles1.input}
        placeholder="Peso Total"
        value={pesoTotal}
        onChangeText={setPesoTotal}
      />
      <Button title="Crear Inventario" onPress={CrearVinculacion} />
      </View>
    </View>
    
  );
}
const styles1 = StyleSheet.create({
  container: {

  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 20,
    textAlign: '',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: 300

  },
});
