import { Request, Response } from "express";
import Paciente from "../models/Paciente.model";

export class PatientController {
    static crearPaciente = async(req: Request, res: Response) => {
        try {
        const paciente = await Paciente.create(req.body)
        paciente.IdUsuario = req.usuario.id
        
        await paciente.save()
        res.send('Paciente creado correctamente')
        } catch(error) {
             res.status(500).json({error: 'Error al crear el paciente'})
        }
    }

    static obtenerPacientes = async(req: Request, res: Response) => {
        try{
            const pacientes = await Paciente.findAll({})
            res.json(pacientes)
        }  catch(error) {
            console.log(error)
        }
    }

    static obtenerPacientePorId = async(req: Request, res: Response) => {
        const { pacienteId } = req.params
        try{
            const paciente = await Paciente.findByPk(pacienteId)
            res.json(paciente)
        } catch(error){
            console.log(error)
        }
    }

    static editarPaciente = async(req: Request, res: Response) => {
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

    static eliminarPaciente = async(req: Request, res: Response) => {
        try {
            const { pacienteId } = req.params
            const paciente = await Paciente.findByPk(pacienteId)
            if(!paciente){
                const error = new Error('Paciente no encontrado.')
                res.status(404).json({error: error.message})
                return
            }

            await paciente.destroy()
            res.json({message: 'Paciente eliminado correctamente'})
        } catch (error) {
            console.log(error)
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