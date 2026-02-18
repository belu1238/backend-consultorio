import LugarAtencion from "../models/Lugar.model";
import type { Request, Response, NextFunction } from "express";
import Paciente from "../models/Paciente.model";

declare global {
    namespace Express {
        interface Request {
            lugar: LugarAtencion
        }
    }
}


export async function validacionLugar(req: Request, res: Response, next: NextFunction) {
    try{
        const { lugarId } = req.params
        const lugar = await LugarAtencion.findByPk(lugarId)       
        if(!lugar) {
                const error = new Error('Lugar no encontrado')
                res.status(404).json({error: error.message})
                return
            }
            req.lugar = lugar 
        next()
    }catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}