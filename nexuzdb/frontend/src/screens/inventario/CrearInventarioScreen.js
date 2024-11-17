import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import BalanzaItem from '../../components/BalanzaItem';
import { stylesHome } from '../../styles';
import { useNavigation } from '@react-navigation/native';

export default function CrearInventarioScreen() {
  const navigation = useNavigation(); 
  const [balanzas, setBalanzas] = useState([]);
  const [productoId, setProductoId] = useState('');
  const [balanzaId, setBalanzaId] = useState('');

  // Cargar balanzas disponibles al cargar la pantalla
  useEffect(() => {
    fetchBalanzas();
  }, []);

  // Función para obtener la lista de balanzas
  async function fetchBalanzas() {
    try {
      const res = await fetch('https://kmj2ngd23h.execute-api.us-east-2.amazonaws.com/dev/obtener_balanzas');
      const data = await res.json();
      //console.log("datos:", data);
      setBalanzas(data);
    } catch (error) {
      console.error("Error al obtener las balanzas:", error);
    }
  }

  // Función para crear la vinculación entre producto y balanza
  const CrearVinculacion = async () => {
    if (!productoId || !balanzaId) {
        Alert.alert('Error', 'Por favor, ingresa ambos ID de Producto y de Balanza');
        return;
    }

    try {
        const response = await axios.post('https://7usudnccbf.execute-api.us-east-2.amazonaws.com/dev/crear_vinculacion', {
            producto_id: productoId,
            balanza_id: balanzaId
        });

        if (response.status === 201) {
            Alert.alert('Éxito', 'Inventario creado exitosamente');
            navigation.navigate('NexuzDB');
        }
    } catch (error) {
        console.error('Error al crear la vinculación:', error.response?.data || error.message);
        Alert.alert('Error', error.response?.data?.error || 'Ocurrió un problema al crear la vinculación');
    }
};


  return (
    <View style={stylesHome.container}>
      {/* Sección de Productos Disponibles */}
      <View style={stylesHome.nav}>
        <Text style={stylesHome.productoCantidad}>Productos Disponibles</Text>
        <TouchableOpacity
          style={stylesHome.button_productos}
          onPress={() => navigation.navigate('Productos')}
        >
          <Text style={stylesHome.buttonText_productos}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Balanzas Disponibles */}
      <View>
        <Text style={stylesHome.titulo}>Balanzas disponibles</Text>
        <FlatList
          data={balanzas}
          renderItem={({ item }) => <BalanzaItem item={item} />}
          keyExtractor={(item) => item.balanza_id.toString()}
          ListEmptyComponent={<Text>No hay balanzas disponibles</Text>}
        />
      </View>

      {/* Formulario para Crear Vinculación */}
      <View>
        <Text style={stylesHome.titulo}>Crear vinculación</Text>
        <TextInput
          style={stylesHome.input}
          placeholder="ID del Producto"
          value={productoId}
          onChangeText={setProductoId}
          keyboardType="numeric"
        />
        <TextInput
          style={stylesHome.input}
          placeholder="ID de la Balanza"
          value={balanzaId}
          onChangeText={setBalanzaId}
          keyboardType="numeric"
        />
        <Button title="VINCULAR" onPress={CrearVinculacion} />
      </View>
    </View>
  );
}
