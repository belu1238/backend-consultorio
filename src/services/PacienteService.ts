import Paciente from "../models/Paciente.model"
import Tutor from "../models/Tutor"

export const crearPacienteService = async(data: any, lugarId: number, IdUsuario: number) => {
    const paciente = await Paciente.create({
                ...data,
                IdLugar: lugarId,
                IdUsuario: IdUsuario,
                IdTutor: data.IdTutor
            })
            
            return paciente// devuelvo el paciente creado para que el controller pueda usarlo
}

export const obtenerPacientesPorLugarService = async(lugarId: number, IdUsuario: number) => {
    const pacientes = await Paciente.findAll({
                where: {
                    IdLugar: lugarId,
                    IdUsuario: IdUsuario
                }
            })
            if(!pacientes){
                throw new Error('Pacientes no encontrados.');
            }
            return pacientes
} 

export const obtenerPacientePorIdService = async(IdUsuario: number, pacienteId: number, lugarId: number) => {
    const paciente = await Paciente.findOne({
        where: {
            IdUsuario: IdUsuario,
            id: pacienteId,
            IdLugar: lugarId
        },
        include: [
            {model: Tutor}
        ]
    })

    if (!paciente) {
        throw new Error('Paciente no encontrado en este lugar de atención.');
    }
    return paciente;
}

export const editarPacienteService = async(IdUsuario: number, pacienteId: number, lugarId: number, data: any) => {
    const paciente = await Paciente.findOne({
        where: {
            id: pacienteId,
            IdUsuario: IdUsuario,
            IdLugar: lugarId
        }
    })
            if(!paciente){
                throw new Error('Paciente no encontrado.');
            }
    await paciente.update(data)
    return paciente
}

