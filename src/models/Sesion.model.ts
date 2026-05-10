import { Table, Column, Model, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript'
import Paciente from './Paciente.model'
import EstadoPago from './EstadoPago.model'
import Usuario from './Usuario.model'

@Table({
    tableName: 'sesiones',
    timestamps: false
})

class Sesion extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @ForeignKey(() => Paciente)
    @Column({
        type: DataType.INTEGER,      
    })
    declare paciente_id: number

    @ForeignKey(() => EstadoPago)
    @Column({
        type: DataType.INTEGER,      
    })
    declare estado_pago_id: number

    @BelongsTo(() => Paciente) //define que cada sesion pertenece a un paciente.
    declare paciente: Paciente

    @Column({
        type: DataType.DATEONLY
    })
    declare fecha: Date

    @Column({
        type: DataType.TIME
    })
    declare hora: string

    @Column({
        type: DataType.TEXT
    })
    declare observaciones: string

    @Column({
        type: DataType.TEXT
    })
    declare actividad: string

    @Column({
        type: DataType.TEXT
    })
    declare evaluacion: string

    @ForeignKey(() => Usuario) 
    @Column({ type: DataType.INTEGER })
    declare IdUsuario: number

    @BelongsTo(() => Usuario) 
    declare usuario: Usuario

    @BelongsTo(() => EstadoPago) //define que cada sesion pertenece a un estado de pago.s
    declare estado_pago: EstadoPago
}

export default Sesion