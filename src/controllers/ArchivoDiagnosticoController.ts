import { Request, Response } from "express"
import { crearArchivoDiagnosticoService, editarArchivosDiagnosticoService, obtenerArchivosDiagnosticoService } from "../services/ArchivoDiagnosticoService"
export class ArchivoDiagnosticoController {
    static async crearArchivoDiagnostico(req: Request, res: Response) {
        try {
            const { diagnosticoId } = req.params
            const data = req.body
            const archivoDiagnostico = await crearArchivoDiagnosticoService(+diagnosticoId, data)
            res.status(201).json({
                message: 'Archivo de diagnóstico creado exitosamente',
                data: archivoDiagnostico
            })
        } catch (error) {
            res.status(400).json({ error: (error as Error).message })
        }
    }

    static async obtenerArchivosDiagnostico(req: Request, res: Response) {
        try {
            const { diagnosticoId } = req.params
            const archivos = await obtenerArchivosDiagnosticoService(+diagnosticoId)
            res.json(archivos)
        } catch (error) {
            res.status(400).json({ error: (error as Error).message })
        }
    }

    static async editarArchivoDiagnostico(req: Request, res: Response) {
        try{
            const { id, diagnosticoId } = req.params
            const data = req.body
            const archivo = await editarArchivosDiagnosticoService(+id, data, +diagnosticoId)
            res.json({ message: 'Archivo de diagnóstico actualizado exitosamente' })
        } catch (error) {
            res.status(400).json({ error: (error as Error).message })
        }
    }
}