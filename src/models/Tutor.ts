import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, AllowNull} from 'sequelize-typescript'
import LugarAtencion from './Lugar.model'
import Sesion from './Sesion.model'
import Paciente from './Paciente.model'

@Table({
    tableName: 'tutores',
    timestamps: false
})

class Tutor extends Model {
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

    @HasMany(() => Paciente) 
    declare pacientes: Paciente[]

}

export default Tutor