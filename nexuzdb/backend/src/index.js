import 'dotenv/config';
import express from 'express';
import userRouter from './routes/userRoutes.js';
import productoRouter from './routes/productoRoutes.js'
import balanzaRouter from './routes/balanzaRoutes.js'
import inventarioRouter from './routes/inventarioRoutes.js'
import historialRouter from './routes/historialInventarioRoutes.js'
import SolicitudesRouter from './routes/solicitudesRoutes.js'
import correo from './routes/emailRoutes.js'

import { db } from './database/connection.js';
import cors from  'cors'


const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["POST", "GET", "DELETE"],
  credentials: true
}

const app = express();

// Usa las funciones de middleware correctamente
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', userRouter);
app.use('/api/producto', productoRouter)
app.use('/api/balanza', balanzaRouter)
app.use('/api/inventario', inventarioRouter)
app.use('/api/historial', historialRouter)
app.use('/api/solicitudes', SolicitudesRouter)
app.use('/api/email', correo)



// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await db.connect();
    console.log('Conexión a la base de datos establecida');

    // Definir puerto y escuchar
    const PORT = 4000;  // Usa el puerto de .env o el 3000 como fallback
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
