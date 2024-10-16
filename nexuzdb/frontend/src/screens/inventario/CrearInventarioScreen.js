import React, { useState, useEffect } from 'react';
import { View, FlatList,Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import BalanzaItem from '../../components/BalanzaItem';
import { stylesHome } from '../../styles';
import { useNavigation } from '@react-navigation/native';

export default function BalanzasScreen() {
  const navigation = useNavigation(); 
  const [balanzas, setBalanzas] = useState([]);

  const [productoId, setProductoId] = useState('');
  const [balanzaId, setBalanzaId] = useState('');

  useEffect(() => {
    fetchBalanzas();
  }, []);

  async function fetchBalanzas() {
    try {
      const res = await fetch('http://172.20.10.2:3000/api/balanza/balanzas');
      const data = await res.json();
      setBalanzas(data);
    } catch (error) {
      console.error("Error al obtener las balanzas:", error);
    }
  }
  const CrearVinculacion = async () => {
    try {
        const response = await axios.post('http://172.20.10.2:3000/api/inventario/create', {
            producto_id: productoId, 
            balanza_id: balanzaId 
        });
        if (response.status === 201) {
            Alert.alert('Éxito', 'Inventario creado exitosamente');
            navigation.navigate('NexuzDB'); 
        }
    } catch (error) {
        Alert.alert('Error', 'La Balanza ya esta en uso');
    }
};

  return (
    <View style={stylesHome.container}>
      <View style={stylesHome.nav}>
        <Text style={stylesHome.productoCantidad}>Productos Disponibles </Text>
        <TouchableOpacity
          style={stylesHome.button_productos}
          onPress={() => navigation.navigate('Productos')}
        >
          <Text style={stylesHome.buttonText_productos}>+</Text>
        </TouchableOpacity>
      </View>
      <View>
      <Text style={stylesHome.titulo}>Balanzas disponibles</Text>
      <FlatList
        data={balanzas}
        renderItem={({ item }) => <BalanzaItem item={item} />}
        keyExtractor={(item) => item.balanza_id}
        ListEmptyComponent={<Text>No hay balanzas disponibles</Text>}
      />
      </View>
      <View>
        <Text style={stylesHome.titulo}>Crear vinculacion</Text>
        <TextInput
          style={stylesHome.input}
          placeholder="ID del Producto"
          value={productoId}
          onChangeText={setProductoId}
        />
        <TextInput
          style={stylesHome.input}
          placeholder="ID de la Balanza"
          value={balanzaId}
          onChangeText={setBalanzaId}
        />
        <Button title="VINCULAR" onPress={CrearVinculacion} />
      </View>
    </View>
    
  );
}
