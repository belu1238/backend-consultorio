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

export async function accesoPaciente(req: Request, res: Response, next: NextFunction) {
    const { pacienteId } = req.params

        try{
            const paciente = await Paciente.findByPk(pacienteId)

            if(!paciente){
                const error = new Error('Paciente no encontrado.')
                res.status(404).json({error: error.message})
                return
            }

            if(paciente.IdUsuario !== req.usuario.id){
            const error = new Error('Acción no autorizada')
            res.status(401).json({error: error.message})
            return
            }
            req.paciente = paciente
    next()
    }catch(error){
            console.log(error)
    }
}


