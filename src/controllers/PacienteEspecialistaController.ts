import { Request, Response } from "express";
import { CrearPacienteEspecialistaService } from "../services/PacienteEspecialistaService";
export class PacienteEspecialistaController {

    static async crearPacienteEspecialista(req: Request, res: Response) {
        try {
            const { IdPaciente } = req.params
            const { IdEspecialista, } = req.body

            const pacienteEspecialista = await CrearPacienteEspecialistaService(req.body, +IdPaciente, +IdEspecialista)
            res.status(201).json({
                message: "Paciente especialista creado correctamente",
                data: pacienteEspecialista
            })
        } catch (error) {
            res.status(500).json({ message: "Error al crear el paciente especialista" })
        }
    }
}