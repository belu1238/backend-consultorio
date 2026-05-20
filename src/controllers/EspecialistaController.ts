import { Request, Response } from "express";
import { crearEspecialistaService, editarEspecialistaService, obtenerEspecialistasService } from "../services/EspecialistaService";

export class EspecialistaController {

    static async crearEspecialista(req: Request, res: Response) {
        try {
            const especialista = await crearEspecialistaService(req.body)
            res.status(201).json({
                message: 'Especialista creado correctamente',
                data: especialista
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Error al crear el especialista' })
        }
    }

    static async obtenerEspecialistas(req: Request, res: Response) {
        try{
            const {IdTipoEspecialidad} = req.query
            const especialistas = await obtenerEspecialistasService(+IdTipoEspecialidad)
            res.json(especialistas)
        }catch(error){
            console.log(error)
            res.status(500).json({ message: 'Error al obtener los especialistas' })
        }
    }

    static async editarEspecialista(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { IdTipoEspecialidad } = req.body
            const especialista = await editarEspecialistaService(+id, +IdTipoEspecialidad, req.body)
            res.status(200).json({
                message: 'Especialista editado correctamente',
                data: especialista
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Error al editar el especialista' })
        }
    }
}