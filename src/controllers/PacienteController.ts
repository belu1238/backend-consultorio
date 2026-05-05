import { Request, Response } from "express";
import Paciente from "../models/Paciente.model";
import { crearPacienteService, editarPacienteService, obtenerPacientePorIdService, obtenerPacientesPorLugarService } from "../services/PacienteService";

export class PatientController {
    static crearPaciente = async(req: Request, res: Response) => {
        const {lugarId} = req.params
        const IdUsuario = req.usuario.id

        try {
            await crearPacienteService(req.body, +lugarId, IdUsuario)
            res.send('Paciente creado correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al crear el paciente.'})
        }
    }

    static obtenerPacientesPorLugar = async(req: Request, res: Response) => {
        const IdUsuario = req.usuario.id
        const lugarId = req.params.lugarId
        try{
            const pacientes = await obtenerPacientesPorLugarService(+lugarId, IdUsuario)
            return res.json(pacientes)
        }  catch(error) {
            console.log(error)
            res.status(404).json({ error: error.message });
        }
    }

    static obtenerPacientePorId = async(req: Request, res: Response) => {
        const IdUsuario = req.usuario.id
        const { pacienteId, lugarId } = req.params
        try{
            const paciente = await obtenerPacientePorIdService(IdUsuario,+pacienteId, +lugarId)
            return res.json(paciente)
        } catch(error){
            console.log(error)
            res.status(404).json({ error: error.message });
        }
    }

    static editarPaciente = async(req: Request, res: Response) => {
        const IdUsuario = req.usuario.id
        const { pacienteId, lugarId } = req.params

        try {
            const paciente = await editarPacienteService(IdUsuario,+pacienteId, +lugarId ,req.body)
            res.send('Paciente actualizado correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al editar el paciente.'})
        }
    }

    static editarEstado = async(req: Request, res: Response) => {
        const { pacienteId } = req.params

        try {
            const paciente = await Paciente.findByPk(pacienteId)
            if(!paciente){
                const error = new Error('Paciente no encontrado.')
                res.status(404).json({error: error.message})
                return
            }
            await paciente.update(req.body)
            res.send('Paciente actualizado correctamente')
        } catch (error) {
            console.log(error)
        }
    }
    
}