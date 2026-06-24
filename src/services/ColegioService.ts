import Colegio from "../models/Colegio.model"


export const obtenerColegioService = async () => {
    const colegio = await Colegio.findAll()
    return colegio
}

export const crearColegioService = async (data: any) => {
    const colegio = await Colegio.create(data)
    if(!data.nombre){
        throw new Error('El nombre del colegio es requerido.')
    }
    await colegio.save()
    return colegio
}

export const editarColegioService = async (IdColegio: number, data: any) => {
    const colegio = await Colegio.findByPk(IdColegio)
    if(!colegio){
        throw new Error('Colegio no encontrado.')
    }
    await colegio.update(data)
    return colegio
}