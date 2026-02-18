import EstadoPago from "../models/EstadoPago.model"
import type { Request, Response } from "express";

export class EstadoPagoController {
     static obtenerEstados = async(req: Request, res: Response) => {
         try {
            const estadoPago = await EstadoPago.findAll({})
            res.json(estadoPago)

        }catch(error) {
            res.status(500).json({error: 'Error al obtener los estados de pago.'})
        }
    }
}