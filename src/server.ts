import express from 'express'
import db from './config/db'
import lugarRoutes from './routes/lugarRoutes'
import pacienteRoutes from './routes/pacienteRoutes'
import tutorRoutes from './routes/tutorRoutes'
import estadoPagoRoutes from './routes/estadoPagoRoutes'
import authRoutes from './routes/authRoutes'
import obraSocialRoutes from './routes/obraSocialRoutes'
import { corsConfig } from './config/cors'
import cors from 'cors'
import morgan from 'morgan'
import { limiter } from './config/limiter'

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

app.use(limiter) // aplicar el limitador a todas las rutas

app.use('/api/auth', authRoutes)
app.use('/api/lugares', lugarRoutes)
app.use('/api/pacientes', tutorRoutes)
app.use('/api/estado-pago', estadoPagoRoutes)
app.use('/api', pacienteRoutes)
app.use('/api/obra-social', obraSocialRoutes)

export default app