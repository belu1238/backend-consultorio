import Especialista from "../models/Especialista.model"
import TipoEspecialidad from "../models/TipoEspecialidad.model"

export const crearEspecialistaService = async (data: any) =>  {
    const tipoEspecialidad = await TipoEspecialidad.findByPk(data.IdTipoEspecialidad)

    if(!tipoEspecialidad){
        throw new Error('Tipo de especialidad no encontrado.')
    }

    const especialista = await Especialista.create(data)
    return especialista
}

export const obtenerEspecialistasService = async (IdTipoEspecialidad: number) => {
    const donde: any = {};

    // 2. SOLO si existe, NO es undefined y NO es NaN, agregamos el filtro
    if (IdTipoEspecialidad !== undefined && IdTipoEspecialidad !== null && !isNaN(IdTipoEspecialidad)) {
        donde.IdTipoEspecialidad = IdTipoEspecialidad;
    }

    // 3. Ejecutamos la consulta
    const especialistas = await Especialista.findAll({
        where: donde,
        include: [{model: TipoEspecialidad, attributes: ['nombre']}]
    });

    return especialistas;
}

export const editarEspecialistaService = async (id: number, IdTipoEspecialidad: number, data: any) => {
    const especialista = await Especialista.findOne({
        where: {
            id: id,
            IdTipoEspecialidad: IdTipoEspecialidad
        }
    })

    if(!especialista){
        throw new Error('Especialista no encontrado.')
    }

    await especialista.update(data)
    return especialista
}