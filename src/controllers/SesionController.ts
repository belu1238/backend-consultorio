import type { Request, Response } from "express";
import Sesion from "../models/Sesion.model";
import EstadoPago from "../models/EstadoPago.model";
import { Model, Op } from "sequelize";
import Paciente from "../models/Paciente.model";

export class SesionController {
    static crearSesion = async(req: Request, res: Response) => {
        const sesion = new Sesion(req.body)
        try{
            await sesion.save()
            res.send('Sesión creada correctamente')
        } catch(error){
            res.status(500).json({error: 'Error al crear la sesión.'})
        }
    }

    static crearSesionPorPaciente = async(req: Request, res: Response) => {
        const { pacienteId } = req.params
        
        if(!req.body.paciente_id){
            const error = new Error('El paciente no existe.')
            res.status(404).json({error: error.message})
            return
        }

        try{
            const sesion = await Sesion.create({
                ...req.body,
                paciente_id: pacienteId
            })
            res.send('Sesión creada correctamente')
        } catch(error){
            res.status(500).json({error: 'Error al crear la sesión.'})
        }
    }

    static obtenerSesionesPorFecha = async(req: Request, res: Response) => {
        const fecha = req.query.fecha 

        if(!fecha){
            const error = new Error('La fecha es requerida.')
            res.status(404).json({error: error.message})
            return
        }

        try{
            const sesiones = await Sesion.findAll({
                where: {
                    fecha: fecha                 
                },
                attributes: ['id','fecha','hora','paciente_id', 'estado_pago_id',],
                include: [
                    {model: Paciente,
                    as: 'paciente',
                    attributes: ['id', 'nombre', 'apellido'] // Selecciona solo los campos necesarios
                    },
                    {
                        model: EstadoPago,
                        as: 'estado_pago',
                        attributes: ['id', 'nombre', 'color'] 
                    }
                ],
            })
            res.json(sesiones)
        } catch(error) {
            res.status(500).json({error: 'Error al obtener las sesiones.'})
        }
    }

    static obtenerSesionesPorPaciente = async(req: Request, res: Response) => {     
        const pacienteId = req.params.pacienteId

        if(!pacienteId){
            const error = new Error('El paciente no existe.')
            res.status(404).json({error: error.message})
            return
        }

        try {
            const sesiones = await Sesion.findAll({
                where: {
                    paciente_id: pacienteId
                },
                include: [
                    {
                        model: EstadoPago,
                        as: 'estado_pago',
                        attributes: ['id', 'nombre', 'color']
                    }
                ]
            })
            res.json(sesiones)
        } catch(error) {
            res.status(500).json({error: 'Error al obtener las sesiones del paciente.'})
        }
    }

    static obtenerResumenSesiones = async(req: Request, res: Response) => {
        try {
            const hoy = new Date().toISOString().split('T')[0] // Obtiene la fecha actual sin la hora

            const [recientes, proximas] = await Promise.all([
                Sesion.findAll({
                    where: { fecha: { [Op.lt]: hoy} }, // Busca sesiones con fecha mayor o igual a la fecha actual
                    include: [{ model: Paciente, as: 'paciente', attributes: ['nombre','apellido']},
                    {
                    model: EstadoPago,
                    as: 'estado_pago',
                    attributes: ['id', 'nombre', 'color']
                }],
                    
                    limit: 5,
                    order: [['fecha', 'DESC']]
                }),
                Sesion.findAll({
                    where: { fecha: { [Op.gte]: hoy }},
                    include: [{ model: Paciente, as: 'paciente', attributes: ['nombre','apellido']},
                    {
                        model: EstadoPago,
                        as: 'estado_pago',
                        attributes: ['id', 'nombre', 'color']
                    }],
                    limit: 5,
                    order : [['fecha', 'ASC'], ['hora', 'ASC']]
                })
            ])
            res.json({ recientes, proximas })
        } catch(error) {
            res.status(500).json({error: 'Error al obtener las sesiones del paciente.'})
        } 
    }

    static editarSesion = async(req: Request, res: Response) => {
        const { sesionId } = req.params
        const pacienteId = Number(req.params.pacienteId)
        const sesion = await Sesion.findByPk(sesionId)

        if(!sesion){
            const error = new Error('La sesión no existe.')
            res.status(404).json({error: error.message})
            return
        }

        if(sesion.paciente_id !== Number(pacienteId)){
            const error = new Error('El paciente no existe.')
            res.status(404).json({error: error.message})
            return
        }

        try {
            await sesion.update(req.body)
            res.send('Sesión actualizada correctamente')
        }catch(error) {
            res.status(500).json({error: 'Error al actualizar la sesión.'})
        }
    }

    static editarEstado = async(req: Request, res: Response) => {
        try {
            const { sesionId } = req.params
            const sesion = await Sesion.findByPk(sesionId)

            if(!sesion){
                const error = new Error('La sesión no existe.')
                res.status(404).json({error: error.message})
                return
            }

            const { estado_pago_id } = req.body
            const estadoPago = await EstadoPago.findByPk(estado_pago_id)

            if(!estadoPago){
                const error = new Error('El estado de pago no existe.')
                res.status(404).json({error: error.message})
                return
            }

            sesion.estado_pago_id = estado_pago_id
            await sesion.save()

            res.send('Estado de pago actualizado correctamente')

        }catch(error) {
            res.status(500).json({error: 'Error al actualizar el estado de pago.'})
        }
    }

}