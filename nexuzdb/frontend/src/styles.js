import { StyleSheet } from 'react-native';

export const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ffff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  productoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productoCantidad: {
    fontSize: 16,
    color: '#555',
  },
  productoFecha: {
    fontSize: 14,
    color: '#999',
  },
  button_create: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'green',
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  buttonText_create: {
    color: 'white',
    fontSize: 20,
  },
});
