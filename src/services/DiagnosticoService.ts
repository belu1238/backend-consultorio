import Diagnostico from "../models/Diagnostico.model"

export const crearDiagnosticoService = async (IdPaciente: number, data: any) => {
    const diagnostico = await Diagnostico.create({
        IdPaciente,
        ...data
    })
    return diagnostico
}

export const obtenerDiagnosticosService = async (IdPaciente: number) => {
    const diagnosticos = await Diagnostico.findAll({
        where: { IdPaciente }
    })
    return diagnosticos
}

export const editarDiagnosticoService = async(id:number, IdPaciente:number, data: any) => {
    const diagnostico =await Diagnostico.findOne({
        where: { id, IdPaciente }
    })
    if (!diagnostico) {
        throw new Error('Diagnóstico no encontrado')
    }
    await diagnostico.update(data)
    return diagnostico
}