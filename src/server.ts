import express from 'express'
import db from './config/db'
import lugarRoutes from './routes/lugarRoutes'
import pacienteRoutes from './routes/pacienteRoutes'
import estadoPagoRoutes from './routes/estadoPagoRoutes'
import authRoutes from './routes/authRotes'
import { corsConfig } from './config/cors'
import cors from 'cors'
import morgan from 'morgan'

const app = express()

app.use(cors(corsConfig))

app.use(morgan('dev'))
// conectar a la base de datos
export async function connectDB() {
    try {
        await db.authenticate() // autenticarnos a nuestra base de datos
        db.sync()
        console.log('Base de datos conectada')
    } catch(error) {
        console.log('Error al conectar a la base de datos:', error)
    }
}

connectDB()
app.use(express.json())

app.use('/api/lugares', lugarRoutes)
app.use('/api/pacientes', pacienteRoutes)
app.use('/api/estado-pago', estadoPagoRoutes)
app.use('/api/auth', authRoutes)

export default app