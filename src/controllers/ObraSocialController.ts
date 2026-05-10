import type { Request, Response } from "express";
import { crearObraSocialService, obtenerObrasSocialesService } from "../services/ObraSocialService";

export class ObraSocialController {
    static crearObraSocial = async (req: Request, res: Response) => {
        try {
            await crearObraSocialService(req.body)
            res.send('Obra social creada correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al crear la obra social.' })
        }
    }

    static obtenerObrasSociales = async (req: Request, res: Response) =>  {
        try {
            const obrasSociales = await obtenerObrasSocialesService()
            res.json(obrasSociales)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al obtener las obras sociales.' })
        }
    }
}