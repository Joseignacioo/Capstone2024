import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import InventarioItem from '../components/InventarioItem';
import { styles } from '../styles';

export default function InventariosScreen() {
  const [inventarios, setInventarios] = useState([]);

  useEffect(() => {
    fetchInventarios();
  }, []);

  async function fetchInventarios() {
    try {
      const res = await fetch('http://192.168.137.155:3000/api/inventario/inventarios');
      const data = await res.json();
      setInventarios(data);
    } catch (error) {
      console.error("Error al obtener los inventarios:", error);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={inventarios}
        renderItem={({ item }) => <InventarioItem item={item} />}
        keyExtractor={(item) => item.inventario_id.toString()}
        ListEmptyComponent={<Text>No hay inventarios disponibles</Text>}
      />
    </View>
  );
}