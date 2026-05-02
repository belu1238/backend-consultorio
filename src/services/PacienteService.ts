import Paciente from "../models/Paciente.model"

export const crearPacienteService = async(data: any, lugarId: number, IdUsuario: number) => {
    const paciente = await Paciente.create({
                ...data,
                IdLugar: lugarId,
                IdUsuario: IdUsuario
            })
            
            await paciente.save() 
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

