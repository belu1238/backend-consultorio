import ArchivoDiagnostico from "../models/ArchivoDiagnostico.model"
import Diagnostico from "../models/Diagnostico.model"

export const crearArchivoDiagnosticoService = async (diagnosticoId: number, data:any) => {
    const diagnosticoExistente = await Diagnostico.findByPk(diagnosticoId)

    if (!diagnosticoExistente) {
        throw new Error('Diagnóstico no encontrado')
    }
    const archivo = await ArchivoDiagnostico.create({
        diagnosticoId,
        ...data
    })
    return archivo
}

export const obtenerArchivosDiagnosticoService = async (diagnosticoId: number) => {
    const diagnosticoExistente = await Diagnostico.findByPk(diagnosticoId)

    if (!diagnosticoExistente) {
        throw new Error('Diagnóstico no encontrado')
    }
    const archivos = await ArchivoDiagnostico.findAll({where: {diagnosticoId}})
    return archivos
}

export const editarArchivosDiagnosticoService = async (id: number, data: any, diagnosticoId: number) => {
    const diagnosticoExistente = await Diagnostico.findByPk(diagnosticoId)

    if (!diagnosticoExistente) {
        throw new Error('Diagnóstico no encontrado')
    }
    const archivo = await ArchivoDiagnostico.findOne({where: {id, diagnosticoId}})
    if (!archivo) {
        throw new Error('Archivo no encontrado')
    }
    await archivo.update(data)
}