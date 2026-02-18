import { Table, Column, Model, DataType, ForeignKey, HasMany} from 'sequelize-typescript'
import Paciente from './Paciente.model'

@Table({
    tableName: 'lugares',
})

class LugarAtencion extends Model {
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

    @HasMany(() => Paciente) // define que un lugar tiene muchos pacientes.
    declare pacientes: Paciente[]

}

export default LugarAtencion