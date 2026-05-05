import { Request, Response, NextFunction } from 'express';
export const authorizeRole = (...rolesPermitidos: string[]) => {
    return(req: Request, res: Response, next: NextFunction) => {
        if(!req.usuario){
            const error = new Error('No autorizado')
            return res.status(401).json({msg: error.message})
        }
        const rolId = req.usuario.get('rol_id')

        if(!rolesPermitidos.includes(rolId.toString())){
            const error = new Error('No tienes permiso para acceder a este recurso')
            return res.status(403).json({msg: error.message})
        }
        next()
    }


}