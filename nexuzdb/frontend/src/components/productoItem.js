import React from 'react';
import { View, Text, Image } from 'react-native';
import { stylesHome } from '../styles';

const logo = require('../../assets/iphone11.png');

export default function ProductoItem({ item }) {
  return (
    <View style={stylesHome.card}>
      <View>
        <Image source={logo} style={stylesHome.image} />
      </View>
      <View>
        <Text style={stylesHome.productoNombre}>ID: {item.id}</Text>
        <Text style={stylesHome.productoCantidad}>{item.nombre}</Text>
        <Text style={stylesHome.productoFecha}>{item.peso_unitario} gr</Text>
      </View>
    </View>
  );
}