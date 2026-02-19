import { Table, Column, Model, DataType} from 'sequelize-typescript'

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

    @Column({
        type: DataType.STRING(100),      
    })
    declare nombre: string

    @Column({
        type: DataType.STRING(100),      
    })
    declare apellido: string

    @Column({
        type: DataType.STRING(100),      
    })
    declare email: string

    @Column({
        type: DataType.STRING(100),      
    })
    declare password: string

    @Column({
        type: DataType.BOOLEAN,      
    })
    declare confirmed: boolean

}

export default Usuario