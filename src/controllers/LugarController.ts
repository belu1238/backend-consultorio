import type { Request, Response } from "express";
import LugarAtencion from "../models/Lugar.model";
import Paciente from "../models/Paciente.model";
import { crearLugaresService, editarLugaresService, obtenerLugaresIdService } from "../services/LugarService";

export class LugarController {

    static crearLugares = async(req: Request, res: Response) => {
        try{
            const lugar = await crearLugaresService(req.body)
            return res.status(201).json(lugar);
        } catch(error){
            return res.status(400).json({error: error.message});
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
            const lugar = await obtenerLugaresIdService(+lugarId)
            res.json(lugar)
        } catch(error){
            res.status(500).json({error: 'Error al obtener el lugar de atencion.'})
        }      
    }

    static editarLugares = async(req: Request, res: Response) => {
        try{
            const { lugarId } = req.params
            const lugar = await editarLugaresService(+lugarId, req.body)
            
            res.send('Lugar de atencion actualizado con exito')
        } catch(error){
            res.status(500).json({error: 'Error al actualizar el lugar de atencion.'})
        }      
    }

    static obtenerPacientesPorLugar = async(req: Request, res: Response) => {
        try{
            const pacientes = await Paciente.findAll({
                where: {
                    IdLugar: req.lugar.id,
                    IdUsuario: req.usuario.id
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

}