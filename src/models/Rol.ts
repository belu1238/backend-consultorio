import { Table, Column, Model, DataType, Default, Unique, AllowNull, HasMany} from 'sequelize-typescript'
import Usuario from './Usuario'

@Table({
    tableName: 'roles',
    timestamps: false
})

class Rol extends Model {
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

    @HasMany(() => Usuario)
    declare usuarios: Usuario[]
}

export default Rol