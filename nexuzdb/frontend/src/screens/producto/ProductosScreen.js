//expo install expo-image-picker (necesary, yes or yes)

import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput, Alert, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import LottieView from 'lottie-react-native';  // Importar Lottie para animaciones

export default function ProductoScreen({ navigation }) {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [pesoUnitario, setPesoUnitario] = useState('');
    const [imagen, setImagen] = useState(null);
    const [imagenBase64, setImagenBase64] = useState('');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchProductos();
        });
        return unsubscribe;
    }, [navigation]);

    async function fetchProductos() {
        try {
            const res = await fetch('https://sasmrjjfbk.execute-api.us-east-2.amazonaws.com/dev/obtener_producto');
            const data = await res.json();
            setProductos(data);  // Guardar los productos en el estado
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    }

    const handleSubmit = async () => {
        if (!nombre || !pesoUnitario || !imagenBase64) {
            Alert.alert('Error', 'Por favor completa todos los campos y selecciona una imagen');
            return;
        }

        try {
            const response = await fetch('https://dnfpu5klzc.execute-api.us-east-2.amazonaws.com/dev/crear_producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombre,
                    peso_unitario: parseFloat(pesoUnitario),
                    imagenBase64: imagenBase64,
                }),
            });

            let result = await response.json();
            if (response.ok) {
                Alert.alert('Éxito', result.message || 'Producto insertado correctamente');
                fetchProductos();  // Refrescar la lista de productos después de insertar
                // Limpiar los campos
                setNombre('');
                setPesoUnitario('');
                setImagen(null);
                setImagenBase64('');
            } else {
                Alert.alert('Error', result.error || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            Alert.alert('Error', 'Error en la solicitud: ' + error.message);
        }
    };

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permisos denegados', 'Se requieren permisos para acceder a las imágenes');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.1,
            });

            if (!result.canceled && result.assets && result.assets[0].uri) {
                setImagen(result.assets[0].uri);

                const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                setImagenBase64(base64);  // Guardar la imagen en base64 para enviarla al backend
            } else {
                Alert.alert('Error', 'La selección de imagen fue cancelada o no se obtuvo una URI válida');
            }
        } catch (error) {
            console.log('Error al seleccionar la imagen:', error);
            Alert.alert('Error', 'Ocurrió un error inesperado al intentar seleccionar la imagen.');
        }
    };

    return (
      
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Agregar Producto</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre del producto"
                    value={nombre}
                    onChangeText={(text) => setNombre(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Peso Unitario"
                    value={pesoUnitario}
                    onChangeText={(text) => setPesoUnitario(text)}
                    
                />
                <View style={styles.imageSection}>
                    <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                        <Text style={styles.imageButtonText}>Seleccionar Imagen</Text>
                    </TouchableOpacity>
                    {imagen && (
                        <View style={styles.previewContainer}>
                            <Text style={styles.previewText}>Previsualización</Text>
                            <Image source={{ uri: imagen }} style={styles.smallImage} />
                        </View>
                    )}
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                    <Text style={styles.saveButtonText}>Guardar Producto</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Productos Disponibles</Text>
            {/* Contenedor de productos disponibles */}
            <View style={styles.flatListContainer}>
                <FlatList
                    data={productos}
                    renderItem={({ item }) => (
                        <View style={styles.productItem}>
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${item.imagen}` }}
                                style={styles.productImage}
                            />
                            <View style={styles.productDetails}>
                                <Text style={styles.productText}># {item.id}</Text>
                                <Text style={styles.productText}>{item.nombre}</Text>
                                <Text style={styles.productText}>Peso: {item.peso_unitario} kg</Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={(
                        <View style={styles.emptyContainer}>
                            <LottieView
                                source={require('../../../assets/loading.json')}
                                autoPlay
                                loop
                                style={styles.lottieAnimation}
                            />
                            <Text style={styles.emptyText}>Cargando...</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    formContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    imageSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,  // Aumentar el margen inferior para evitar que se muevan los botones
    },
    imageButton: {
        backgroundColor: '#3b82f6',
        padding: 10,
        borderRadius: 5,
    },
    imageButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    previewContainer: {
        marginLeft: 100,  // Más espacio a la izquierda para evitar que los botones se muevan
    },
    previewText: {
        textAlign: 'left',
        marginBottom: 1,
        fontSize: 10,
        color: 'black',
    },
    smallImage: {
        width: 80,
        height: 80,
    },
    saveButton: {
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 30,  // Separar un poco más el botón de guardar
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    flatListContainer: {
        flex: 1,
        marginTop: 20,
    },
    productItem: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        alignItems: 'center',
    },
    productImage: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
    },
    productText: {
        fontSize: 17,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    lottieAnimation: {
        width: 150,
        height: 150,
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
    },
});

