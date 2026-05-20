import TipoEspecialidad from "../models/TipoEspecialidad.model"


export const crearTipoEspecialidadService = async (data: any) =>  {
    const tipoEspecialidad = await TipoEspecialidad.create(data)

    return tipoEspecialidad
}

export const obtenerTiposEspecialidadService = async () => {
    const tiposEspecialidad = await TipoEspecialidad.findAll()
    return tiposEspecialidad
}