import { Column, Table, Model, DataType } from "sequelize-typescript";


@Table({
    tableName: 'colegios',
    timestamps: false
})

class Colegio extends Model {
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
}

export default Colegio