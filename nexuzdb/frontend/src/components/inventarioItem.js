import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

export default function InventarioItem({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.productoNombre}>Balanza: {item.balanza_id}</Text>
      <Text style={styles.productoNombre}>Producto: Papas Lays</Text>
      <Text style={styles.productoNombre}>Cantidad: {item.cantidad}</Text>
      <Text style={{color: 'green'}}>Estado: ACTIVO</Text>
      <Text style={{color: 'orange'}}>MODIFICAR</Text>
    </View>
  );
}