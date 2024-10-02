import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

export default function BalanzaItem({ item }) {
  return (
    <View style={styles.card_vinculacion}>
      <View>
        <Text style={styles.productoNombre}>{item.nombre_balanza}</Text>
        <Text style={styles.productoNombre}>{item.capacidad_maxima} Gramos</Text>
      </View>
      <View>
        <Text style={{color: 'red'}}>Estado: Ocupado</Text>
      </View>
    </View>
  );
}