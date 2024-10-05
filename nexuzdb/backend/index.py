import serial
import psycopg2
from datetime import datetime, timedelta
import re  # Importar la biblioteca re para expresiones regulares
import time
import os
from dotenv import load_dotenv

# Cargar las variables de entorno desde el archivo .env
load_dotenv()
# Configurar la conexión a PostgreSQL
conn = psycopg2.connect(
    dbname=os.getenv('DATABASE'),
    user=os.getenv('USER'),
    password=os.getenv('PASSWORD'),
    host=os.getenv('HOST'),
    port=os.getenv('PORT') 
)
cursor = conn.cursor()

# Función para mostrar los productos disponibles
def mostrar_productos():
    cursor.execute("SELECT id, nombre, peso_unitario FROM productos;")
    productos = cursor.fetchall()
    for producto in productos:
        print(f"ID: {producto[0]}, Nombre: {producto[1]}, Peso unitario: {producto[2]} kg")

# Función para mostrar las balanzas disponibles
def mostrar_balanzas():
    cursor.execute("SELECT id, tipo, modelo FROM balanzas;")
    balanzas = cursor.fetchall()
    for balanza in balanzas:
        print(f"ID: {balanza[0]}, Tipo: {balanza[1]}, Modelo: {balanza[2]}")

# Función para asignar producto y balanza
def asignar_producto_y_balanza():
    mostrar_productos()
    id_producto = input("Selecciona el ID del producto a asignar: ")

    mostrar_balanzas()
    id_balanza = input("Selecciona el ID de la balanza a usar: ")

    return id_producto, id_balanza

# Asignar un producto y una balanza antes de empezar la medición
producto_id, balanza_id = asignar_producto_y_balanza()

# Configurar el puerto serial
ser = serial.Serial('COM3', 9600)  # Cambia COM3 por tu puerto
print("Leyendo datos del puerto serial...\n")

# Última hora de actualización del historial
ultima_actualizacion = datetime.now()

while True:
    # Leer los datos enviados por el Arduino
    if ser.in_waiting > 0:
        raw_data = ser.readline().decode('utf-8').strip()  # Leer una línea del serial
        print(f"Peso recibido: {raw_data}")

        # Usar expresiones regulares para extraer el número
        match = re.search(r"([-+]?[0-9]*\.?[0-9]+)", raw_data)
        if match:
            peso = match.group(0)  # Obtener el número como cadena
            try:
                # Convertir a float
                peso_float = float(peso)

                # Obtener el peso unitario del producto
                cursor.execute("SELECT peso_unitario FROM productos WHERE id = %s;", (producto_id,))
                peso_unitario = cursor.fetchone()[0]

                # Calcular la cantidad de productos
                cantidad = int(peso_float / peso_unitario)  # División entera para obtener la cantidad

                # Actualizar el dato en el inventario
                cursor.execute(
                    "UPDATE inventario SET cantidad = %s, peso = %s WHERE producto_id = %s AND balanza_id = %s",
                    (cantidad, peso_float, producto_id, balanza_id)
                )
                conn.commit()  # Guardar los cambios en la base de datos
                print("Dato actualizado en la base de datos.")
                print(f"Cantidad de productos: {cantidad}")

                # Verificar si es momento de actualizar el historial
                if datetime.now() - ultima_actualizacion >= timedelta(minutes=1):
                    # Insertar un registro en historial_inventario
                    cursor.execute(
                        "INSERT INTO historial_inventario (producto_id, balanza_id, cantidad, peso, fecha) VALUES (%s, %s, %s, %s, %s)",
                        (producto_id, balanza_id, cantidad, peso_float, datetime.now())
                    )
                    conn.commit()  # Guardar cambios en el historial
                    print("Registro agregado al historial de inventario.")
                    ultima_actualizacion = datetime.now()  # Actualizar la última hora de actualización

            except Exception as e:
                print(f"Error al actualizar en la base de datos: {e}")
        else:
            print("No se pudo extraer el peso.")

    # Esperar un poco antes de volver a leer
    time.sleep(0.1)
