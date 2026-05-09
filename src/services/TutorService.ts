import Paciente from "../models/Paciente.model"
import Tutor from "../models/Tutor"

export const crearTutorService = async(data: any, pacienteId: number) =>  {
    const tutor = await Tutor.create(data)

    const paciente = await Paciente.findByPk(pacienteId)

    if(!paciente){
        await tutor.destroy() // Si el paciente no existe, elimino el tutor creado 
        throw new Error('Paciente no encontrado.');
    }

    paciente.IdTutor = tutor.id // Asigno el tutor al paciente
    await paciente.save() // Guardo los cambios en el paciente

    return tutor
}