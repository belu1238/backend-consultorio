import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Paciente from "./Paciente.model";


@Table({
    tableName: 'diagnosticos',
    timestamps: false
})

class Diagnostico extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @ForeignKey(() => Paciente)
    @Column({type: DataType.INTEGER})
    declare IdPaciente: number

    @BelongsTo(() => Paciente)
    declare paciente: Paciente

    @Column({
        type: DataType.DATEONLY
    })
    declare fecha: Date

    @Column({
        type: DataType.STRING(255)
    })
    declare descripcion: string
}

export default Diagnostico