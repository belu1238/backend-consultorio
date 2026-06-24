import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, AllowNull} from 'sequelize-typescript'
import LugarAtencion from './Lugar.model'
import Sesion from './Sesion.model'
import Tutor from './Tutor.model'
import Usuario from './Usuario.model'
import Colegio from './Colegio.model'

@Table({
    tableName: 'pacientes',
    timestamps: true
})

class Paciente extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @AllowNull(false)
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
        type: DataType.STRING(100)
    })
    declare horario_presupuesto

    @Column({
        type: DataType.STRING(255)
    })
    declare detalle_paciente

    @ForeignKey(() => Usuario) 
    @Column({ type: DataType.INTEGER, field: 'IdUsuario' })
    declare IdUsuario: number

    @ForeignKey(() => Colegio)
    @Column({ type: DataType.INTEGER })
    declare IdColegio: number
    
    @ForeignKey(() => Tutor)
    @Column({ type: DataType.INTEGER })
    declare IdTutor: number
    
    @ForeignKey(() => LugarAtencion) 
    @Column({ type: DataType.INTEGER })
    declare IdLugar: number
    
    @BelongsTo(() => Usuario)
    declare usuario: Usuario

    @BelongsTo(() => Tutor) //define que cada paciente pertenece a un tutor.
    declare tutor: Tutor

    @BelongsTo(() => LugarAtencion) //define que cada paciente pertenece a un lugar.
    declare lugar: LugarAtencion

    @HasMany(() => Sesion)
    declare sesiones: Sesion[]
}

export default Paciente