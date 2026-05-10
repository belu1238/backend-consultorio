import {Model, AllowNull, Column, DataType, Table, HasMany } from "sequelize-typescript";
import PacienteObraSocial from "./PacienteObraSocial.model";


@Table({
    tableName: 'obras_sociales',
    timestamps: false
})

class ObraSocial extends Model {
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
        declare nombre: string;

    @HasMany(() => PacienteObraSocial)
    declare pacienteObraSocial: PacienteObraSocial[]
}

export default ObraSocial