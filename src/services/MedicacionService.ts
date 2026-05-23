import Medicacion from "../models/Medicacion.model"

export const CrearMedicacionService = async(data: any, IdPaciente: number) => {
    const medicacion = await Medicacion.create({
        ...data,
        IdPaciente: IdPaciente
    })
    return medicacion
}

export const obtenerMedicacionService = async (IdPaciente: number) => {
    const medicacion = await Medicacion.findAll({
        where: { IdPaciente }
    })
    return medicacion
}

export const editarMedicacionService = async (id: number,data: any, IdPaciente: number) => {
    const medicacion = await Medicacion.findOne({
        where: {
            id: id,
            IdPaciente: IdPaciente
        }
    })
    if(!medicacion){
        throw new Error('Medicacion no encontrada.')
    }
    await medicacion.update(data)
    return medicacion
}