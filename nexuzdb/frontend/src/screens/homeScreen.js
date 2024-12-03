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
                {/* Mostrar el ID de la balanza */}
                {item.balanza_id && (
                    <Text style={stylesHome.balanzaNombre}>Balanza ID: {item.balanza_id}</Text>
                )}
                <Text style={stylesHome.productoTitulo}>Producto 📦</Text>
                <Text style={stylesHome.productoNombre}>{item.producto_nombre}</Text>
    
                <View style={stylesHome.cantidadContainer}>
                    <Text style={stylesHome.productoCantidad}>Cantidad: {item.cantidad} Unidades</Text>
                </View>
    
    
                {/* Contenedor de los botones */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Botón para modificar, solo para inventarios */}
                    {item.inventario_id && (
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('EditInventario', { inventario: item })}
                            style={{ marginRight: 10 }}  // Espacio entre los botones
                        >
                            <Text style={{ color: 'orange' }}>Modificar</Text>
                        </TouchableOpacity>
                    )}

                    {/* Botón para eliminar el inventario completo */}
                    {item.inventario_id && (
                        <TouchableOpacity 
                            onPress={() => eliminarInventario(item.inventario_id)}
                        >
                            <Text style={{ color: 'red' }}>Eliminar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
    
    async function eliminarInventario(inventarioId) {
        try {
            const res = await fetch('https://0pi9ygyds6.execute-api.us-east-2.amazonaws.com/dev/delete_inventario', {
                method: 'DELETE',  // Usamos DELETE
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inventarioId: inventarioId,  // Pasamos el ID del inventario a eliminar
                })
            });
    
            const data = await res.json();
            if (res.ok) {
                alert('Inventario eliminado');
                fetchInventarios();  // Refrescar inventarios si es necesario
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error al eliminar inventario:', error);
            alert('Error al eliminar el inventario');
        }
    }
    
    


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
