import {Model, BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Paciente from "./Paciente.model";
import ObraSocial from "./ObraSocial.model";

@Table({
  tableName: "paciente_obra_social",
  timestamps: false,
})
class PacienteObraSocial extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Paciente)
  @Column({
    type: DataType.INTEGER,
  })
  declare IdPaciente: number

  @ForeignKey(() => ObraSocial)s
  @Column({ type: DataType.INTEGER,})
  declare IdObraSocial: number

  @Column({
    type: DataType.STRING(50),
  })
  declare numeroAfiliado: string

  @Column({
    type: DataType.DATE,
  })
  declare fechaAlta: Date

  @Column({
    type: DataType.DATE,
  })
  declare fechaBaja: Date

  @BelongsTo(() => Paciente)
  declare paciente: Paciente

  @BelongsTo(() => ObraSocial)
  declare obraSocial: ObraSocial
}

export default PacienteObraSocial
