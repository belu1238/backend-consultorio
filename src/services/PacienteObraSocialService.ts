import ObraSocial from "../models/ObraSocial.model"
import Paciente from "../models/Paciente.model"
import PacienteObraSocial from "../models/PacienteObraSocial.model"

export const crearPacienteObraSocial = async(data: any, IdPaciente: number) => {
    const pacienteId = await Paciente.findByPk(IdPaciente)
    const obraSocial = await ObraSocial.findByPk(data.IdObraSocial)

    if(!pacienteId || !obraSocial){
        throw new Error('Faltan datos obligatorios')
    }

    // evitar duplicados
    const relacionExistente =  await PacienteObraSocial.findOne({
        where: {
            IdPaciente: IdPaciente,
            IdObraSocial: data.IdObraSocial
        }
    })
    if(relacionExistente){
        throw new Error('El paciente ya tiene asociada esta obra social')
    }

    const pacienteObraSocial =  await PacienteObraSocial.create({
        ...data,
        IdPaciente: IdPaciente,
    })

    if (data.fechaBaja === "") {
    data.fechaBaja = null;
}

    return pacienteObraSocial
}

export const editarPacienteObraSocialService = async(data: any, id: number, pacienteId: number) => {
    const pacienteObraSocial =  await PacienteObraSocial.findOne({
        where: {
            id: id,
            IdPaciente: pacienteId
        }
    })
    if(!pacienteObraSocial){
        throw new Error('Paciente obra social no encontrado')
    }
    await pacienteObraSocial.update(data)
    return pacienteObraSocial
}