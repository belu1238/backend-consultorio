import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript'
import Paciente from './Paciente.model'
import Sesion from './Sesion.model'

@Table({
    tableName: 'estado_pago',
    timestamps: false
})

class EstadoPago extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @Column({
        type: DataType.STRING
    })
    declare nombre: string

    @Column({
        type: DataType.STRING
    })
    declare color: string

    @HasMany(() => Sesion)
    declare sesiones: Sesion[]
}

export default EstadoPago