import React from 'react';
import { View, Text, Image } from 'react-native';
import { stylesHome } from '../styles';

const logo = require('../../assets/iphone11.png');

export default function HistorialInventarioItem({ item }) {
  // Verifica si item y item.producto_nombre están definidos
  if (!item || !item.producto_nombre) {
    return null; // Si no hay item o producto_nombre, no renderiza nada
  }

  return (
    <View style={stylesHome.card}>
      <View>
        <Image source={logo} style={stylesHome.image} />
      </View>
      <View>
        <Text style={stylesHome.productoNombre}>{item.producto_nombre}</Text>
        <Text style={stylesHome.productoCantidad}>{item.cantidad} unidades</Text>
        <Text style={stylesHome.productoFecha}>{item.fecha}</Text>
      </View>
    </View>
  );
}