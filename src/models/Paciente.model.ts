import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript'
import LugarAtencion from './Lugar.model'
import Sesion from './Sesion.model'

@Table({
    tableName: 'pacientes',
    timestamps: false
})

class Paciente extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @Column({
        type: DataType.STRING(100),      
    })
    declare nombre: string

    @Column({
        type: DataType.STRING(100)
    })
    declare apellido: string

    @Column({
        type: DataType.BIGINT
    })
    declare dni: number

    @Column({
        type: DataType.DATEONLY
    })
    declare fecha_nacimiento: Date

    @Column({
        type: DataType.INTEGER
    })
    declare edad: number

    @Column({
        type: DataType.STRING(100)
    })
    declare nombre_madre: string

    @Column({
        type: DataType.STRING
    })
    declare nombre_padre: string

    @Column({
        type: DataType.STRING(100)
    })
    declare obra_social: string

    @Column({
        type: DataType.STRING(50)
    })
    declare numero_beneficiario: string

    @Column({
        type: DataType.INTEGER
    })
    declare cuit_obra_social: number

    @Column({
        type: DataType.STRING(100)
    })
    declare situacion_frente_iva: string

    @Column({
        type: DataType.TEXT
    })
    declare diagnostico: string

    @Column({
        type: DataType.STRING(100)
    })
    declare medicacion: string

    @Column({
        type: DataType.STRING
    })
    declare colegio: string

    @Column({
        type: DataType.STRING(100)
    })
    declare horario_presupuesto: string 

    @Column({
        type: DataType.STRING(150)
    })
    declare profesionales: string

    @Column({
        type: DataType.STRING(300)
    })
    declare historia_clinica: string

    @ForeignKey(() => LugarAtencion)
    @Column({
    type: DataType.INTEGER
    })
    declare lugar_id: number

    @BelongsTo(() => LugarAtencion) //define que cada paciente pertenece a un lugar.
    declare lugar: LugarAtencion

    @HasMany(() => Sesion)
    declare sesiones: Sesion[]
}

export default Paciente