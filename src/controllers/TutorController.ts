import { crearTutorService } from "../services/TutorService"
import { Request, Response } from "express";

export class TutorController {
    static crearTutor = async(req: Request, res: Response) => {
        const { pacienteId } = req.params

        try {
            await crearTutorService(req.body, +pacienteId)
            res.send('Tutor creado correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al crear el tutor.'})
        }
    }
}