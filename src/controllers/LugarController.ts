import type { Request, Response } from "express";
import LugarAtencion from "../models/Lugar.model";
import Paciente from "../models/Paciente.model";

export class LugarController {

    static crearLugares = async(req: Request, res: Response) => {
        
        const lugar = new LugarAtencion(req.body)
        if(!req.body.nombre){
            const error =new Error('Error al crear el lugar de atencion.')
            res.status(404).json({error: error.message})
            return
        }

        try {
            await lugar.save()
            res.send('Lugar de atencion creado correctamente')
            } catch(error) {
            res.status(500).json({error: 'Error al crear el lugar de atencion.'})
        }
    }

    static obtenerLugares = async(req: Request, res: Response) => {
        try{
            const lugares = await LugarAtencion.findAll({})
            res.json(lugares) 
            
        } catch(error){
            res.status(500).json({error: 'Error al obtener los lugares de atencion.'})
        }
    }

    static obtenerLugaresPorId = async(req: Request, res: Response) => {
        try{
            const { lugarId } = req.params
            const lugar = await LugarAtencion.findByPk(lugarId, {
                include: [{ model: Paciente}]
            })
            if(!lugar){
                const error = new Error('Lugar de atencion no encontrado.')
                res.status(404).json({error: error.message})
                return
            }
            res.json(lugar)
        } catch(error){
            res.status(500).json({error: 'Error al obtener el lugar de atencion.'})
        }      
    }

    static editarLugares = async(req: Request, res: Response) => {
        try{
            const { lugarId } = req.params
            const lugar = await LugarAtencion.findByPk(lugarId)
            if(!lugar){
                const error = new Error('Lugar de atencion no encontrado.')
                res.status(404).json({error: error.message})
                return
            }

            await lugar.update(req.body)
            
            res.send('Lugar de atencion actualizado con exito')
        } catch(error){
            res.status(500).json({error: 'Error al actualizar el lugar de atencion.'})
        }      
    }

    static eliminarLugares = async(req: Request, res: Response) => {
        try{
            const { lugarId } = req.params
            const lugar = await LugarAtencion.findByPk(lugarId)
            if(!lugar){
                const error = new Error('Lugar de atencion no encontrado.')
                res.status(404).json({error: error.message})
                return
            }

            await lugar.destroy()
            res.send('Lugar de atencion eliminado con exito')
        } catch(error) {
            res.status(500).json({error: 'Error al eliminar el lugar de atencion.'})
        }
    }

    static obtenerPacientesPorLugar = async(req: Request, res: Response) => {
        try{
            const pacientes = await Paciente.findAll({
                where: {
                    lugar_id: req.lugar.id
                }
            })
            if(!pacientes){
                const error = new Error('Pacientes no encontrados.')
                res.status(404).json({error: error.message})
                return
            }
            res.json(pacientes)
        } catch(error){
            res.status(500).json({error: 'Error al obtener los pacientes del lugar.'})
        }
    }

    static createPatient = async (req: Request, res: Response) => {
        const { lugarId } = req.params
        try{
            const patient = await Paciente.create({
                ...req.body,
                lugarId: lugarId
            })
            res.send('Paciente creado correctamente')

        } catch(error){
            res.status(500).json({error: 'Error al crear el paciente.'})
        }
    }
}