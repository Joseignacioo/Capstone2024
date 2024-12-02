import re
import requests
import time
import serial

def extraer_peso(mensaje):
    """
    Extrae el valor numérico de peso del mensaje recibido del Arduino.
    """
    match = re.search(r"Peso:\s*(-?\d+\.\d+)", mensaje)
    if match:
        return float(match.group(1))
    return None

def enviar_datos_api(peso):
    """
    Envía el peso a la API en formato JSON.
    """
    url = "https://jcv3w3tpc2.execute-api.us-east-2.amazonaws.com/dev/update_inventario" 
    headers = {"Content-Type": "application/json"}
    data = {"peso": peso}

    try:
        response = requests.post(url, json=data, headers=headers)
        if response.status_code == 200:
            print("Peso enviado exitosamente:", peso)
        else:
            print(f"Error en la API: {response.json()}")
    except Exception as e:
        print(f"Error al enviar el peso a la API: {e}")

# Configuración del puerto serial
ser = serial.Serial("COM3", baudrate=9600, timeout=1)

while True:
    try:
        if ser.in_waiting > 0:
            mensaje = ser.readline().decode("utf-8").strip()
            print(f"Peso recibido: {mensaje}")

            if not mensaje.startswith("Peso:"):
                print(f"Mensaje ignorado: {mensaje}")
                continue

            peso = extraer_peso(mensaje)

            if peso is not None and peso > 0.01:
                enviar_datos_api(peso)
            else:
                print(f"Peso no válido o irrelevante: {peso}")

        time.sleep(3)
    except KeyboardInterrupt:
        print("Cerrando la conexión...")
        ser.close()
        break
