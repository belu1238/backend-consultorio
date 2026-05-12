import { Request, Response } from "express";
import { crearPacienteObraSocial, editarPacienteObraSocialService } from "../services/PacienteObraSocialService";

export class PacienteObraSocialController {

    static async crearPacienteObraSocial(req: Request, res: Response) {
        try {
            const { pacienteId } = req.params

            const pacienteObraSocial = await crearPacienteObraSocial(req.body, +pacienteId)
            res.status(201).json({
                message: 'Obra social asociada correctamente',
                data: pacienteObraSocial
            });
        } catch (error) {
            console.log(error)
                res.status(500).json({ message: 'Error al crear la relación entre paciente y obra social' })
        }
    }

    static async editarPacienteObraSocial(req: Request, res: Response) {
        try{
            const { id, pacienteId } = req.params
            const pacienteObraSocial = await editarPacienteObraSocialService(req.body, +id, +pacienteId)
            res.status(200).json({
                message: 'Obra social actualizada correctamente',
                data: pacienteObraSocial
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Error al actualizar la relación entre paciente y obra social' })
        }
    }
}