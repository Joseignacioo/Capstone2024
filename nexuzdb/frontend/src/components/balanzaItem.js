import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

export default function BalanzaItem({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.productoNombre}>Nombre: {item.nombre_balanza}</Text>
      <Text style={styles.productoNombre}>ID: {item.id_unico}</Text>
      <Text style={styles.productoNombre}>Capacidad máxima: {item.capacidad_maxima} gr</Text>
    </View>
  );
}