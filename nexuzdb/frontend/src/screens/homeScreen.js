import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import InventarioItem from '../components/InventarioItem';
import HistorialInventario from '../components/HistorialInventarioItem'; // Asegúrate de que la ruta es correcta
import { stylesHome } from '../styles';

export default function HomeScreen({ navigation }) {
  const [inventarios, setInventarios] = useState([]);
  const [historialInventarios, setHistorialInventarios] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchInventarios();
      fetchHistorialInventarios();
    });

    // Limpia el listener cuando el componente se desmonte
    return unsubscribe;
  }, [navigation]); // Asegúrate de que `navigation` esté incluido en las dependencias

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
      <TouchableOpacity
        style={stylesHome.button_create}
        onPress={() => navigation.navigate('CrearVinculacion')}
      >
        <Text style={stylesHome.buttonText_create}>+</Text>
      </TouchableOpacity>

      <View>
        <Text style={stylesHome.titulo}>STOCK PRODUCTOS</Text>
        <FlatList
          data={inventarios}
          renderItem={({ item }) => <InventarioItem item={item} />}
          keyExtractor={(item) => item.inventario_id.toString()}
          ListEmptyComponent={<Text>No hay inventarios disponibles</Text>}
        />
      </View>

      <View>
        <Text style={stylesHome.titulo}>ULTIMOS REGISTROS</Text>
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