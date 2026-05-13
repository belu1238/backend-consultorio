import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Paciente from "./Paciente.model";
import Especialista from "./Especialista.model";

@Table({
    tableName: 'paciente_especialistas',
    timestamps: false
})


class PacienteEspecialista extends Model {
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
    declare IdPaciente: number

    @ForeignKey(() => Especialista)
    @Column({
        type: DataType.INTEGER,
    })
    declare IdEspecialista: number
}

export default PacienteEspecialista