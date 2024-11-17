import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importar el hook
import { stylesHome } from '../styles';

const logo = require('../../assets/cereal.jpg');

export default function InventarioItem({ item }) {
  const navigation = useNavigation(); // Obtener el objeto de navegación

  return (
    <View style={stylesHome.card}>
      <View>
        <Image source={logo} style={stylesHome.image} />
      </View>
      <View>
        <Text style={stylesHome.producto}>Balanza: {item.balanza_modelo}</Text>
        <Text style={stylesHome.productoNombre}>Producto: {item.producto_nombre}</Text>
        <Text style={stylesHome.productoNombre}>STOCK: {item.cantidad}</Text>
        
        {/* Botón para modificar */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('EditInventario', { inventario: item })}>
          <Text style={{ color: 'orange' }}>Modificar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}