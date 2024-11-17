import serial
import psycopg2
import re
import time
import os
import threading
from datetime import datetime, timedelta
from dotenv import load_dotenv
import tkinter as tk
from tkinter import messagebox, scrolledtext, filedialog

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

class InventarioApp:
    def __init__(self, master):
        self.master = master
        master.title("NEXUZdb")
        master.geometry("700x600")
        master.config(bg="#f0f0f0")

        self.producto_id = None
        self.balanza_id = None
        self.ultima_actualizacion = datetime.now()

        self.iniciar_serial()

        # Título
        self.titulo = tk.Label(master, text="NEXUZdb", bg="#4CAF50", fg="white", font=("Arial", 24, "bold"))
        self.titulo.pack(pady=10)

        # Frame para mostrar productos
        self.frame_productos = tk.Frame(master, bg="#e7f0f2", bd=2, relief=tk.SUNKEN)
        self.frame_productos.pack(pady=10, padx=10, fill=tk.X)

        self.label_productos = tk.Label(self.frame_productos, text="Productos Disponibles", bg="#e7f0f2", font=("Arial", 16))
        self.label_productos.pack(pady=5)

        self.listbox_productos = tk.Listbox(self.frame_productos, width=50, height=6)
        self.listbox_productos.pack(pady=5)

        # Frame para mostrar balanzas
        self.frame_balanzas = tk.Frame(master, bg="#e7f0f2", bd=2, relief=tk.SUNKEN)
        self.frame_balanzas.pack(pady=10, padx=10, fill=tk.X)

        self.label_balanzas = tk.Label(self.frame_balanzas, text="Balanzas Disponibles", bg="#e7f0f2", font=("Arial", 16))
        self.label_balanzas.pack(pady=5)

        self.listbox_balanzas = tk.Listbox(self.frame_balanzas, width=50, height=6)
        self.listbox_balanzas.pack(pady=5)

        # Entradas para seleccionar por ID
        self.frame_seleccion = tk.Frame(master, bg="#e7f0f2", bd=2, relief=tk.SUNKEN)
        self.frame_seleccion.pack(pady=10, padx=10, fill=tk.X)

        self.label_producto = tk.Label(self.frame_seleccion, text="ID Producto:", bg="#e7f0f2")
        self.label_producto.pack(side=tk.LEFT, padx=5)
        self.entry_producto = tk.Entry(self.frame_seleccion, width=10)
        self.entry_producto.pack(side=tk.LEFT, padx=5)

        self.label_balanza = tk.Label(self.frame_seleccion, text="ID Balanza:", bg="#e7f0f2")
        self.label_balanza.pack(side=tk.LEFT, padx=5)
        self.entry_balanza = tk.Entry(self.frame_seleccion, width=10)
        self.entry_balanza.pack(side=tk.LEFT, padx=5)

        self.btn_asignar = tk.Button(self.frame_seleccion, text="Asignar", command=self.asignar_producto_y_balanza, bg="#4CAF50", fg="white", font=("Arial", 12))
        self.btn_asignar.pack(side=tk.LEFT, padx=5)

        # Frame para iniciar lectura
        self.frame_lectura = tk.Frame(master, bg="#e7f0f2", bd=2, relief=tk.SUNKEN)
        self.frame_lectura.pack(pady=10, padx=10, fill=tk.X)

        self.btn_iniciar_lectura = tk.Button(self.frame_lectura, text="Iniciar Lectura", command=self.iniciar_lectura_thread, bg="#FF5722", fg="white", font=("Arial", 12))
        self.btn_iniciar_lectura.pack(pady=5)

        # Área de estado
        self.estado_texto = scrolledtext.ScrolledText(master, width=80, height=10, bg="#ffffff", font=("Arial", 10))
        self.estado_texto.pack(pady=10)

        # Panel de notas
        self.notas_label = tk.Label(master, text="Notas:", bg="#e7f0f2", font=("Arial", 12))
        self.notas_label.pack(pady=5)

        self.notas_texto = scrolledtext.ScrolledText(master, width=80, height=5, bg="#ffffff", font=("Arial", 10))
        self.notas_texto.pack(pady=10)

        self.btn_guardar_notas = tk.Button(master, text="Guardar Notas", command=self.guardar_notas, bg="#FFC107", fg="black", font=("Arial", 12))
        self.btn_guardar_notas.pack(pady=10)

        # Cargar productos y balanzas automáticamente
        self.cargar_productos()
        self.cargar_balanzas()

    def iniciar_serial(self):
        try:
            self.ser = serial.Serial('COM3', 9600)  # Cambia COM3 por tu puerto
            self.agregar_estado("Leyendo datos del puerto serial...\n")
        except Exception as e:
            messagebox.showerror("Error", f"Error al abrir el puerto serial: {e}")

    def agregar_estado(self, mensaje):
        self.estado_texto.insert(tk.END, f"{mensaje}\n")
        self.estado_texto.see(tk.END)  # Desplazarse hacia abajo automáticamente

    def cargar_productos(self):
        self.listbox_productos.delete(0, tk.END)  # Limpiar el Listbox
        cursor.execute("SELECT id, nombre, peso_unitario FROM productos;")
        productos = cursor.fetchall()
        for producto in productos:
            self.listbox_productos.insert(tk.END, f"ID: {producto[0]}, Nombre: {producto[1]}, Peso unitario: {producto[2]} kg")

    def cargar_balanzas(self):
        self.listbox_balanzas.delete(0, tk.END)  # Limpiar el Listbox
        cursor.execute("SELECT id, tipo, modelo FROM balanzas;")
        balanzas = cursor.fetchall()
        for balanza in balanzas:
            self.listbox_balanzas.insert(tk.END, f"ID: {balanza[0]}, Tipo: {balanza[1]}, Modelo: {balanza[2]}")

    def asignar_producto_y_balanza(self):
        try:
            self.producto_id = self.entry_producto.get().strip()
            self.balanza_id = self.entry_balanza.get().strip()
            if self.producto_id and self.balanza_id:
                self.agregar_estado(f"Producto ID {self.producto_id} y Balanza ID {self.balanza_id} asignados.")
            else:
                messagebox.showwarning("Advertencia", "Por favor, ingresa el ID del producto y la balanza.")
        except Exception as e:
            messagebox.showerror("Error", f"Error al asignar: {e}")

    def iniciar_lectura_thread(self):
        # Crear un hilo para ejecutar la lectura del puerto serial
        threading.Thread(target=self.iniciar_lectura, daemon=True).start()

    def iniciar_lectura(self):
        self.agregar_estado("Iniciando lectura...\n")
        while True:
            if self.ser.in_waiting > 0:
                raw_data = self.ser.readline().decode('utf-8').strip()
                self.agregar_estado(f"Peso recibido: {raw_data}")
                match = re.search(r"([-+]?[0-9]*\.?[0-9]+)", raw_data)
                if match:
                    self.procesar_datos(float(match.group(0)))

            time.sleep(0.1)  # Esperar un poco antes de volver a leer

    def procesar_datos(self, peso_float):
        try:
            cursor.execute("SELECT peso_unitario FROM productos WHERE id = %s;", (self.producto_id,))
            peso_unitario = cursor.fetchone()[0]
            cantidad = int(peso_float / peso_unitario)

            cursor.execute(
                "UPDATE inventario SET cantidad = %s, peso = %s WHERE producto_id = %s AND balanza_id = %s",
                (cantidad, peso_float, self.producto_id, self.balanza_id)
            )
            conn.commit()
            self.agregar_estado("Dato actualizado en la base de datos.")
            self.agregar_estado(f"Cantidad de productos: {cantidad}")

            if datetime.now() - self.ultima_actualizacion >= timedelta(minutes=1):
                self.ultima_actualizacion = datetime.now()
                self.agregar_estado("Datos actualizados correctamente.")

        except Exception as e:
            messagebox.showerror("Error", f"Error al procesar los datos: {e}")

    def guardar_notas(self):
        # Guardar notas en un archivo de texto
        notas = self.notas_texto.get("1.0", tk.END).strip()
        if notas:
            file_path = filedialog.asksaveasfilename(defaultextension=".txt", filetypes=[("Text Files", "*.txt")])
            if file_path:
                with open(file_path, 'w') as file:
                    file.write(notas)
                messagebox.showinfo("Éxito", "Notas guardadas exitosamente.")
        else:
            messagebox.showwarning("Advertencia", "No hay notas para guardar.")

def main():
    root = tk.Tk()
    app = InventarioApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()
