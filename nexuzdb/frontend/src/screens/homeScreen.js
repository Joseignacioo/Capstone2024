import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { stylesHome } from '../styles';



export default function HomeScreen({ navigation }) {
    const [inventarios, setInventarios] = useState([]);
    const [historialInventarios, setHistorialInventarios] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchInventarios();
            fetchHistorialInventarios();
        });

        const intervalId = setInterval(() => {
            fetchInventarios();
            fetchHistorialInventarios();
        }, 1000);
        
        return () => {
            unsubscribe();
            clearInterval(intervalId);
        };
    }, [navigation]); 

    async function fetchInventarios() {
        try {
            const res = await fetch('https://f12abu55yi.execute-api.us-east-2.amazonaws.com/dev/inventario_home');
            const data = await res.json();
            //console.log("Inventarios data:", data);  // Agrega este log
            setInventarios(data);
        } catch (error) {
            console.error("Error al obtener los inventarios:", error);
        }
    }

    async function fetchHistorialInventarios() {
        try {
            const res = await fetch('https://1gv1torj6e.execute-api.us-east-2.amazonaws.com/dev/historial_inventario'); // Reemplaza con tu endpoint de API Gateway
            const data = await res.json();
            //console.log("historial data:", data);
            setHistorialInventarios(data);
        } catch (error) {
            console.error("Error al obtener el historial de inventarios:", error);
        }
    }

    const renderItem = ({ item }) => (
        <View style={stylesHome.card}>
            <Image 
                source={{ uri: `data:image/png;base64,${item.producto_imagen}` }} 
                style={stylesHome.image} 
            />
            <View>
            <Text style={stylesHome.productoTitulo}>Producto:</Text>
            <Text style={stylesHome.productoNombre}>{item.producto_nombre}</Text>

            <View style={stylesHome.cantidadContainer}>
                <Text style={stylesHome.cantidadIcon}>📦</Text>
                <Text style={stylesHome.productoCantidad}>Cantidad: {item.cantidad} Unidades</Text>
            </View>

              
                
                {/* Botón para modificar, solo para inventarios */}
                {item.inventario_id && (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('EditInventario', { inventario: item })}
                    >
                        <Text style={{ color: 'orange' }}>Modificar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    return (
        <View style={stylesHome.container}>
            <View style={stylesHome.nav}>
                <Text style={stylesHome.productoCantidad}>Crear vinculación </Text>
                <TouchableOpacity
                    style={stylesHome.button_create}
                    onPress={() => navigation.navigate('Vinculacion')}
                >
                    <Text style={stylesHome.buttonText_create}>+</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={stylesHome.titulo}>Stock Productos</Text>
                <FlatList
                    data={inventarios}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.inventario_id.toString()}
                    ListEmptyComponent={<Text>No hay inventarios disponibles</Text>}
                />
            </View>

            <View>
                <Text style={stylesHome.titulo}>Últimos Registros</Text>
                <FlatList
                    data={historialInventarios}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<Text>Cargando...</Text>}
                />
            </View>
        </View>
    );
}
