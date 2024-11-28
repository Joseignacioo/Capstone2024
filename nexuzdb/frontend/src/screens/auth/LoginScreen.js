import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, Linking } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const backgroundImage = require('../../../assets/LOGO-NEXUZDB.jpeg'); // Asegúrate de que la ruta de la imagen de fondo sea correcta

const LoginScreen = ({ navigation }) => {
  const { onLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos vacíos', 'Por favor, ingresa tu correo y contraseña.', [{ text: 'OK' }]);
      return;
    }
  
    try {
      const result = await onLogin(email, password);
  
      //console.log(result); // Verifica el resultado
  
      // Verifica si no hay error en el resultado
      if (!result.error) {
        console.log('Login exitoso');
        navigation.replace('Home'); // Login exitoso, redirige al home
      } else {
        Alert.alert('Error de autenticación', result.msg || 'Las credenciales no son válidas.', [{ text: 'OK' }]);
        console.log('No autorizado: ', result.error);
      }
    } catch (error) {
      console.error('Error en el proceso de login:', error);
      Alert.alert('Error inesperado', 'Ha ocurrido un problema al intentar iniciar sesión.', [{ text: 'OK' }]);
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={backgroundImage} style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} 
          style={styles.keyboardContainer}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.innerContainer}>
              <Text style={styles.title}>Iniciar Sesión</Text>

              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                textContentType="oneTimeCode"
              />

              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                autoCapitalize="none"
                textContentType="password"
              />

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => Linking.openURL('https://thenexuzdb.com')}>
              <Text style={styles.registerText}>¿No tienes una cuenta? Contactanos</Text>
              </TouchableOpacity> 
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    padding: 20,
    borderRadius: 10,
    width: '90%', 
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF', 
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  registerText: {
    marginTop: 15,
    color: '#007BFF',
  },
});

export default LoginScreen;
