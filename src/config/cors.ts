import { CorsOptions } from 'cors';

export const corsConfig : CorsOptions = {
    origin: function(origin, callback ){
        const whiteList = [
            process.env.FRONTEND_URL,
            'http://localhost:5173'
        ]

        if(!origin || whiteList.includes(origin)) { 
            return callback(null, true)
        }

        return callback(new Error('Erros de CORS'))
    }
}