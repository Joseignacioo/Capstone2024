import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Image} from 'react-native';
import { stylesHome } from '../../styles';
import LottieView from 'lottie-react-native';  // Importar Lottie para animaciones

export default function EditInventario({ route, navigation }) {
    const { inventario } = route.params; // Recibe el inventario a editar
    const [nuevoProductoId, setNuevoProductoId] = useState(inventario.producto_id); // Inicializa con el producto actual
    const [productos, setProductos] = useState([]);

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
          fetchProductos();
      });
      return unsubscribe;
  }, [navigation]);

  const handleUpdate = async () => {
    //console.log('ID enviado:', inventario.inventario_id);  // Cambiado a inventario.inventario_id
    //console.log('Nuevo Producto ID:', nuevoProductoId);

    try {
        const response = await fetch(`https://28gd8p3u4a.execute-api.us-east-2.amazonaws.com/dev/edit_inventario`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: inventario.inventario_id,  // Usando inventario.inventario_id
                nuevo_producto_id: nuevoProductoId,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            //console.log("Inventario actualizado:", data.inventario);
            navigation.goBack();
        } else {
            const errorData = await response.json();
            console.error("Error al actualizar el inventario:", errorData);
        }
    } catch (error) {
        console.error("Error al hacer la solicitud de actualización:", error);
    }
};


    async function fetchProductos() {
      try {
          const res = await fetch('https://sasmrjjfbk.execute-api.us-east-2.amazonaws.com/dev/obtener_producto');
          const data = await res.json();
          setProductos(data);  // Guardar los productos en el estado
      } catch (error) {
          console.error("Error al obtener los productos:", error);
      }
  }

    return (
        <View style={stylesHome.container}>
            <Text style={stylesHome.titulo}>Balanza: {inventario.balanza_modelo}</Text>
            <Text style={stylesHome.titulo}>Producto Actual: {inventario.producto_nombre}</Text>

            {/* Contenedor de productos disponibles */}
            <View>
            <Text style={stylesHome.productoCantidad}>Productos Disponibles</Text>
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

            <Text style={stylesHome.productoCantidad}>Escribe un nuevo ID de Producto:</Text>
            <TextInput style={stylesHome.input}
                value={nuevoProductoId} // Convierte a string para mostrar en el TextInput
                onChangeText={setNuevoProductoId} // Actualiza el estado
                keyboardType="numeric" // Permite solo números
            />

            <Button title="Actualizar" onPress={handleUpdate} />
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