import type { Request, Response } from "express";
import { crearTipoEspecialidadService, obtenerTiposEspecialidadService } from "../services/TipoEspecialidadService";

export class TipoEspecialidadController {

    static  crearTipoEspecialidad = async (req: Request, res: Response) => {
        try {
            const tipoEspecialidad = await crearTipoEspecialidadService(req.body);
            res.status(201).json(tipoEspecialidad);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el tipo de especialidad.' });
        }
    }

    static obtenerTiposEspecialidad = async (req: Request, res: Response) => {
        try {
            const tiposEspecialidad = await obtenerTiposEspecialidadService()
            res.status(200).json(tiposEspecialidad)
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los tipos de especialidad.' });
        }
    }
}