import PacienteEspecialista from "../models/PacienteEspecialista.model"

export const PacienteEspecialistaService = async (data: any, IdPaciente: number, IdEspecialista: number) => {
    const pacienteEspecialista = await PacienteEspecialista.create({
        ...data,
        IdPaciente: IdPaciente,
        IdEspecialista: IdEspecialista
    })
    return pacienteEspecialista
}