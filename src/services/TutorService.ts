import Paciente from "../models/Paciente.model"
import Tutor from "../models/Tutor.model"

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

export const editarTutorService = async(tutorId: number, data: any) => {
    const tutor = await Tutor.findByPk(tutorId)

    if(!tutor){
        throw new Error('Tutor no encontrado.')
    }

    await tutor.update(data)
    return tutor
}