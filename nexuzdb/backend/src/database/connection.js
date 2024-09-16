import 'dotenv/config'
import pg from  'pg'

const { Client } = pg

export const db = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    ssl: {
        rejectUnauthorized: false
    },
})

// try {
//     await db.connect();
//     const res = await db.query('SELECT * FROM usuarios')
//     console.log(res.rows)
// } catch (error) {
//     console.log(error)
// }

