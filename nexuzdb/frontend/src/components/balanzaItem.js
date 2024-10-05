import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles, stylesHome } from '../styles';

const logo = require('../../assets/balanza.png');

export default function BalanzaItem({ item }) {
  return (
    <View style={stylesHome.card}>
      <View>
        <Image source={logo} style={stylesHome.image} />
      </View>
      <View>
      <Text style={stylesHome.productoNombre}>ID: {item.id}</Text>
        <Text style={stylesHome.productoCantidad}>{item.tipo}</Text>
        <Text style={stylesHome.productofecha}>{item.modelo}</Text>
      </View>
    </View>
  );
}
