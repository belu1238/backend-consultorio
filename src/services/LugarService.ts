import LugarAtencion from "../models/Lugar.model"
import Paciente from "../models/Paciente.model"

export const crearLugaresService = async (data: any) => {
     const lugar = await LugarAtencion.create(data)
        if(!data.nombre){
            throw new Error('El nombre del lugar de atencion es requerido.')
        }

        await lugar.save()
        return lugar
}

export const obtenerLugaresIdService = async (lugarId: number) => {
            const lugar = await LugarAtencion.findByPk(lugarId, {
                include: [{ model: Paciente}]
            })
            if(!lugar){
                throw new Error('Lugar de atencion no encontrado.')
            }
            return lugar
}

export const editarLugaresService = async (lugarId: number, data: any) => {
            const lugar = await LugarAtencion.findByPk(lugarId)
            if(!lugar){
                const error = new Error('Lugar de atencion no encontrado.')
                throw error
            }

    await lugar.update(data)
    return lugar
}


