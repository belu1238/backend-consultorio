import { Request, Response } from "express"
import { CrearMedicacionService, editarMedicacionService, obtenerMedicacionService } from "../services/MedicacionService"

export class MedicacionController {
    static async crearMedicacionController (req: Request, res: Response) {
        try {
            const { IdPaciente } = req.params
            const data = req.body
            const medicacion = await CrearMedicacionService(data, +IdPaciente)
            res.status(201).json({
                message: "Medicación creada correctamente",
                data: medicacion
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error al crear la medicación" })
        }
    }

    static async obtenerMedicacionController (req: Request, res: Response) {
        try {
            const { IdPaciente } = req.params
            const medicacion = await obtenerMedicacionService(+IdPaciente)
            res.json(medicacion)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error al obtener la medicación" })
        }
    }

    static async editarMedicacionController (req: Request, res: Response) {
        try {
            const { id, IdPaciente } = req.params
            const data = req.body
            const medicacion = await editarMedicacionService(+id, data, +IdPaciente)
            res.status(200).json({
                message: "Medicación editada correctamente",
                data: medicacion
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error al editar la medicación" })
        }
    }
}