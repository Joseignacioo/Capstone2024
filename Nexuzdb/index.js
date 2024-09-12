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






// const { Client } = require('pg');
// const bcrypt = require('bcryptjs'); 

// // Configuración de la conexión a la base de datos PostgreSQL
// const dbConfig = {
//     host: 'nexuzdb.cvuiwqomggxs.us-east-2.rds.amazonaws.com', // Reemplaza con tu host
//     port: 5432, // Puerto de PostgreSQL
//     user: 'administrador', // Reemplaza con tu usuario de base de datos
//     password: 'capstone', // Reemplaza con tu contraseña de base de datos
//     database: 'postgres', // Reemplaza con el nombre de tu base de datos
//     ssl: {
//         rejectUnauthorized: false, // Esto puede ser necesario si no tienes un certificado válido
//     },
// };

// exports.handler = async (event) => {
//     let email, contrasena;
//     try {
//         const body = JSON.parse(event.body);
//         email = body.email;
//         contrasena = body.contrasena;
//     } catch (err) {
//         return {
//             statusCode: 400,
//             headers: {
//                 "Access-Control-Allow-Origin": "*",  // Permitir CORS desde cualquier origen
//                 "Access-Control-Allow-Headers": "Content-Type",  // Permitir encabezados específicos
//             },
//             body: JSON.stringify({ message: 'Invalid request body' }),
//         };
//     }

//     if (!email || !contrasena) {
//         return {
//             statusCode: 400,
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Control-Allow-Headers": "Content-Type",
//             },
//             body: JSON.stringify({ message: 'Email and password are required' }),
//         };
//     }

//     const client = new Client(dbConfig);

//     try {
//         await client.connect();

//         // Verificar si el usuario existe y obtener la contraseña hasheada
//         const res = await client.query('SELECT * FROM usuarios WHERE email = $1', [email]);

//         if (res.rows.length > 0) {
//             const user = res.rows[0];

//             // Comparar la contraseña ingresada con el hash almacenado
//             const match = bcrypt.compareSync(contrasena, user.contrasena);

//             if (match) {
//                 return {
//                     statusCode: 200,
//                     headers: {
//                         "Access-Control-Allow-Origin": "*",
//                         "Access-Control-Allow-Headers": "Content-Type",
//                     },
//                     body: JSON.stringify({
//                         message: 'Login successful',
//                         user: {
//                             usuario_id: user.usuario_id,
//                             nombre_usuario: user.nombre_usuario,
//                             email: user.email,
//                             rol: user.rol
//                         }
//                     }),
//                 };
//             } else {
//                 return {
//                     statusCode: 401,
//                     headers: {
//                         "Access-Control-Allow-Origin": "*",
//                         "Access-Control-Allow-Headers": "Content-Type",
//                     },
//                     body: JSON.stringify({ message: 'Invalid email or password' }),
//                 };
//             }
//         } else {
//             return {
//                 statusCode: 401,
//                 headers: {
//                     "Access-Control-Allow-Origin": "*",
//                     "Access-Control-Allow-Headers": "Content-Type",
//                 },
//                 body: JSON.stringify({ message: 'Invalid email or password' }),
//             };
//         }
//     } catch (err) {
//         console.error('Error connecting to the database:', err);
//         return {
//             statusCode: 500,
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Control-Allow-Headers": "Content-Type",
//             },
//             body: JSON.stringify({ message: 'Internal server error' }),
//         };
//     } finally {
//         await client.end();
//     }
// };
