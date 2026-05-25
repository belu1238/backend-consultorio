import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Diagnostico from "./Diagnostico.model";

@Table({
    tableName: 'archivos_diagnostico',
    timestamps: false
})

class ArchivoDiagnostico extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @ForeignKey(() => Diagnostico)
    @Column({type: DataType.INTEGER})
    declare diagnosticoId: number

    @BelongsTo(() => Diagnostico)
    declare diagnostico: Diagnostico

    @Column({
        type: DataType.STRING(100)
    })
    declare nombre: string

    @Column({
        type: DataType.STRING(255)
    })
    declare url: string

    @Column({
        type: DataType.DATEONLY
    })
    declare fechaSubida: Date
}

export default ArchivoDiagnostico