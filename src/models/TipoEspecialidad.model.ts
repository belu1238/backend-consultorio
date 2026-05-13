import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Especialista from "./Especialista.model";


@Table({
    tableName: 'tipo_especialidades',
    timestamps: false
})

class TipoEspecialidad extends Model {
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

    @HasMany(() => Especialista) // define que un tipo de especialidad tiene muchos especialistas
    declare especialistas: Especialista[]
}

export default TipoEspecialidad