import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Paciente from "./Paciente.model";

@Table({
    tableName: 'medicacion',
    timestamps: false
})

class Medicacion extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @Column({
        type: DataType.STRING(50),
    })
    declare nombre: string

    @ForeignKey(() => Paciente)
    @Column({ type: DataType.INTEGER})
    declare IdPaciente: number

    @BelongsTo(() => Paciente)
    declare paciente: Paciente
}

export default Medicacion