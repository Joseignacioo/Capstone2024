import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import InventarioItem from '../components/inventarioItem';
import HistorialInventario from '../components/HistorialInventarioItem';
import { stylesHome } from '../styles';

export default function HomeScreen({ navigation }) {
  const [inventarios, setInventarios] = useState([]);
  const [historialInventarios, setHistorialInventarios] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchInventarios();
      fetchHistorialInventarios();
    });

    return unsubscribe;
  }, [navigation]); 

  async function fetchInventarios() {
    try {
      const res = await fetch('http://192.168.100.5:3000/api/inventario/inventarios');
      const data = await res.json();
      setInventarios(data);
    } catch (error) {
      console.error("Error al obtener los inventarios:", error);
    }
  }

  async function fetchHistorialInventarios() {
    try {
      const res = await fetch('http://192.168.100.5:3000/api/historial/historiales');
      const data = await res.json();
      setHistorialInventarios(data);
    } catch (error) {
      console.error("Error al obtener el historial de inventarios:", error);
    }
  }

  return (
    <View style={stylesHome.container}>
      <View style={stylesHome.nav}>
      <Text style={stylesHome.productoCantidad}>Crear vinculacion </Text>

        <TouchableOpacity
          style={stylesHome.button_create}
          onPress={() => navigation.navigate('Vinculacion')}
        >
          <Text style={stylesHome.buttonText_create}>+</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={stylesHome.titulo}>Stock Productos</Text>
        <FlatList
          data={inventarios}
          renderItem={({ item }) => <InventarioItem item={item} />}
          keyExtractor={(item) => item.inventario_id.toString()}
          ListEmptyComponent={<Text>No hay inventarios disponibles</Text>}
        />
      </View>

      <View>
        <Text style={stylesHome.titulo}>Ultimos Registros</Text>
        <FlatList
          data={historialInventarios}
          renderItem={({ item }) => <HistorialInventario item={item} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>No hay inventarios disponibles</Text>}
        />
      </View>
    </View>
  );
}