import 'dotenv/config';
import express from 'express';
import userRouter from './routes/userRoutes.js';
import { db } from './database/connection.js';

const app = express();

// Usa las funciones de middleware correctamente
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/users', userRouter);

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await db.connect();
    console.log('Conexión a la base de datos establecida');

    // Definir puerto y escuchar
    const PORT = 3000;  // Usa el puerto de .env o el 3000 como fallback
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
    process.exit(1); // Terminar el proceso si la conexión falla
  }
};

// Iniciar el servidor
startServer();
