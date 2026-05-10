import ObraSocial from "../models/ObraSocial.model"


export const crearObraSocialService = async(data: any) => {
    const obraSocial = await ObraSocial.create(data)

    return obraSocial
}

export const obtenerObrasSocialesService = async() => {
    const obrasSociales = await ObraSocial.findAll()
    return obrasSociales
}