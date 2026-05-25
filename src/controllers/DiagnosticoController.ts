import { Request, Response } from "express"
import { crearDiagnosticoService, editarDiagnosticoService, obtenerDiagnosticosService } from "../services/DiagnosticoService"

export class DiagnosticoController {
    static async crearDiagnosticoController(req: Request, res: Response){
        try {
            const { IdPaciente } = req.params
            const data = req.body
            const diagnostico = await  crearDiagnosticoService(+IdPaciente, data)
            res.status(200).json({
                message: 'Diagnóstico creado exitosamente',
                data: diagnostico
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Error al crear el diagnóstico'
            })
        }
    }

    static async obtenerDiagnosticosController(req: Request, res: Response){
        try {
            const { IdPaciente } = req.params
            const diagnosticos= await obtenerDiagnosticosService(+IdPaciente)
            res.json(diagnosticos)
        } catch (error) {
            res.status(500).json({message: 'Error al obtener los diagnósticos'})
        }
    }

    static async editarDiagnosticoController(req: Request, res: Response){
        try {
            const { id, IdPaciente } = req.params
            const data = req.body
            const diagnostico = await editarDiagnosticoService(+id, +IdPaciente, data)
            res.status(200).json({
                message: 'Diagnóstico actualizado exitosamente',
                data: diagnostico
            })
        } catch (error) {
            res.status(500).json({message: 'Error al actualizar el diagnóstico'})
        }
    }
}