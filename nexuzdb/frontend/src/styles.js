import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  title: {
    padding: 10,
    fontSize: 40,
    fontWeight: 'bold',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    minWidth: 300,
    maxWidth: 300,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // sombra para Android
  },
  form: {
    gap: 10,
    width: '60%',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
});