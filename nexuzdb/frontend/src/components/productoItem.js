import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

export default function ProductoItem({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.productoNombre}>Nombre: {item.nombre_producto}</Text>
      <Text style={styles.productoNombre}>Desc: {item.descripcion}</Text>
      <Text style={styles.productoNombre}>Peso: {item.peso_unitario} gr</Text>
    </View>
  );
}