import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import TipoEspecialidad from "./TipoEspecialidad.model";

@Table({
    tableName: 'especialistas',
    timestamps: false
})

class Especialista extends Model {
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

    @ForeignKey(() => TipoEspecialidad)
    @Column({ type: DataType.INTEGER})
    declare IdTipoEspecialidad: number

    @BelongsTo(() => TipoEspecialidad)
    declare tipoEspecialidad: TipoEspecialidad
}

export default Especialista