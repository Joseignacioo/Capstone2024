import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

export default function InventarioItem({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.productoNombre}>ID Inventario: {item.inventario_id}</Text>
      <Text style={styles.productoNombre}>Balanza: {item.balanza_id}</Text>
      <Text style={styles.productoNombre}>Cantidad: {item.cantidad} gr</Text>
      <Text style={styles.productoNombre}>Fecha de Registro: {item.fecha_registro}</Text>
    </View>
  );
}