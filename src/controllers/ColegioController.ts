import { Request, Response } from "express"
import { crearColegioService, editarColegioService, obtenerColegioService } from "../services/ColegioService"
export class ColegioController {

    static async obtenerColegioController(req: Request, res: Response) {
        try {
            const colegio = await obtenerColegioService()
            res.json(colegio)
        } catch (error) {
                res.status(500).json({message: 'Error al obtener los colegios'})
        }
    } 

    static async crearColegioController(req: Request, res: Response) {
        try {
            const data = req.body
            const colegio = await crearColegioService(data)
            res.status(200).json({
                message: 'Colegio creado exitosamente',
                data: colegio
            })
        } catch (error) {
            res.status(500).json({message: 'Error al crear el colegio'})
        }
    }

    static async editarColegioController(req: Request, res: Response) {
        try {
            const { IdColegio } = req.params
            const data = req.body
            const colegio = await editarColegioService(+IdColegio, data)
            res.status(200).json({
                message: 'Colegio actualizado exitosamente',
                data: colegio
            })
        } catch (error) {
            res.status(500).json({message: 'Error al editar el colegio'})
        }
    }
}