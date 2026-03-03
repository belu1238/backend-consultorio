import rateLimit from "express-rate-limit";


export const limiter = rateLimit({
    windowMs: 60 * 1000, // tiempo para resetear el contador (1 minuto)
    limit: 5, // cuantos request se permiten al usuario
    message: {'error': 'Demasiados intentos, por favor intenta de nuevo en un minuto'}
})