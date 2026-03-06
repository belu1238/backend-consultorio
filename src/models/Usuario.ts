import { Table, Column, Model, DataType, Default, Unique, AllowNull, BelongsTo, ForeignKey} from 'sequelize-typescript'
import Rol from './Rol'

@Table({
    tableName: 'usuarios',
    timestamps: false
})

class Usuario extends Model {
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
 
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100),      
    })
    declare apellido: string

    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.STRING(100),      
    })
    declare email: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(100),      
    })
    declare password: string

    @Column({
        type: DataType.STRING(6),      
    })
    declare token: string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,      
    })
    declare confirmed: boolean

    @ForeignKey(() => Rol)
    @Column({
        type: DataType.INTEGER,
    })
    declare rol_id: number

    @BelongsTo(() => Rol)
    declare rol: Rol 

}

export default Usuario