import { StyleSheet } from 'react-native';

export const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titulo: {
    fontSize: 25,
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

    backgroundColor: 'green',
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText_create: {
    color: 'white',
    fontSize: 20,
  },
  button_productos: {
    backgroundColor: 'green',
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText_productos: {
    color: 'white',
    fontSize: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,

  }
});
