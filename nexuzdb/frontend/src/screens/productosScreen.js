import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import ProductoItem from '../components/productoItem';
import { styles } from '../styles';

export default function ProductosScreen() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, []);

  async function fetchProductos() {
    try {
      const res = await fetch('http://192.168.100.5:3000/api/producto/productos');
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        renderItem={({ item }) => <ProductoItem item={item} />}
        keyExtractor={(item) => item.producto_id.toString()}
        ListEmptyComponent={<Text>No hay productos disponibles</Text>}
      />
    </View>
  );
}