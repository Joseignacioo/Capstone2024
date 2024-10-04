import React from 'react';
import { View, Text, Image } from 'react-native';
import { stylesHome } from '../styles';

const logo = require('../../assets/iphone11.png');

export default function InventarioItem({ item }) {
  return (
    <View style={stylesHome.card}>
      <View>
        <Image source={logo} style={stylesHome.image} />
      </View>
      <View>
        <Text style={stylesHome.productoNombre}>Balanza: {item.balanza_modelo}</Text>
        <Text style={stylesHome.productoCantidad}>Producto: {item.producto_nombre}</Text>
        <Text style={stylesHome.productoNombre}>STOCK: {item.cantidad}</Text>
        <Text style={{color: 'green'}}>Estado: ACTIVO</Text>
      </View>
    </View>
  );
}